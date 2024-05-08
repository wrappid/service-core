import winston from "winston";
import { GenericObject } from "../types/generic.types";

/**
 * @todo
 * Need to color for specific level
 */

const LOG_LEVELS: GenericObject= {
  FATAL : "fatal",
  ERROR : "error",
  WARN : "warn",
  INFO : "info",
  SUCCESS: "success",
  DEBUG : "debug",
  TRACE : "trace",
  VERBOSE : "verbose"
};

const WRAPPID_LOG_LEVELS : {levels:{[key:string]:number}, colors: {[key:string]:string}} =  {
  levels:
  {
    fatal : 0,
    error : 1,
    warn : 2,
    info : 3,
    success: 4,
    debug : 5,
    trace : 6,
    verbose : 7 
  },
  colors: {
    fatal :"red",
    error :"red",
    warn :"yellow",
    info :"blue",
    success:"green"
    // debug :"grey",
    // trace :"",
    // verbose :"",
  }
};

export const DEFAULT_LOGGER_OPTIONS: winston.LoggerOptions = {
  levels:WRAPPID_LOG_LEVELS.levels,
  level: LOG_LEVELS.VERBOSE,
  //   format: winston.format.json(),
  format: winston.format.combine(
    winston.format.label({ label: "WRAPPID" }),
    winston.format.timestamp(),
    winston.format.printf(({ level, message, label, timestamp }) => {
      return `${timestamp} [${label}] ${level}: ${message}`;
    })
  ),
  defaultMeta: { service: "wrappid-service" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "wrappid.log" }),
  ]
};

/**
 * This is a wrappid logger class which helps to log.
 * Currently we are using winston as our base package.
 */
export class WrappidLogger {
  private static logger: winston.Logger;
  static init(config: winston.LoggerOptions){
    WrappidLogger.logger = winston.createLogger(config);
    winston.addColors(WRAPPID_LOG_LEVELS.colors);
  }

  static fatal(message:string){
    WrappidLogger.logger.log({
      level: LOG_LEVELS.FATAL,
      message: message
    });
  }
  static error(message:string){
    WrappidLogger.logger.log({
      level: LOG_LEVELS.ERROR,
      message: message
    });
  }
  static warn(message:string){
    WrappidLogger.logger.log({
      level: LOG_LEVELS.WARN,
      message: message
    });
  }
  static info(message:string){
    WrappidLogger.logger.log({
      level: LOG_LEVELS.INFO,
      message: message
    });
  }
  static success(message:string){
    WrappidLogger.logger.log({
      level: LOG_LEVELS.SUCCESS,
      message: message
    });
  }
  static debug(message:string){
    WrappidLogger.logger.log({
      level: LOG_LEVELS.DEBUG,
      message: message
    });
  }
  static trace(message:string){
    WrappidLogger.logger.log({
      level: LOG_LEVELS.TRACE,
      message: message
    });
  }
  static verbose(message:string){
    WrappidLogger.logger.log({
      level: LOG_LEVELS.VERBOSE,
      message: message
    });
  }

  static logFunctionStart(functionName:string){
    WrappidLogger.info("Start of function " + functionName);
  }
  static logFunctionEnd(functionName:string){
    WrappidLogger.info("End of function " + functionName);
  }  
}