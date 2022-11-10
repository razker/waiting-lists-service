import { model, Schema, Model } from "mongoose";

export interface IWaitingListNode {
  eventId: string;
  fullName: string;
  phoneNumber: string;
  createdDate: string;
  isActive: boolean;
  exchangeName?: string;
}

const WaitingListNodeSchema: Schema = new Schema({
  eventId: { type: String, required: true },
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  createdDate: { type: Date, required: true },
  isActive: { type: Boolean, required: true },
  exchangeName: { type: String },
});

export const WaitingListNodeModel: Model<IWaitingListNode> =
  model<IWaitingListNode>("waitinglists", WaitingListNodeSchema);
