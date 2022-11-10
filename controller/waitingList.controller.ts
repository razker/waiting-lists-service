import { APILogger } from "../logger/api.logger";
import { IWaitingListNode } from "../model/waitingListNode.model";
import { WaitingListService } from "../service/waitingList.service";

export class WaitingListController {
  private waitingListService: WaitingListService;
  private logger: APILogger;

  constructor() {
    this.waitingListService = new WaitingListService();
    this.logger = new APILogger();
  }

  async getWaitingList(eventId: string) {
    this.logger.info("WaitingListController: getWaitingList");
    return await this.waitingListService.getWaitingList(eventId);
  }

  async createWaitingListNode(WaitingListNode: any) {
    const WaitingListToCreate: IWaitingListNode = {
      eventId: WaitingListNode.eventId,
      fullName: WaitingListNode.fullName,
      phoneNumber: WaitingListNode.phoneNumber,
      createdDate: Date(),
      isActive: true,
    };
    this.logger.info(
      "WaitingListController: createWaitingListNode | WaitingListToCreate",
      WaitingListToCreate
    );
    return await this.waitingListService.createWaitingListNode(
      WaitingListToCreate
    );
  }

  async updateWaitingListNode(WaitingListNodeId: string, WaitingListNode: any) {
    const WaitingListToUpdate: Partial<IWaitingListNode> = {
      isActive: WaitingListNode.isActive,
      exchangeName: WaitingListNode?.exchangeName,
    };
    this.logger.info(
      `WaitingListController: updateWaitingListNode | id:${WaitingListNodeId} WaitingListNodeToUpdate`,
      WaitingListToUpdate
    );
    return await this.waitingListService.updateWaitingListNode(
      WaitingListNodeId,
      WaitingListToUpdate
    );
  }
}
