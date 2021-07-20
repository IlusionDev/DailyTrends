import PageService from "@/services/definitions/PageService";
import getElMundoNews from "@/api/getElMundoNews";
import elMundoParser from "@/services/parsers/elMundoParser";
import PageServiceBase from "./PageServiceBase";

export default class ElMundoService
  extends PageServiceBase
  implements PageService<any>
{
  pageContent = null;
  models = [];
  news: any = [];

  async requestPage(): Promise<void> {
    const pageData = await getElMundoNews();
    this.pageContent = pageData;
  }
  parseContent(): void {
    this.news = elMundoParser(this.pageContent);
  }
}
