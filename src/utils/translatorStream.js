import endent from 'endent';
import { createParser } from 'eventsource-parser';

const createPrompt = (content, language) => {
  const data = (content, language) => {
    return endent`
      You are an expert translator.
      You know very well all languages and to translate the content you receive. Translate in ${language} language the following content: ${content}.
      The content must be in markdown format but not rendered, it must include all markdown characteristics. There should be a &nbsp; between every paragraph.
      Do not include informations about console logs or print messages.
    `;
  };

  if (content) {
    return data(content, language);
  }
};

export const OpenAIStream = async (content, language, model, key) => {
  const prompt = createPrompt(content, language);

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
