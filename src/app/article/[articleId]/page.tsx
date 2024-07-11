import { strapiClient } from "@/lib/strapi/strapi";
import ArticleView from "@/views/ArticleView";

interface IPageProps {
  params: {
    articleId: string;
  };
}

export default async function ArticleDetailPage({ params }: IPageProps) {
  const { data: article } = (await strapiClient.get(`/articles/${params.articleId}?populate[background][populate]=*&populate[title][populate]=*&seed=${Math.random()}`)).data;
  return <ArticleView article={article} />;
}
