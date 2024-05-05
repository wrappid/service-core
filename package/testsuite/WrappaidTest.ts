import request from "supertest";

const APIReqMethod: {[key: string]: RequestMethod} = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch"
};
  
  type GenericObject ={
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any
  } 
  
  type RequestMethod = "get" | "post" | "put" | "patch";
  
  type APITestOptionsType = {
      method: RequestMethod;
      endpoint: string;
      data?:  GenericObject
  }

  type WrappaidTestConfig = {
    baseURL: string;
  }

export default class WrappaidTest {
  baseURL = "";

  constructor(config: WrappaidTestConfig) {
    this.baseURL = config.baseURL;
  }

  public async apiTest(options: APITestOptionsType) {
    const requestInstance = request(this.baseURL);

    /**
     * @todo Need to remove this 
     */
    let _requestInstance = null;

    switch (options.method) {
      case APIReqMethod.GET:
        _requestInstance = requestInstance.get(options.endpoint);
          
        break;
      case APIReqMethod.POST:
        _requestInstance = requestInstance.post(options.endpoint);
          
        break;
      case APIReqMethod.PUT:
        _requestInstance = requestInstance.put(options.endpoint);
          
        break;
      case APIReqMethod.PATCH:
        _requestInstance = requestInstance.patch(options.endpoint);
          
        break;
      default:
        throw new Error("Method was not mentioned");
        break;
    }

    return await _requestInstance.send(options.data).set("Content-Type", "application/json")
      .set("Accept-Encoding", "gzip, deflate, br")
      .set("Connection", "keep-alive")
      .set("User-Agent",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36");
  
  }
}
  
  