import { Module, OnModuleInit } from "@nestjs/common";
import { TaskRegistry } from "./task.registry";
import { ManagerTask } from "./manager.task";
import { CommTask } from "./CommTask";
import { ScheduleModule, SchedulerRegistry } from "@nestjs/schedule";
import { Reflector } from "@nestjs/core";
import BaseModule from "../common/base.module";

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [Reflector, TaskRegistry, ManagerTask, CommTask],
  exports: [CommTask],
})
export class TasksModule extends BaseModule {
  onCoreModuleInit(): void {
    console.log(`::===TaskModule has been Initialization===::`);
    this.taskRegistry.addTask("task-manager", "0 10 * * * *", this.managerTask);
  }
  onCoreModuleDestroy(): void {}
  onCoreApplicationBootstrap(): void {}
  constructor(
    private taskRegistry: TaskRegistry,
    private managerTask: ManagerTask
  ) {
    super();
  }
}
