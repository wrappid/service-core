import cron from "node-cron";
import { constant } from "../constants/server.constant";
import { ApplicationContext } from "../context/application.context";
import { databaseActions } from "../database/actions.database";
import { WrappidLogger } from "../logging/wrappid.logger";
import { GenericObject } from "../types/generic.types";

export const setupTasks = async () => {
  try {
    WrappidLogger.logFunctionStart("setupTasks");
    const AppTasksRegistry: GenericObject = ApplicationContext.getContext(constant.registry.TASKS_REGISTRY);
  
    let cronSchemas = [];
    WrappidLogger.info("::----- Its initializeCronJobs -----::");
    // console.log("::----- Its initializeCronJobs -----::");
    cronSchemas = await databaseActions.findAll("application", "CronSchemas");
    if (cronSchemas && Array.isArray(cronSchemas) && cronSchemas.length > 0) {
      cronSchemas.forEach((cronSchema) => {
        if (!cronSchema?.expression) {
          WrappidLogger.error(
            `Can't run task named as ${
              cronSchema?.name || "Unknown"
            } due to no expression`
          );
          // console.error(
          //   `Can't run task named as ${
          //     cronSchema?.name || "Unknown"
          //   } due to no expression`
          // );
        }
        if (!cronSchema?.cronModule) {
          WrappidLogger.error(
            `Can't run task named as ${
              cronSchema?.name || "Unknown"
            } due to no module`
          );
          // console.error(
          //   `Can't run task named as ${
          //     cronSchema?.name || "Unknown"
          //   } due to no module`
          // );
        }
    
        cron.schedule(cronSchema?.expression, () => {
          const taskname = cronSchema.cronModule;
          const cronModule = AppTasksRegistry[`${taskname}`];
          try {
            // console.log("running every minute to 1 from 5");
            if (cronModule.prePerform() /*pass or access db inside*/) {
              cronModule.perform(); // pass or access db inside
            }
          } catch (error:any) {
            WrappidLogger.error(error);
            cronModule.handleError(error); // pass or access db inside
          } finally {
            cronModule.postPerform(); // pass or access db inside
          }
        });
      });
    }
  } catch (error:any) {
    console.error("WrappidError: Database tasks setup failed.");
    WrappidLogger.error(error);
    // console.error(error);
  } finally {
    WrappidLogger.logFunctionEnd("setupTasks");
  }
};
