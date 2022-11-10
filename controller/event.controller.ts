import { APILogger } from "../logger/api.logger";
import { IEvent } from "../model/event.model";
import { EventService } from "../service/event.service";

export class EventController {
  private eventService: EventService;
  private logger: APILogger;

  constructor() {
    this.eventService = new EventService();
    this.logger = new APILogger();
  }

  async getEvents() {
    this.logger.info("EventController: getEvents");
    return await this.eventService.getEvents();
  }

  async createEvent(event: IEvent) {
    this.logger.info("EventController: createTask", event);
    return await this.eventService.createEvent(event);
  }
}
