import logger from "@/config/winston";

export const execPeriod: String = "*/1 * * * *";
function cronTask() {
  logger.info("Executing Cron Task - NewsScraping");
}
export default {
  cronTask,
  execPeriod,
};
