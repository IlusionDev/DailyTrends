import axios from "axios";

export default async function (pagePath: string) {
  return await axios.get(pagePath);
}
