import { APILogger } from "../logger/api.logger";
import { IWaitingListNode } from "../model/WaitingListNode.model";
import { WaitingListRepository } from "../repository/waitingList.repository";

export class WaitingListService {
  private waitingListRepository: WaitingListRepository;
  private logger: APILogger;

  constructor() {
    this.waitingListRepository = new WaitingListRepository();
    this.logger = new APILogger();
  }

  async getWaitingList(eventId: string) {
    try {
      return await this.waitingListRepository.getWaitingList(eventId);
    } catch (error) {
      throw Error(error);
    }
  }

  async createWaitingListNode(WaitingListNode: IWaitingListNode) {
    try {
      return await this.waitingListRepository.createWaitingListNode(
        WaitingListNode
      );
    } catch (error) {
      throw Error(error);
    }
  }

  async updateWaitingListNode(
    WaitingListNodeId: string,
    WaitingListNode: Partial<IWaitingListNode>
  ) {
    try {
      return await this.waitingListRepository.updateWaitingListNode(
        WaitingListNodeId,
        WaitingListNode
      );
    } catch (error) {
      throw Error(error);
    }
  }
}
