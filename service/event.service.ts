import { APILogger } from "../logger/api.logger";
import { IEvent } from "../model/event.model";
import { EventRepository } from "../repository/event.repository";

export class EventService {
  private eventRepository: EventRepository;
  private logger: APILogger;

  constructor() {
    this.eventRepository = new EventRepository();
    this.logger = new APILogger();
  }

  async createEvent(eventData: IEvent) {
    try {
      const existEvent = await this.eventRepository.getEvent(eventData);
      if (existEvent.length) {
        this.logger.error("EventService: createTask | event exist");
        return { error: "event exist" };
      }
      return await this.eventRepository.createEvent(eventData);
    } catch (error) {
      throw Error(error);
    }
  }

  async getEvents() {
    try {
      return await this.eventRepository.getEvents();
    } catch (error) {
      throw Error(error);
    }
  }
}
