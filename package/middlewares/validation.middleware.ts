export const validation =
  (schema: any) => async (req: any, res: any, next: any) => {
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
      next();
    } catch (err: any) {
      console.log(err);
      return res
        .status(406)
        .json({ message: err.errors ? err.errors[0] : err });
    }
  };
