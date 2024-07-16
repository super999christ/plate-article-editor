'use client'

import PlateEditor from "@/components/plate-editor";
import { buttonVariants } from "@/components/plate-ui/button";
import { ICArticle } from "@/lib/types";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IProps {
  article: ICArticle;
};

export default function ArticleView({ article }: IProps) {
  const [exportTriggered, setExportTriggered] = useState(0);
  const router = useRouter();
  const [isSaving, setSaving] = useState(false);

  const onExportContent = () => {
    setExportTriggered(exportTriggered => exportTriggered + 1);
  };

  const handleGenerateContent = async (contentHtml: string, contentValues: any[]) => {
    setSaving(true);
    try {
      const blogContent = JSON.stringify(contentValues);
      await axios.put('/api/update-article', { blogContent, articleId: article.id });
      alert("Successfully saved the article!");
    } catch (err) {
      console.error("Failed to update article: ", err);
      alert("Failed to save the article!");
    } finally {
      setSaving(false);
    }
  };

  const onCancel = () => {
    router.push('/');
  };

  const getInitialValue = () => {
    const defaultValue = [
      {
        id: '1',
        type: ELEMENT_PARAGRAPH,
        children: [{ text: '' }],
      }
    ];
    try {
      return JSON.parse(article.attributes.blogContent);
    } catch (err) {
      return defaultValue;
    }
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {article.attributes.title}
        </h1>
      </div>
      <div className="flex gap-4">
        <button
          className={buttonVariants()}
          onClick={onExportContent}
          disabled={isSaving}
        >
          Save
        </button>
        <button
          className={buttonVariants({ variant: 'outline' })}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>

      <div className="max-w-[1336px] rounded-lg border bg-background shadow">
        <PlateEditor exportTriggered={exportTriggered} handleGenerateContent={handleGenerateContent} initialValue={getInitialValue()} />
      </div>
    </section>
  );
}
