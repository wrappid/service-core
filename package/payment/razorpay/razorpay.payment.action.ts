import crypto from "crypto";
import Razorpay from "razorpay";
import { PaymentGateway } from "./../../config/types.config";

type Config = {
    key_id: string,
    key_secret: string
}


/**
 * This function helps us to create payment gateway instance
 * 
 * @param config : payment auth config
 * @returns instance
 */
async function createInstance(config: Config) {
  try {
    const instance = new Razorpay({
      ...config
    });
    return instance;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


type RazorpayOrderOptions = {
  amount: number;
  currency: string;
  receipt?: string;
  payment_capture?: boolean;
  description?: string;
  customer?: {
    name: string;
    email: string;
  };
  prefill?: {
    name: string;
    email: string;
    contact?: string; // Optional phone number
  };
  notes?: { [key: string]: any };
  display_amount?: number;
  display_currency?: string;
  order_currency?: string;
  image?: string;
  theme?: {
    color?: string;
    customer?: {
      name_color?: string;
    };
  };
}


export const razorpayPaymentActions = {
  createOrder: async (gatewayConfig:PaymentGateway,  amount: string, notes?: string) => {
    const config: Config = {
      key_id: gatewayConfig.key,
      key_secret: gatewayConfig.secret
    };
    const instance = await createInstance(config);
    const options:RazorpayOrderOptions = {
      amount: Number(amount),
      currency: "INR",
      notes: { key: notes }
    };
    const order = await instance.orders.create(options);
    return order;
  },

  verifyPayment: async (secretKey: string, orderId: string, paymentId: string) => {
    try {
      const keySecret = secretKey;      
 
      // Creating hmac object  
      const hmac = crypto.createHmac("sha256", keySecret);  
  
      // Passing the data to be hashed 
      hmac.update(orderId + "|" + paymentId); 
      
      // Creating the hmac in the required format 
      const generatedSignature = hmac.digest("hex"); 
      return generatedSignature;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};