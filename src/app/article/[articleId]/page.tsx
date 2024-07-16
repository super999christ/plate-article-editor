import { strapiClient } from "@/lib/strapi/strapi";
import ArticleView from "@/views/ArticleView";
import { cookies } from "next/headers";

interface IPageProps {
  params: {
    articleId: string;
  };
}

export default async function ArticleDetailPage({ params }: IPageProps) {
  cookies();

  const { data: article } = (await strapiClient.get(`/articles/${params.articleId}?populate=*`)).data;
  return <ArticleView article={article} />;
}
