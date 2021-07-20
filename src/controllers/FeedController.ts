import Controller from "@/controllers/Controller";
import ErrorApi from "@/global/errors/ErrorApi";
import Feed from "@/domain/models/definitions/Feed";
import FeedService from "@/domain/services/FeedService";
import FeedDto from "@/domain/dto/FeedDto";

export default class NewsController extends Controller {
  feedService: FeedService;
  constructor(req, res) {
    super(req, res);
    this.feedService = new FeedService();
  }

  async getAllFeeds() {
    const { site, title, _id } = this.req.query;
    let allFeeds;
    try {
      allFeeds = await this.feedService.find({ site, title, _id });
    } catch (e) {
      return this.apiResponse.generateAndSendErrorReponse(e as ErrorApi);
    }
    this.apiResponse.generateAndSendWithStatus(allFeeds);
  }

  async addFeed() {
    let feed = this.req.body;
    let insertedFeed;
    try {
      insertedFeed = await this.feedService.insert(feed);
    } catch (e) {
      return this.apiResponse.generateAndSendErrorReponse(e as ErrorApi);
    }
    this.apiResponse.generateAndSendWithStatus(insertedFeed, {
      statusCode: 201,
    });
  }

  async deleteFeed() {
    const feedId = this.req.params.id;
    let deletedFeed;
    try {
      await this.feedService.delete({
        id: feedId,
      } as unknown as FeedDto);
    } catch (e) {
      return this.apiResponse.generateAndSendErrorReponse(e as ErrorApi);
    }
    this.apiResponse.generateAndSendWithStatus(null);
  }

  async updateFeed() {
    let feed = this.req.body;
    const feedId = this.req.params.id;
    try {
      await this.feedService.update(
        { id: feedId } as unknown as FeedDto,
        feed as Feed
      );
    } catch (e) {
      return this.apiResponse.generateAndSendErrorReponse(e as ErrorApi);
    }
    this.apiResponse.generateAndSendWithStatus(null);
  }
}
