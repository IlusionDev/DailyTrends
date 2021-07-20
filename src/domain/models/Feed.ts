import { Schema, model, Model } from "mongoose";
import Feed from "@/domain/models/definitions/Feed";

const feedSchema = new Schema<Feed>({
  site: {
    type: String,
    required: true,
    index: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  images: Object,
  date: { type: Date, default: Date.now },
});

const Feed: Model<Feed> = model<Feed>("Feed", feedSchema);

export default Feed;
