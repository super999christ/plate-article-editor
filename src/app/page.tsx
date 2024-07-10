import { strapiClient } from "@/lib/strapi/strapi";
import MainView from "@/views/MainView";

export default async function IndexPage() {
  const { data: articles } = (await strapiClient.get('/articles?populate[background][populate]=*&populate[title][populate]=*&sort=id:asc&publicationState=preview')).data;
  return <MainView articles={articles} />;  
}
