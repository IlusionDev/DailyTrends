import feedFactory from "@/domain/factories/feedFactory";
import Feed from "@/domain/models/Feed";

jest.mock("@/domain/models/Feed")

const feedMock = {
  url: "https://www.elmundo.es/economia/2021/07/18/60f458a721efa0a9028b462b.ht...",
  title:
    "Plan de Recuperaci�n. Holanda pide supeditar los fondos a que España c...",
  site: "elPais",
  images: {
    default: "test",
  },
};

describe("Feed Factory", () => {
  it("generates a factory", () => {
    const feed = feedFactory(feedMock);

    expect(Feed).toHaveBeenNthCalledWith(1, feedMock);
  });
});
