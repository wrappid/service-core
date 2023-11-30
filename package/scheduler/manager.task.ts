import { BaseTask } from "./base.task";
import { Injectable } from "@nestjs/common";
import { TaskRegistry } from "./task.registry";
import TasksRegistry from "./tasks.registry";
import { ModuleRef } from "@nestjs/core";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class ManagerTask extends BaseTask {
  cronModule: BaseTask;

  constructor(
    private readonly moduleRef: ModuleRef,
    private taskRegistry: TaskRegistry,
    private readonly databaseService: DatabaseService,
  ) {
    super();
  }

  async prePerform(): Promise<boolean> {
    console.log("====================================");
    console.log(`Core Task prePerform is completed`, new Date());
    const tasksRegistry = { ...TasksRegistry };

    //datbase call to get Task schemas
    const DatabaseSchemas = await this.databaseService.findAll('wrappid-database1','CronSchemas');
    if (
      DatabaseSchemas &&
      Array.isArray(DatabaseSchemas) &&
      DatabaseSchemas.length > 0
    ) {
      DatabaseSchemas.forEach((element) => {
        const taskname:string = element.cronModule;
        // const cronModule: BaseTask = tasksRegistry[`${taskname}`];

        // this.moduleRef.get(taskname, { strict: false }).run();

        console.log();
        if (!this.taskRegistry.isTaskExist(taskname)) {
          this.taskRegistry.addTask(
            element.name,
            element.expression,
            this.moduleRef.get(taskname)
            // new tasksRegistry[""](),
          );
        }
      });
      return true;
    } else {
      return false;
    }
    // console.log(this.schedulerRegistry.getCronJobs());
  }

  perform(): void {
    console.log(`Core Task Perform is completed`, new Date());
    //Call scheduler to register a cron task in scheduler registry
    //hint: SchedulerRegistry.addCron
    // this.cronSchemas.forEach((element) => {
    //   this.taskRegistry.addTask(element.name, element.expression);
    // });
  }
  
  postPerform(): void {
    console.log(`Core Task postPerform is completed`, new Date());
  }

  handleError(): void {
    console.log(`Core Task handleEroor..`, new Date());
  }
}
