import { useState } from "react";

import {
  pipeline,
  TextPipelineConstructorArgs,
  TextGenerationConfig,
} from "@huggingface/transformers";
// const pipelineArgs: TextPipelineConstructorArgs = {};
const config: Partial<TextGenerationConfig> = {
  min_length: 30,
  max_length: 100,
  early_stopping: true,
};
export const useSummarize = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const summarize = async (transcript: string) => {
    setIsLoading(true);
    const generator = await pipeline(
      "summarization",
      "Xenova/distilbart-cnn-6-6"
    );

    const output = (await generator(
      transcript,
      config as TextGenerationConfig
    )) as { summary_text: string }[];
    setIsLoading(false);

    if (output[0]?.summary_text) {
      return output[0].summary_text;
    } else {
      return "No summary found";
    }
  };

  return { summarize, isLoading };
};
