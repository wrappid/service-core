import { Dialect } from "sequelize";

/**
 *
 */
export interface CacheConfig {
  name: string;
  username: string;
  password: string;
  host: string;
  port: number;
}

/**
 *
 */
export interface DatabaseConfig {
  name: string;
  host: string;
  port: number;
  dialect: Dialect;
  database: string;
  username: string;
  password: string;
  logging?: boolean;
}

/**
 *
 */
export interface JwtConfig {
  accessTokenSecret: string;
  refreshAccessTokenSecret: string;
  expTime: string;
  expTimeRefreshToken: string;
}

/**
 *
 */
export interface StorageConfig {
  s3: {
    bucket: string;
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
  };
}



/**
 *
 */
export interface EmailProviderConfig {
  fromName: string;
  fromEmail: string;
  replyTo: string;
  service: string;
  email: string;
  password: string;
}

/**
 *
 */
export interface SmsProviderConfig {
  service: string;
  url: string;
  username: string;
  password: string;
  sender: string;
}

/**
 *
 */
export interface WhatsappProviderConfig {
  api_url: string;
  id: string;
  accessToken: string;
}

/**
 *
 */
export interface GithubConfig {
  createIssueURL: string;
  token: string;
  defaultLabels: string[];
}

/**
 *
 */
export interface LoggingConfig {
  accessLog: string;
}

/**
 *
 */
export interface WrappidConfig {
  otpLength: number;
  defaultUserRole: string;
}


/**
 *
 */
export interface Communication {
  enabled: boolean;
  email: Email;
  sms: Sms;
  whatsapp: Whatsapp;
}
/**
 *
 */
export interface Whatsapp {
  enabled: boolean;
  providers: WhatsappProvider[];
}
/**
 *
 */
export interface WhatsappProvider {
  default: boolean;
  api_url: string;
  id: string;
  accessToken: string;
}
/**
 *
 */
export interface Sms {
  enabled: boolean;
  providers: SmsProvider[];
}
/**
 *
 */
export interface SmsProvider {
  default: boolean;
  enabled: boolean;
  service: string;
  url: string;
  username: string;
  password: string;
  sender: string;
}
/**
 *
 */
export interface Email {
  enabled: boolean;
  providers: EmailProvider[];
}
/**
 *
 */
export interface EmailProvider {
  default: boolean;
  fromName: string;
  fromEmail: string;
  replyTo: string;
  service: string;
  email: string;
  password: string;
}


/**
 *
 */
export interface PaymentGateway  {
  name: string;
  default: boolean;
  key: string;
  secret: string;
}

/**
 *
 */
interface PaymentConfig  {
    enabled: boolean;
    gateways: PaymentGateway[];
}

/**
 *
 */
interface Config {
  cache: CacheConfig[];
  databases: DatabaseConfig[];
  communication: Communication;
  jwt: JwtConfig;
  storage: StorageConfig;
  payment: PaymentConfig;
  github: GithubConfig;
  logging: LoggingConfig;
  wrappid: WrappidConfig;
}

export default Config;
