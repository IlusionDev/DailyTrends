import { Model } from "mongoose";
import ErrorApi from "@/global/errors/ErrorApi";
import FeedDto from "@/domain/dto/FeedDto";

export default class ModelService<T extends Model<any>> {
  model: T;

  constructor(model: T) {
    this.model = model;
  }

  async find(params?: any) {
    return await this.model.find(params);
  }

  async findOne(params: any) {
    return await this.model.findOne(params);
  }

  async delete(feed: FeedDto) {
    const existFeed = await this.model.findById(feed.id);
    if (!existFeed) throw new ErrorApi("Feed not exists", 404);

    return await this.model.deleteOne(feed);
  }

  async insert(feed: FeedDto) {
    const existFeed = await this.model.findOne({
      site: feed.site,
      url: feed.url,
      title: feed.title,
    });
    if (existFeed) throw new ErrorApi("Feed already exists", 400);

    return await this.model.create(feed);
  }

  async update(searchFeed: FeedDto, feed: FeedDto) {
    const existFeed = await this.model.findById(searchFeed?.id);
    if (!existFeed) throw new ErrorApi("Feed not exists", 404);
    await this.model.updateOne({ _id: searchFeed.id }, { $set: { ...feed } });
  }
}
