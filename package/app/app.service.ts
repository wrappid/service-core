import { Injectable } from "@nestjs/common";
import { ModelRegistry } from "../registry/ModelRegistry";

@Injectable()
export class AppService{
    getModels(): any {
        const models: any = ModelRegistry.getClasses();
        console.log(models);
        return JSON.stringify(models);
      }
}
