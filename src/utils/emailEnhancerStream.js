import endent from 'endent';
import { createParser } from 'eventsource-parser';

const createPrompt = (topic, toneOfVoice, content) => {
  const data = (topic, toneOfVoice, content) => {
    return endent`
      You are an expert at enhancing emails and making them compelling & high converting.
      You know very well how to enhance an email. Enchance the following email ${content} and make it for ${topic} topic with a ${toneOfVoice} tone of voice. 
      The generated content must be in markdown format but not rendered, it must include all markdown characteristics.The title must be bold, and there should be a &nbsp; between every paragraph.
      Do not include informations about console logs or print messages.
    `;
  };

  if (topic) {
    return data(topic, toneOfVoice, content);
  }
};

export const OpenAIStream = async (topic, toneOfVoice, content, model, key) => {
  const prompt = createPrompt(topic, toneOfVoice, content);

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
