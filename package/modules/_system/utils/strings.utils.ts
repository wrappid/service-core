import { WrappidLogger } from "../../../logging/wrappid.logger";

export const getNormalCaseFromCamelCase = (camelCase: any) => {
  WrappidLogger.logFunctionStart("getNormalCaseFromCamelCase");
  const result = camelCase.replace(/([A-Z])/g, " $1");
  const normalCase = result.charAt(0).toUpperCase() + result.slice(1);
  return normalCase;
};
