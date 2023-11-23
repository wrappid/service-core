import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('models')
  getModels(): {models: any} {
    return {models: this.appService.getModels()};
  }
  
}
