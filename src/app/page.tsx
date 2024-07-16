import { strapiClient } from "@/lib/strapi/strapi";
import MainView from "@/views/MainView";
import { cookies } from "next/headers";

export default async function IndexPage() {
  cookies();

  const { data: articles } = (await strapiClient.get(`/articles?populate=*&sort=id:asc&publicationState=preview`)).data;
  return <MainView articles={articles} />;  
}
