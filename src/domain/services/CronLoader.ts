import fs from "fs";
import cron from "cron";
import path from "path";
import logger from "@/config/winston";

const DIR_ROUTE = path.resolve(__dirname, "../../", "cron/tasks");
const CronJob = cron.CronJob;

export default function (): Promise<void> {
  return new Promise<void>((resolve) => {
    fs.readdir(DIR_ROUTE, async (err, files) => {
      if (err) {
        logger.error(err);
        return;
      }

      for (const cronFile of files) {
        if (cronFile === "__tests__") continue;

        await import(`${DIR_ROUTE}/${cronFile}`).then(
          ({ default: { cronTask, execPeriod } }) => {
            const job = new CronJob(execPeriod, cronTask, null, true);
          }
        );
      }
      resolve();
    });
  });
}
