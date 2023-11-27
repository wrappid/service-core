export class ConfigConstant {
  static readonly database: {
    DB_DIALECT: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    DB_LOGGING: string;
  } = {
    DB_DIALECT: "dialect",
    DB_HOST: "host",
    DB_PORT: "port",
    DB_USERNAME: "username",
    DB_PASSWORD: "password",
    DB_DATABASE: "database",
    DB_LOGGING: "logging",
  };
  static readonly entityStatus: {
    WRAPPID_SERVICE_CONFIG_PATH: any;
    DEFAULT: string;
    UNKNOWN: string;
    NEW: string;
    ACTIVE: string;
    INACTIVE: string;
    DELETED: string;
    COMPLETED: string;
    CURRENT: string;
    RESCHEDULED: string;
    ONHOLD: string;
    SENT: string;
    SENT_FAILED: string;
    DRAFT: string;
    REVIEW_REQUESTED: string;
    APPROVED: string;
    REJECTED: string;
    PENDING: string;
    PUBLISHED: string;
    CHANGE_REQUESTED: string;
  } = {
    WRAPPID_SERVICE_CONFIG_PATH: "WRAPPID_SERVICE_CONFIG_PATH",
    DEFAULT: "active",
    UNKNOWN: "unknown",
    NEW: "new",
    ACTIVE: "active",
    INACTIVE: "inactive",
    DELETED: "deleted",
    COMPLETED: "completed",
    CURRENT: "current",
    RESCHEDULED: "rescheduled ",
    ONHOLD: "on_hold",
    SENT: "sent",
    SENT_FAILED: "sent_failed",
    DRAFT: "draft",
    REVIEW_REQUESTED: "review_requested",
    APPROVED: "approved",
    REJECTED: "rejected",
    PENDING: "pending",
    PUBLISHED: "published",
    CHANGE_REQUESTED: "change_requested",
  };
  static readonly httpMethod: {
    HTTP_GET: string;
    HTTP_POST: string;
    HTTP_PUT: string;
    HTTP_PATCH: string;
  } = {
    HTTP_GET: "get",
    HTTP_POST: "post",
    HTTP_PUT: "put",
    HTTP_PATCH: "patch",
  };
  static readonly userRoles: {
    ROLE_SYSTEM_ADMIN: string;
    ROLE_ONBOARDING_SALESFORCE: string;
    ROLE_ONBOARDING_BACK_OFFICE: string;
    ROLE_PATIENT_BACK_OFFICE: string;
    ROLE_DOCTOR: string;
    ROLE_ASSISTANT: string;
    ROLE_PATIENT: string;
  } = {
    ROLE_SYSTEM_ADMIN: "system_admin",
    ROLE_ONBOARDING_SALESFORCE: "onboarding_salesforce",
    ROLE_ONBOARDING_BACK_OFFICE: "onboarding_back_office",
    ROLE_PATIENT_BACK_OFFICE: "patient_back_office",
    ROLE_DOCTOR: "doctor",
    ROLE_ASSISTANT: "assistant",
    ROLE_PATIENT: "patient",
  };
  static readonly contact: {
    EMAIL: string;
    PHONE: string;
    WHATSAPP: string;
  } = {
    EMAIL: "email",
    PHONE: "phone",
    WHATSAPP: "whatsapp",
  };
  static readonly commType: {
    EMAIL: string;
    SMS: string;
    WHATSAPP: string;
    NOTIFICATION: string;
  } = {
    EMAIL: "email",
    SMS: "sms",
    WHATSAPP: "whatsapp",
    NOTIFICATION: "notification",
  };
  static readonly emailService: { GMAIL: string } = { GMAIL: "gmail" };
  static readonly smsService: { KIT_19: string } = { KIT_19: "kit19" };
  static readonly communication: {
    SENT_OTP_MAIL_EN: string;
    SENT_OTP_SMS_EN: string;
    SENT_PRESCRIPTION_MAIL: string;
    SENT_PRESCRIPTION_WHATSAPP: string;
    ADD_USER_NOTIFICATION_MAIL: string;
    SENT_ASSISTANT_INVITATION: string;
  } = {
    SENT_OTP_MAIL_EN: "sent_otp_mail_en",
    SENT_OTP_SMS_EN: "sent_otp_sms_en",
    SENT_PRESCRIPTION_MAIL: "sent_prescription_mail",
    SENT_PRESCRIPTION_WHATSAPP: "share_prescription_whatsapp_en",
    ADD_USER_NOTIFICATION_MAIL: "add_user_notification_mail",
    SENT_ASSISTANT_INVITATION: "sent_assistant_invitation",
  };
  static readonly __RouteSource: {
    CLIENT_SIDE: string;
    SERVER_SIDE: string;
  } = { CLIENT_SIDE: "client-side", SERVER_SIDE: "server-side" };
  static readonly nodeEnv: {
    NODE_DEV_ENV: string;
    NODE_TEST_ENV: string;
    NODE_PROD_ENV: string;
  } = {
    NODE_DEV_ENV: "development",
    NODE_TEST_ENV: "test",
    NODE_PROD_ENV: "production",
  };
  static readonly routes: { DOCTOR_INVITATIONS: string } = {
    DOCTOR_INVITATIONS: "invitations/doctor",
  };
  static readonly relation: { ASSISTANT: string } = { ASSISTANT: "Assistant" };
  static readonly communicationContentType: {
    HTML: string;
    TEXT: string;
  } = { HTML: "text/html", TEXT: "text/plain" };
  static readonly storageType: {
    AWS_S3: string;
    LOCAL: string;
  } = {
    AWS_S3: "aws_s3",
    LOCAL: "local",
  };
  static WRAPPID_SERVICE_CONFIG_PATH: any;
}
