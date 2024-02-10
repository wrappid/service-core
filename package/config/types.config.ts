import { Dialect } from "sequelize";

export interface CacheConfig {
  name: string;
  username: string;
  password: string;
  host: string;
  port: number;
}

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

export interface JwtConfig {
  accessTokenSecret: string;
  refreshAccessTokenSecret: string;
  expTime: string;
  expTimeRefreshToken: string;
}

export interface StorageConfig {
  s3: {
    bucket: string;
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
  };
}

export interface RazorpayConfig {
  razorpayKey: string;
  razorpaySecret: string;
}

export interface EmailProviderConfig {
  fromName: string;
  fromEmail: string;
  replyTo: string;
  service: string;
  email: string;
  password: string;
}

export interface SmsProviderConfig {
  service: string;
  url: string;
  username: string;
  password: string;
  sender: string;
}

export interface WhatsappProviderConfig {
  api_url: string;
  id: string;
  accessToken: string;
}

export interface GithubConfig {
  createIssueURL: string;
  token: string;
  defaultLabels: string[];
}

export interface LoggingConfig {
  accessLog: string;
}

export interface WrappidConfig {
  otpLength: number;
}

interface Config {
  cache: CacheConfig[];
  databases: DatabaseConfig[];
  jwt: JwtConfig;
  storage: StorageConfig;
  razorpay: RazorpayConfig;
  emailProvider: EmailProviderConfig;
  smsProvider: SmsProviderConfig;
  whatsappProvider: WhatsappProviderConfig;
  github: GithubConfig;
  logging: LoggingConfig;
  wrappid: WrappidConfig;
}

export default Config;
