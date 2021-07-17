export default interface CronFile {
  default: {
    execPeriod: String;
    cronTask: Promise;
  };
}
