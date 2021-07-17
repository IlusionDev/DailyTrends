import { PathParams, Router } from "express-serve-static-core";

export default interface RouterFile {
  default: {
    path: PathParams;
    router: Router;
  };
}
