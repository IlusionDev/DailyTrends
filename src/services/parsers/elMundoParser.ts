import { JSDOM } from "jsdom";

export default function (pageContent: string) {
  const dom = new JSDOM(pageContent);
  global.dom = dom;
  const newElements = dom.window.document.querySelectorAll(
    ".ue-c-cover-content__body"
  );
  const news = [];
  newElements.forEach((element) => {
    const imageHeader = element.getElementsByClassName(
      "ue-c-cover-content__media"
    );
    const titleKicker = element.getElementsByClassName(
      "ue-c-cover-content__kicker"
    );
    const title = element.getElementsByClassName(
      "ue-c-cover-content__headline"
    );
    const url = element
      .getElementsByTagName("a")
      .item(0)
      .attributes.getNamedItem("href")?.value;

    let images = {};

    if (imageHeader.length) {
      const image = imageHeader.item(0).getElementsByTagName("source").item(0);
      const imageUrl = image?.attributes.getNamedItem("srcset");
      if (imageUrl) {
        let urlArray = image.attributes.getNamedItem("srcset").value.split(",");
        urlArray.forEach((url) => {
          const urlAndSize = url.split(/\s*(\d*)w$/);
          images[urlAndSize[1]] = urlAndSize[0];
        });
      }
    }

    news.push({
      url,
      title: titleKicker.item(0)?.innerHTML + title.item(0)?.innerHTML,
      images,
      site: "elMundo",
    });
  });

  return news;
}
