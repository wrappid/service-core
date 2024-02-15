import { Request, Response } from "express";

// const RouteContentType = {
//   HTML: "html",
//   MARKDOWN: "markdown",
//   JSON: "json"
// };
type LandingRouteContentType = "html" | "markdown" | "json";
interface LandingRouteOptions {
    type: LandingRouteContentType;
    html?: string;
    markdown?:string;
    /** @todo disabling any for the below line to support any json value content support */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    json?: {[key: string]: any};
}

function prepareWrappidContent(options: LandingRouteOptions): string{
  try {
    return "<html><body><h1>Hello World!</h1><p>"+JSON.stringify(options)+"</p></body></html>";        
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export const  setupLandingRoute = (wrappidApp: any, options: LandingRouteOptions) => {
  wrappidApp.use("/", (req:Request,res:Response)=>{
    try {
      const content: string = prepareWrappidContent(options);
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