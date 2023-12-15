import { ConfigConstant } from "../constant/config.constant";
import { CommunicationUtils } from "./communication.utils";
import { Kit19SmsCommunicationService } from "./sms/kit19.sms.communication.service";

export abstract class CommunicationService {
  /**
   * @todo
   * Add three abstract methods
   * validateRecipents
   * communication
   * PrepareMessage
   *
   */
  abstract validateRecipents(): void;
  abstract communication(): Promise<any>;
  abstract communication(data: string): void;
  abstract prepareMessage(): void;
}
