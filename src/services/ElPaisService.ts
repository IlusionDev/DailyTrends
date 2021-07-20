import PageService from "@/services/definitions/PageService";
import getElPaisNews from "@/api/getElPaisNews";
import elPaisParser from "@/services/parsers/elPaisParser";
import Feed from "@/domain/models/definitions/Feed";
import PageServiceBase from "@/services/PageServiceBase";

export default class ElPaisService
  extends PageServiceBase
  implements PageService<any>
{
  pageContent = null;
  news: any = [];
  models: Array<Feed> = [];

  async requestPage(): Promise<void> {
    const pageData = await getElPaisNews();
    this.pageContent = pageData;
  }

  parseContent(): void {
    this.news = elPaisParser(this.pageContent);
  }
}
