import PageService from "@/services/definitions/PageService";
import Feed from "@/domain/models/definitions/Feed";
import feedFactory from "@/domain/factories/feedFactory";

export default class PageServiceBase implements PageService<any> {
  pageContent = null;
  news: any = [];
  models: Array<Feed> = [];

  async requestPage(): Promise<void> {}

  parseContent(): void {}

  generateModels(): void {
    this.news.forEach((newFeed) => this.models.push(feedFactory(newFeed)));
  }

  async start(): Promise<Array<any>> {
    await this.requestPage();
    this.parseContent();
    this.generateModels();

    return this.models;
  }
}
