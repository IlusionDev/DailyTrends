import getPage from "@/api/getPage";

const PAGE_URL = "https://www.elmundo.es/";

export default async function () {
  const { data } = await getPage(PAGE_URL);

  return data;
}
