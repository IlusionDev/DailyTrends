import { connect, connection } from "mongoose";
import logger from "@/config/winston";

export default function (onConnect: any) {
  connect(process.env.DATABASE_CONECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ignoreUndefined: true,
  });
  const db = connection;
  db.on("open", () =>
    logger.info("Database connection to -> localhost:27017/dailytrends")
  );
  db.once("open", onConnect);
}
