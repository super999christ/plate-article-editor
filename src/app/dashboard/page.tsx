import { getCurrentUser } from "@/lib/actions/server";
import { strapiClient } from "@/lib/strapi/strapi";
import MainView from "@/views/MainView";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  const { data: articles } = (await strapiClient.get(`/articles?populate=*&sort=id:asc&publicationState=preview`)).data;
  return <MainView articles={articles} />;
}
