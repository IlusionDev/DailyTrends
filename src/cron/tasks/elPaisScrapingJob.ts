import logger from "@/config/winston";
import ElPaisService from "@/services/ElPaisService";
import Feed from "@/domain/models/Feed";
import FeedService from "@/domain/services/FeedService";

const feedService = new FeedService();
export const execPeriod: String = "*/30 * * * *";
async function cronTask() {
  logger.info("Executing Cron Task - ElPais - Scraping");
  let models = await new ElPaisService().start();
  models = models.slice(0, 5);
  await feedService
    .deleteFeedBySite("elPais")
    .catch((e) => logger.error(e.message));
  Feed.insertMany(models);
}
export default {
  cronTask,
  execPeriod,
};
