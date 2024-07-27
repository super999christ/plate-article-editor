import { getCurrentUser } from "@/lib/actions/server";
import { strapiClient } from "@/lib/strapi/strapi";
import ArticleView from "@/views/ArticleView";
import { redirect } from "next/navigation";

interface IPageProps {
  params: {
    articleId: string;
  };
}

export default async function ArticleDetailPage({ params }: IPageProps) {
  const user = getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  const { data: article } = (await strapiClient.get(`/articles/${params.articleId}?populate=*`)).data;
  return <ArticleView article={article} />;
}
