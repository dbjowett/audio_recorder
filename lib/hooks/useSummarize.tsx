import { TextGenerationConfig, pipeline } from '@huggingface/transformers';
import { useState } from 'react';

export const useSummarize = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const summarize = async (transcript: string) => {
    setIsLoading(true);
    let summaryOutput = '';

    try {
      if (typeof window === 'undefined') {
        throw new Error('Summarization is only available on the client.');
      }

      const config: Partial<TextGenerationConfig> = {
        min_length: 30,
        max_length: 100,
        early_stopping: true,
      };

      const generator = await pipeline('summarization');
      const output = (await generator(transcript, config as TextGenerationConfig)) as {
        summary_text: string;
      }[];

      summaryOutput = output[0]?.summary_text ?? 'No summary found';
    } catch (error) {
      console.error(error);
      summaryOutput = 'Something went wrong';
    } finally {
      setIsLoading(false);
    }

    return summaryOutput;
  };

  return { summarize, isLoading };
};
