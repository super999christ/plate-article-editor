'use client';

import Link from 'next/link';

import { ICArticle } from '@/lib/types';

interface IProps {
  articles: ICArticle[];
}

export default function MainView({ articles }: IProps) {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Bloom - Article List
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Explore the list of articles
        </p>
      </div>
      <div className="max-w-[1336px] rounded-lg border bg-background shadow">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
              >
                No
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                State
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {articles.map((article, index) => (
              <tr key={article.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {article.attributes.title}
                </td>
                <td className={`whitespace-nowrap px-3 py-4 text-sm ${article.attributes.publishedAt ? 'text-green-500' : 'text-yellow-700'}`}>
                  {article.attributes.publishedAt ? 'Published' : 'Draft'}
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                  <a
                    href={`/article/${article.id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
