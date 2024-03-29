import cron from "node-cron";
import TasksRegistry from "../registry/TasksRegistry";

export const setupTasks = async (AppTasksRegistry: any) => {
  let cronSchemas = [];
  const tasksRegistry = { ...TasksRegistry, ...AppTasksRegistry };
  console.log("::----- Its initializeCronJobs -----::");
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { databaseActions } = require("../index");
    cronSchemas = await databaseActions.findAll("application", "CronSchemas");
  } catch (error: any) {
    throw new Error(error);
  }

  // let cronSchemas = require("./cronSchema.json");
  if (cronSchemas && Array.isArray(cronSchemas) && cronSchemas.length > 0) {
    cronSchemas.forEach((cronSchema) => {
      if (!cronSchema?.expression) {
        console.error(
          `Can't run task named as ${
            cronSchema?.name || "Unknown"
          } due to no expression`
        );
      }
      if (!cronSchema?.cronModule) {
        console.error(
          `Can't run task named as ${
            cronSchema?.name || "Unknown"
          } due to no module`
        );
      }

      cron.schedule(cronSchema?.expression, () => {
        const taskname = cronSchema.cronModule;
        const cronModule = tasksRegistry[`${taskname}`];
        try {
          // console.log("running every minute to 1 from 5");
          if (cronModule.prePerform() /*pass or access db inside*/) {
            cronModule.perform(); // pass or access db inside
          }
        } catch (error) {
          cronModule.handleError(error); // pass or access db inside
        } finally {
          cronModule.postPerform(); // pass or access db inside
        }
      });
    });
  }
};
