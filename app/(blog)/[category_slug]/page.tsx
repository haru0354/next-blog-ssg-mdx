import Breadcrumbs from "@/app/component/contentArea/Breadcrumbs";
import {
  getCategories,
  getCategory,
} from "@/app/component/lib/CategoryService";
import parse from "html-react-parser";
import Image from "next/image";
import type { Metadata } from "next";
import CategoryInArticlesList2Images from "@/app/component/contentArea/CategoryInArticlesList2Images";

export const generateMetadata = async ({
  params,
}: {
  params: { category_slug: string };
}): Promise<Metadata> => {
  const category = await getCategory(params.category_slug);

  return {
    title: category.frontmatter.title,
    description: category.frontmatter.description,
    openGraph: {
      title: category.frontmatter.title,
      description: category.frontmatter.description,
    },
  };
};

export async function generateStaticParams() {
  const categories = await getCategories();

  return categories.map((category) => ({
    category_slug: category.slug,
  }));
}

const page = async ({ params }: { params: { category_slug: string } }) => {
  const category = await getCategory(params.category_slug);

  return (
    <>
      <div className="content p-4 bg-white border border-gray-200">
        <Breadcrumbs
          categorySlug={params.category_slug}
          categoryName={category.frontmatter.categoryName}
          isCategory={true}
        />
        <h1 className="text-2xl font-semibold mx-2 my-4">
          {category.frontmatter.title}
        </h1>
        <Image
          src={`/image_webp/${category.frontmatter.eyeCatchName}.webp`}
          alt={`${category.frontmatter.eyeCatchAlt}`}
          width={750}
          height={493}
          className="mx-auto"
        />
        <p className="my-2 mx-2 mb-6 text-gray-600 font-sm">
          投稿日：{category.frontmatter.date}
        </p>
        {parse(category.contentHtml)}
      </div>
      <CategoryInArticlesList2Images params={params.category_slug} />
    </>
  );
};

export default page;
