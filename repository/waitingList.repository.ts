import { connect, disconnect } from "../config/db.config";
import {
  IWaitingListNode,
  WaitingListNodeModel,
} from "../model/waitingListNode.model";
import { APILogger } from "../logger/api.logger";

export class WaitingListRepository {
  private logger: APILogger;

  constructor() {
    connect();
    this.logger = new APILogger();
  }

  async getWaitingList(eventId: string) {
    try {
      this.logger.info(
        "WaitingListRepository:: getWaitingList | eventId",
        eventId
      );

      const waitingList = await WaitingListNodeModel.find({
        eventId,
      }).sort({
        createdDate: 1,
      });

      return waitingList;
    } catch (error) {
      this.logger.error(
        `ERROR :: WaitingListRepository:: getWaitingList | ${error}`
      );
    }
  }

  async createWaitingListNode(waitingListNode: IWaitingListNode) {
    try {
      this.logger.info(
        "WaitingListRepository:: createWaitingListNode | waitingListNode",
        waitingListNode
      );

      const waitingListResult = await WaitingListNodeModel.create(
        waitingListNode
      );

      return waitingListResult;
    } catch (error) {
      this.logger.error(
        `ERROR :: WaitingListRepository:: createWaitingListNode | ${error}`
      );
    }
  }

  async updateWaitingListNode(
    waitingListNodeId: string,
    waitingListNode: Partial<IWaitingListNode>
  ) {
    try {
      this.logger.info(
        "WaitingListRepository:: updateWaitingListNode | waitingListNode",
        waitingListNode
      );

      const waitingListResult = await WaitingListNodeModel.updateOne(
        { _id: waitingListNodeId },
        waitingListNode
      );

      return waitingListResult;
    } catch (error) {
      this.logger.error(
        `ERROR :: EventRepository:: createWaitingListNode | ${error}`
      );
    }
  }
}
