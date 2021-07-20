import ModelService from "@/domain/services/ModelService";
import Feed from "@/domain/models/definitions/Feed";
import FeedModel from "@/domain/models/Feed";
import ErrorApi from "@/global/errors/ErrorApi";

export default class FeedService extends ModelService<Feed> {
  constructor() {
    super(FeedModel as Feed);
  }

  async deleteFeedBySite(site: String): Promise<any> {
    return await this.model.deleteMany({ site: site });
  }

  async findFeedBySite(site: String): Promise<any> {
    const feed = await this.find({ site: site });
    if (!feed) throw new ErrorApi("Feed not exists", 404);

    return feed;
  }
}
