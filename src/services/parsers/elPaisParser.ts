import { JSDOM } from "jsdom";

export default function (pageContent: string) {
  const dom = new JSDOM(pageContent);
  const newElements = dom.window.document.querySelectorAll("h2");
  const news = [];
  newElements.forEach((element) => {
    const aElement = element.getElementsByTagName("a").item(0);
    const title = aElement?.text;
    const url = aElement?.attributes.getNamedItem("href")?.value;
    const image = element.parentElement.getElementsByTagName("img");
    let images = {
      default: image.item(0)?.attributes.getNamedItem("src")?.value,
    };

    news.push({
      url,
      title,
      images,
      site: "elPais",
    });
  });

  return news;
}
