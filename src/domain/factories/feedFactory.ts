import FeedDef from "@/domain/models/definitions/Feed";
import Feed from "@/domain/models/Feed";

export default function (feedData): FeedDef {
  return new Feed(feedData);
}
