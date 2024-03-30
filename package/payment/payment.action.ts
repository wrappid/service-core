import { configProvider } from "../config/provider.config";
import { PaymentConfig } from "../config/types.config";
import { constant } from "../constants/server.constant";
import { razorpayPaymentActions } from "./razorpay/razorpay.payment.action";

type OrderOptions = {
  currency: string,
  gateway?: "paypal" | "razorpay"
}

type DefaultGateway = {
  name: string;
  config: PaymentConfig
}

async function getDefaultPaymentConfig(): Promise<DefaultGateway> {
  try {
    let defaultPayment: DefaultGateway | null = null;
    const paymentConfig:any = configProvider().payment;
    Object.keys(paymentConfig).forEach((key: string) =>{
      if(paymentConfig[key]!=="enabled" && paymentConfig[key].default === true){
        defaultPayment =  {name: key, config: paymentConfig[key]};
        return false;
      }
    });
    return defaultPayment;
  
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export const paymentActions = {
  createOrder: async (amount: string, orderOptions: OrderOptions,  notes?: string,) => {
    try {
      let paymentGatewayName: string;
      if(configProvider().payment.enabled){
        let gatewayConfig: PaymentConfig;
        if(orderOptions?.gateway){
          paymentGatewayName = orderOptions.gateway;
          gatewayConfig = configProvider().payment[orderOptions.gateway];
        }else{
          const defultConfigWithName:DefaultGateway = await getDefaultPaymentConfig();
          gatewayConfig = defultConfigWithName.config;
          paymentGatewayName = defultConfigWithName.name;
        }
        switch (paymentGatewayName) {
          case constant.paymentGateway.PAYPAL:
            break;
          case constant.paymentGateway.RAZORPAY:
            return razorpayPaymentActions.createOrder(gatewayConfig, amount, notes);
          default:
            throw new Error("Payment Gateway is invalid.");
        }
        
      }else{
        throw new Error("Payment Disabled!!");
      }
      
    } catch (error: any) {
      throw new Error(error);
    }
  },


  verifyPayment: async (orderId: string, paymentId: string, paymentGatewayName?: "paypal" | "razorpay",) => {
    try {
      let secretKey:string;
      if(!paymentGatewayName){
        const defultConfigWithName:DefaultGateway = await getDefaultPaymentConfig();
        secretKey = defultConfigWithName.config.secret;
        paymentGatewayName = defultConfigWithName.name as "paypal" | "razorpay";
      }else{
        secretKey = configProvider().payment[paymentGatewayName].secret;
      }
      switch (paymentGatewayName) {
        case constant.paymentGateway.PAYPAL:
          break;
        case constant.paymentGateway.RAZORPAY:
          return razorpayPaymentActions.verifyPayment(secretKey,orderId, paymentId);
        default:
          throw new Error("Payment Gateway is invalid.");
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

};