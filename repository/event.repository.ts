import { connect, disconnect } from "../config/db.config";
import { EventModel, IEvent } from "../model/event.model";
import { APILogger } from "../logger/api.logger";
import * as dayjs from "dayjs";
export class EventRepository {
  private logger: APILogger;

  constructor() {
    connect();
    this.logger = new APILogger();
  }

  async getEvents() {
    try {
      this.logger.info("EventRepository:: getEvents");

      return await EventModel.find({
        eventDate: { $gte: dayjs().format("YYYY-MM-DD") },
      }).sort({ eventDate: 1 });
    } catch (error) {
      this.logger.error(`ERROR :: EventRepository:: getEvents | ${error}`);
    }
  }

  async getEvent(eventData: IEvent) {
    try {
      this.logger.info("EventRepository:: getEvent |", eventData);
      const { eventType, eventDate } = eventData;
      const event = await EventModel.find({
        eventType,
        eventDate,
      });

      this.logger.info("EventRepository:: getEvent | event retrieved: ", event);

      return event;
    } catch (error) {
      this.logger.error(`ERROR :: EventRepository:: getEvent | ${error}`);
    }
  }

  async createEvent(eventData: IEvent) {
    try {
      this.logger.info("EventRepository:: createEvent |", eventData);
      const { eventType, eventDate } = eventData;
      const event = await EventModel.create({
        eventType,
        eventDate: dayjs(eventDate).set("hour", 14),
      });

      return event;
    } catch (error) {
      this.logger.error(`ERROR :: EventRepository:: getEvent | ${error}`);
    }
  }
}
