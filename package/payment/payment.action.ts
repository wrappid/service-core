import { constant } from "../constants/server.constant";
import { ApplicationContext } from "../context/application.context";
import { PaymentGateway } from "./../config/types.config";
import { razorpayPaymentActions } from "./razorpay/razorpay.payment.action";

type OrderOptions = {
  currency: string,
  gateway?: "paypal" | "razorpay"
}

/**
 * This function will return default payment config
 * @returns defaultPaymentConfig
 */
async function getDefaultPaymentConfig() {
  try {
    const { payment } = ApplicationContext.getContext(constant.CONFIG_KEY);

    const defaultGateway = payment.gateways.filter(
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
    let paymentGatewayName: string;
    const { payment } = ApplicationContext.getContext(constant.CONFIG_KEY);
    
    if(payment.enabled){
      let gatewayConfig:PaymentGateway;
      if(orderOptions?.gateway){
        paymentGatewayName = orderOptions.gateway;
        gatewayConfig = payment.gateways.find(
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
  },


  verifyPayment: async (orderId: string, paymentId: string, paymentGatewayName?: "paypal" | "razorpay",) => {
    let gatewayConfig:PaymentGateway;
    if(!paymentGatewayName){
      const defultConfigWithName:PaymentGateway[] = await getDefaultPaymentConfig();
      gatewayConfig = {
        name:defultConfigWithName[0].name,
        default:defultConfigWithName[0].default,
        key:defultConfigWithName[0].key,
        secret:defultConfigWithName[0].secret
      };
    } else {
      const { payment } = ApplicationContext.getContext(constant.CONFIG_KEY);
      
      gatewayConfig = payment.gateways.find(
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
  }
};