import mongoose from "mongoose";
import { type InsertMessage, type Message } from "@shared/schema";
import { type InferSchemaType } from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  },
);

type MessageDocument = InferSchemaType<typeof messageSchema> & {
  _id: mongoose.Types.ObjectId;
};

const MessageModel =
  (mongoose.models.Message as mongoose.Model<MessageDocument>) ||
  mongoose.model<MessageDocument>("Message", messageSchema);

export interface IStorage {
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async createMessage(message: InsertMessage): Promise<Message> {
    const doc = await MessageModel.create(message);
    return {
      id: doc._id.toString(),
      email: doc.email,
      message: doc.message,
      createdAt: doc.createdAt?.toISOString() ?? new Date().toISOString(),
    };
  }
}

export const storage = new DatabaseStorage();
