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
    let summaryOutput = "";

    try {
      const generator = await pipeline(
        "summarization"
        // "Xenova/distilbart-cnn-6-6"
      );

      const output = (await generator(
        transcript,
        config as TextGenerationConfig
      )) as { summary_text: string }[];

      setIsLoading(false);
      if (output[0]?.summary_text) {
        summaryOutput = output[0].summary_text;
      } else {
        summaryOutput = "No summary found";
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      summaryOutput = "Something went wrong";
    }
    return summaryOutput;
  };

  return { summarize, isLoading };
};
