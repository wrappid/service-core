import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import BaseController from "../common/base.controller";

@Controller('app')
export class AppController extends BaseController {
  constructor(private readonly appService: AppService) {
    super();
  }

  @Get('models')
  getModels(): {models: any} {
    return {models: this.appService.getModels()};
  }
  
}
