import { configProvider } from "../config/provider.config";
import { constant } from "../constants/server.constant";
import { PaymentGateway } from "./../config/types.config";
import { razorpayPaymentActions } from "./razorpay/razorpay.payment.action";

type OrderOptions = {
  currency: string,
  gateway?: "paypal" | "razorpay"
}


async function getDefaultPaymentConfig() {
  try {
    const defaultGateway = configProvider().payment.gateways.filter(
      (gateway: PaymentGateway) => gateway.default === true
    );
    if(defaultGateway.length > 1 ){
      throw new Error("Payment gatway cannot have multiple 'default': true");
    }
    if (defaultGateway.length == 0) {
      throw new Error("Payment gatway cannot have any 'default': true");
    }
    return defaultGateway;
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
        let gatewayConfig:PaymentGateway;
        if(orderOptions?.gateway){
          paymentGatewayName = orderOptions.gateway;
          gatewayConfig = configProvider().payment.gateways.find(
            (gateway: PaymentGateway) => gateway.name === paymentGatewayName
          );
        }else{
          const defultConfigWithName: PaymentGateway[] = await getDefaultPaymentConfig();
          gatewayConfig = {
            name:defultConfigWithName[0].name,
            default:defultConfigWithName[0].default,
            key:defultConfigWithName[0].key,
            secret:defultConfigWithName[0].secret
          };
        }
        switch (gatewayConfig.name) {
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
      let gatewayConfig:PaymentGateway;
      if(!paymentGatewayName){
        const defultConfigWithName:PaymentGateway[] = await getDefaultPaymentConfig();
        gatewayConfig = {
          name:defultConfigWithName[0].name,
          default:defultConfigWithName[0].default,
          key:defultConfigWithName[0].key,
          secret:defultConfigWithName[0].secret
        };
      }else{
        gatewayConfig = configProvider().payment.gateways.find(
          (gateway: PaymentGateway) => gateway.name === paymentGatewayName
        );
      }
      const secretKey: string = gatewayConfig.secret;
      switch (gatewayConfig.name) {
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