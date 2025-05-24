import endent from 'endent';
import { createParser } from 'eventsource-parser';

const createPrompt = (content) => {
  const data = (content) => {
    return endent` 

    You are an expert programmer in all programming languages. You know very well to refactor the code.
    Refactor the following code by changing all Bootstrap specific classes with the equivalent TailwindCSS classes.
    THE RESULT MUST BE THE CODE REFACTORED. DO NOT GIVE ANY OTHER EXPLAINING, JUST THE CODE, BUT WRITE IT AS NORMAL TEXT
    
    ${content}
     
    `;
  };

  if (content) {
    return data(content);
  }
};

export const OpenAIStream = async (content, model, key) => {
  const prompt = createPrompt(content);
  // Rewrite the code above and change all Bootstrap classes to the equivalent TailwindCSS classes.   Do not include informations about console logs or print messages.

  const system = { role: 'system', content: prompt };

  const res = await fetch(`https://api.openai.com/v1/chat/completions`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key || process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
    method: 'POST',
    body: JSON.stringify({
      model,
      messages: [system],
      temperature: 0,
      stream: true,
    }),
  });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  if (res.status !== 200) {
    const statusText = res.statusText;
    const result = await res.body?.getReader().read();
    throw new Error(
      `OpenAI API returned an error: ${
        decoder.decode(result?.value) || statusText
      }`,
    );
  }

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event) => {
        if (event.type === 'event') {
          const data = event.data;

          if (data === '[DONE]') {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);

      for await (const chunk of res.body) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
};
