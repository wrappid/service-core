import { WrappidLogger } from "../logging/wrappid.logger";

const getNormalCaseFromCamelCase = (camelCase: any) => {
  WrappidLogger.logFunctionStart();
  const result = camelCase.replace(/([A-Z])/g, " $1");
  const normalCase = result.charAt(0).toUpperCase() + result.slice(1);
  return normalCase;
};

export { getNormalCaseFromCamelCase };
