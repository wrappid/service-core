import cron from "node-cron";
import { constant } from "../constants/server.constant";
import { ApplicationContext } from "../context/application.context";
import { databaseActions } from "../database/actions.database";
import { GenericObject } from "../types/generic.types";

export const setupTasks = async () => {
  try {
    const AppTasksRegistry: GenericObject = ApplicationContext.getContext(constant.registry.TASKS_REGISTRY);
  
    let cronSchemas = [];
    console.log("::----- Its initializeCronJobs -----::");
    cronSchemas = await databaseActions.findAll("application", "CronSchemas");
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
          const cronModule = AppTasksRegistry[`${taskname}`];
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
  } catch (error) {
    console.error("WrappidError: Database tasks setup failed.");
    console.error(error);
  }
};
