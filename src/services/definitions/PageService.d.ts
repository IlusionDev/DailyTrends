export default interface PageService<T> {
  pageContent: String;
  models: Array<T>;
  requestPage: Function;
  parseContent: Function;
  generateModels: Function;
  start: Function;
}
