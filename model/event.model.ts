import { model, Schema, Model } from "mongoose";

export interface IEvent {
  eventType: string;
  eventDate: string;
}

const EventSchema: Schema = new Schema({
  eventType: { type: String, required: true },
  eventDate: { type: Date, required: true },
});

export const EventModel: Model<IEvent> = model<IEvent>("events", EventSchema);
