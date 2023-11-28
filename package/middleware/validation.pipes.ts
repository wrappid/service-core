// pipes/yup-validation.pipe.ts

import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import * as yup from "yup";

@Injectable()
export class YupValidationPipe implements PipeTransform {
  constructor(private readonly schema: yup.ObjectSchema<any>) {}

  async transform(value: any): Promise<any> {
    try {
      await this.schema.validate(value, { abortEarly: false });
      console.log(`Validate Sucessfully!!`);
      return value;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        console.log(`Validate Faild!`);
        throw new BadRequestException({
          message: "Validation failed",
          errors: this.mapYupErrors(error),
        });
      }
      throw error;
    }
  }

  private mapYupErrors(error: yup.ValidationError): Record<string, string[]> {
    const validationErrors: Record<string, string[]> = {};

    error.inner.forEach((e) => {
      if (!validationErrors[e.path]) {
        validationErrors[e.path] = [];
      }
      validationErrors[e.path].push(e.message);
    });

    return validationErrors;
  }
}
