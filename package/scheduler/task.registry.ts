import { Injectable } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";
import { BaseTask } from "./base.task";

@Injectable()
export class TaskRegistry {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  isTaskExist(taskName: any) {
    return this.schedulerRegistry.doesExist("cron", taskName);
  }

  addTask(name: string, expression: string, task: BaseTask) {
    const job = new CronJob(expression, () => {
      task.run();
    });
    this.schedulerRegistry.addCronJob(name, job);
    job.start();
  }
  /**
   * @todo
   * DeleteTask, UpdateTask...
   */
}
