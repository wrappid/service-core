import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../seqlize-db/database/database.service";
import { Router } from "express"; // Import from express package
import { NestApplication } from "@nestjs/core";
import BaseService from "../common/base.service";

@Injectable()
export class RouteService extends BaseService {
  constructor(
    private readonly router: any, // Inject application router
    private readonly databaseService: DatabaseService,
    private readonly app: NestApplication
  ) {
    super();
  }

  async createRoutes() {
    try {
      const routes = await this.databaseService.findAll("wrappid", "Routes");
      for (const route of routes) {
        const { path, method, handler, middleware = [] } = route;
        const [controllerName, actionName] = handler.split("@");

        // Get controller instance using Nest reflection
        const controller = this.app.get(controllerName);

        // Use reflection to dynamically get the controller method
        let handlerMethod = controller[actionName].bind(controller);

        // Apply middleware if specified
        /*
        for (const middlewareName of middleware) {
          const middlewareInstance = this.app.get(middlewareName);
          // Use Reflect to check if middleware has middleware function
          const use = Reflect.getMetadata(
            "design:paramtypes",
            middlewareInstance
          ).includes(Object);
          if (use) {
            this.router.use(middlewareName, path);
          } else {
            // Use middleware as a global middleware for the route
            handlerMethod = middlewareInstance.use(handlerMethod);
          }
        }
        */

        // Register the route dynamically
        this.router[method.toLowerCase()](path, handlerMethod);
      }
    } catch (error: any) {
      console.log(error);
    }
  }
}
