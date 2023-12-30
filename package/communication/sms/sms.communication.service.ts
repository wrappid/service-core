import { CommunicationService } from "../communication.service";

export class SmsCommunicationService extends CommunicationService {
  validateRecipents(): void {}
  communication(): Promise<any>;
  communication(data: string): void;
  communication(data?: unknown): void | Promise<any> {}
  prepareMessage(): void {}
  /**
   * abstract class
   */
}