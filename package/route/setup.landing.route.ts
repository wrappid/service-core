import * as fs from "fs";
import * as path from "path";
import { Request, Response } from "express";
import { extractUrl } from "../utils/routes.utils";

// const RouteContentType = {
//   HTML: "html",
//   MARKDOWN: "markdown",
//   JSON: "json"
// };
// type LandingRouteContentType = "html" | "markdown" | "json";
// interface LandingRouteOptions {
//     type: LandingRouteContentType;
//     html?: string;
//     markdown?:string;
//     /** @todo disabling any for the below line to support any json value content support */
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     data?: {[key: string]: any};
// }
type WrappidConfigObjectType = {[key: string]: (string | number | boolean)[] | string | number | boolean | {[key: string]: (string | number | boolean)[] | string | number | boolean}};

const placeHolderKeyMap: { [key: string]: string } = {
  PROJECT_NAME: "package.name",
  PROJECT_DESC: "package.description",
  PROJECT_VERSION: "package.version",
  PROJECT_AUTHOR: "package.author.name",
  PROJECT_HOMEPAGE_URL: "package.homepage",
  PROJECT_REPO_URL: "package.repository.url",
  PROJECT_BUGS_URL: "package.bugs.url",
};

/**
 * This function helps us to get values from the nested json object
 * 
 * @param data : Wrappid Config Object
 * @param dataKey : the json key
 * @returns 
 */
function getDataValue(data: WrappidConfigObjectType, dataKey: string): string {
  const keysArray: string[] = dataKey.split(".");
  let tempData: WrappidConfigObjectType = data;
  let value = "";

  keysArray.forEach((key: string) => {
    if(tempData && typeof tempData === "object" 
    && Object.prototype.hasOwnProperty.call(tempData, key)){
      if(tempData[key] && (typeof tempData[key] === "string" 
      || typeof tempData[key] === "number" 
      || typeof tempData[key] === "boolean")){
        value = extractUrl(tempData[key].toString());
      } else if(tempData[key] && typeof tempData[key] === "object"){
        tempData = <WrappidConfigObjectType>tempData[key];
        
      } else {
        console.error(`${key} is not a valid datatype`);
      }
    } else {
      console.warn(`${key} is not an object`);
    }
  });

  return value;
}

/**
 * This functions helps us to prepare landing page content for our service
 * 
 * @returns landingContent
 */
function prepareLandingContent(): string{
  try {
    const packageInfo: WrappidConfigObjectType = JSON.parse(fs.readFileSync("./package.json", "utf8"));
    const data: WrappidConfigObjectType = <WrappidConfigObjectType>{ package: packageInfo };
    /**
     * projectName projectDesc
     * @todo
     *  1. Get the the content of default.landing.html 
     *  2. Replace all placeholders with values from options
     *  3. Return the replaced html content
     */
    
    let template = fs.readFileSync(path.join(__dirname, "../content/default.landing.html"), "utf8");
    Object.keys(placeHolderKeyMap).forEach((placeHolder: string) => {
      if (/** @todo  */ template.includes(`{{${placeHolder}}}`)){
        const dataKey: string = placeHolderKeyMap[placeHolder]; //datakey = "package.name"
        /**
         *  @todo
         *  have to make more generic , presently supporting only "package."
         */
        const dataValue = getDataValue(data, dataKey);
        template = template.replaceAll(`{{${placeHolder}}}`, dataValue);
      }
    });
    return template;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const  setupLandingRoute = (app: any) => {
  app.get("/", (req:Request,res:Response)=>{
    try {
      const content: string = prepareLandingContent();
      res.status(200).send(content);
      /**
         * @todo decision pending
         * need the below case for render type of the content or not
         */
      // switch (options.type) {
      //     case RouteContentType.HTML:
      //         res.status(200).sendFile();
      //         break;
      //     case RouteContentType.HTML:
      //         res.status(200).sendFile();
      //         break;
      //     case RouteContentType.JSON:
      //         res.status(200).sendFile();
      //         break;
      //     default:
      //         break;
        
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
};