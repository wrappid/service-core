import { Injectable } from "@nestjs/common";
import { BaseTask } from "./base.task";

@Injectable()
export class CommTask extends BaseTask {
  async prePerform(): Promise<any> {
    console.log(`Communication Task prePerform is completed @ `, Date());
  }

  perform(): void {
    console.log(`Communication Task Perform is completed @ `, Date());
  }

  postPerform(): void {
    console.log(`Communication Task postPerform is completed @ `, Date());
  }

  handleError(): void {
    console.log(`Communication Task handleEroor..`, new Date());
  }
}
