/* eslint-disable no-unused-vars */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { constant } from "./../constants/server.constant";

type GenericObject = { [key: string]: any };
export type RequestConfig = {
    baseUrl: string;
    endpoint: string;
    method: string; // @todo separate type
    headers?: GenericObject;
    data?: GenericObject;
    authRequired?: boolean;
    statusCodeHandlers?: { [statusCode: number]: /**
     *
     */
    (data: any) => any }; // Optional handlers for specific status codes
    /**
     *
     */
    customError?: (error: any) => any; // Optional custom error handling function
}

export abstract class APIService {
  protected readonly axios: AxiosInstance;
  protected readonly config: GenericObject;

  constructor(config: {baseUrl: string}) {
    this.config = config;
    this.axios = axios.create();
    this.setupInterceptors();
  }

  /**
   * 
   */
  protected abstract setupInterceptors(): void;

  /**
   * 
   * @param requestConfig 
   */
  protected abstract prepareRequestHeaders(requestConfig: RequestConfig): GenericObject;
  

  /**
   * This function helps us to call third party APIs
   * 
   * @param requestConfig : Request configuration
   * @returns response : Response data
   */
  async request<T>(requestConfig: RequestConfig): Promise<T> {
    try {
      const axiosRequestConfig: AxiosRequestConfig = {
        url: `${this.config.baseUrl}${requestConfig.endpoint}`,
        method: requestConfig.method,
        headers: {
          "Content-Type": constant.contentType.APPLICATION_JSON,
          ...this.prepareRequestHeaders(requestConfig)
        },
        data:requestConfig.data
      };
      

      const response = await this.axios.request(axiosRequestConfig);
      return response.data;
    } catch (error: any) {
      if (requestConfig?.customError) {
        return requestConfig.customError(error);
      }

      if (error.response) {
        // Handle specific response errors (e.g., status codes)
        throw new Error(
          `API request failed: ${error.response.data.message || error.response.statusText}`
        );
      } else if (error.request) {
        // Handle request errors (e.g., network issues)
        throw new Error("Network error while making API request");
      } else {
        // Handle other errors
        throw new Error(error.message);
      }
    }
  }


}    
