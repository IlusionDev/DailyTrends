import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve(__dirname, `../../${process.env.NODE_ENV}.env`),
});
import database from "@/config/database";
import cronTaskElMundo from "@/cron/tasks/elMundoScrapingJob";
import cronTaskElPais from "@/cron/tasks/elPaisScrapingJob";

database(() => {
  cronTaskElMundo.cronTask();
  cronTaskElPais.cronTask();
});
