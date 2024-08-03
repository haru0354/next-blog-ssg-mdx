import type { Metadata } from "next";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import { useMDXComponents } from "@/mdx-components";
import {
  getCategories,
  getCategory,
} from "@/app/component/lib/CategoryService";
import CategoryInArticlesList2Images from "@/app/component/contentArea/CategoryInArticlesList2Images";
import Breadcrumbs from "@/app/component/contentArea/Breadcrumbs";

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

const Page = async ({ params }: { params: { category_slug: string } }) => {
  const category = await getCategory(params.category_slug);
  const components = useMDXComponents();

  return (
    <>
      <div className="content-style p-4 bg-white border border-gray-200">
        <Breadcrumbs
          categorySlug={params.category_slug}
          categoryName={category.frontmatter.categoryName}
          isCategory={true}
        />
        <h1 className="text-2xl font-semibold mx-2 my-4">
          {category.frontmatter.title}
        </h1>
        {category.frontmatter.eyeCatchName && (
          <Image
            src={`/image_webp/${category.frontmatter.eyeCatchName}.webp`}
            alt={`${category.frontmatter.eyeCatchAlt}`}
            width={750}
            height={493}
            className="mx-auto mb-6"
          />
        )}
        {category.content && (
          <>
            {category.frontmatter.date && (
              <p className="mx-2 mb-6 text-gray-600 font-sm">
                投稿日：{category.frontmatter.date}
              </p>
            )}
            <MDXRemote
              source={category.content}
              components={components}
              options={{
                mdxOptions: {
                  remarkPlugins: [
                    [remarkToc, { maxDepth: 3, heading: "目次" }],
                  ],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </>
        )}
      </div>
      <CategoryInArticlesList2Images
        params={params.category_slug}
        categoryName={category.frontmatter.categoryName}
      />
    </>
  );
};

export default Page;
