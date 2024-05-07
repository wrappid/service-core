import { WrappidLogger } from "../logging/wrappid.logger";

export const  extractUrl = (str: string) => {
  WrappidLogger.logFunctionStart();
  // Regular expression to match "https://" or "http://", optionally preceded by anything
  const urlRegex = /(?:.*)(https?:\/\/)(.+)/;

  // Use match() to find the first occurrence of the pattern
  const match = str.match(urlRegex);

  // If a match is found, return the full URL
  if (match) {
    return match[1] + match[2]; // Return the protocol + remaining URL
  }

  // If no match is found, return the original string
  return str;
};