import logger from "@/config/winston";
import ElMundoService from "@/services/ElMundoService";
import Feed from "@/domain/models/Feed";
import FeedService from "@/domain/services/FeedService";

export const execPeriod: String = "*/30 * * * *";
async function cronTask() {
  const feedService = new FeedService();
  logger.info("Executing Cron Task - ElMundo - Scraping");
  let models = await new ElMundoService().start();
  models = models.slice(0, 5);
  await feedService
    .deleteFeedBySite("elMundo")
    .catch((e) => logger.error(e.message));
  Feed.insertMany(models);
}
export default {
  cronTask,
  execPeriod,
};
