import { WrappidLogger } from "../logging/wrappid.logger";

export const validation =
  (schema: any) => async (req: any, res: any, next: any) => {
    WrappidLogger.logFunctionStart();
    try {
      if (schema.body) {
        await schema.body.validate(req.body);
      }
      if (schema.query) {
        await schema.query.validate(req.query);
      }
      if (schema.params) {
        await schema.params.validate(req.params);
      }
      console.log("Validate successfully");
      WrappidLogger.logFunctionEnd();
      next();
    } catch (err: any) {
      console.log(err);
      WrappidLogger.error(err);
      return res
        .status(406)
        .json({ message: err.errors ? err.errors[0] : err });
    }
  };
