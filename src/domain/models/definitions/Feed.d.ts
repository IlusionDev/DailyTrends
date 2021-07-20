import { Model } from "mongoose";

export default interface Feed extends Model<Feed> {
  _id?: String;
  site: String;
  title: String;
  url: String;
  images?: Object;
  date?: Date;
}
