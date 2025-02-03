import Image from "next/image";
import Breadcrumbs from "../content-area/Breadcrumbs";

type ContentsAreaProps = {
  article: Article;
  params: Params;
  isFirstLevelPage?: boolean;
};

type Article = {
  parentCategoryName?: string;
  childCategoryName?: string;
  content?: string | undefined;
  frontmatter: Frontmatter;
};

type Frontmatter = {
  title?: string;
  eyeCatchAlt?: string;
  eyeCatchName?: string;
  date?: string;
};

type Params = {
  firstLevelArticle_slug?: string;
  thirdLevelArticle_slug?: string;
  secondLevelArticle_slug?: string;
};

const ContentsArea: React.FC<ContentsAreaProps> = async ({
  article,
  params,
  isFirstLevelPage = false,
}) => {
  return (
    <div className="content-style p-4">
      <Breadcrumbs
        categorySlug={params.firstLevelArticle_slug}
        categoryName={article.parentCategoryName}
        childCategorySlug={params.secondLevelArticle_slug}
        childCategoryName={article.childCategoryName}
        isFirstLevelPage={isFirstLevelPage}
      />
      {article.content && (
        <>
          {process.env.IMAGE_TOP === "true" ? (
            <>
              {article.frontmatter.eyeCatchAlt &&
                article.frontmatter.eyeCatchName && (
                  <Image
                    src={`/image_webp/${article.frontmatter.eyeCatchName}.webp`}
                    alt={`${article.frontmatter.eyeCatchAlt}`}
                    width={750}
                    height={493}
                    className="mx-auto my-6"
                  />
                )}
              <h1 className="text-2xl font-semibold my-2">
                {article.frontmatter.title}
              </h1>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold mx-2 my-4">
                {article.frontmatter.title}
              </h1>
              {article.frontmatter.eyeCatchAlt &&
                article.frontmatter.eyeCatchName && (
                  <Image
                    src={`/image_webp/${article.frontmatter.eyeCatchName}.webp`}
                    alt={`${article.frontmatter.eyeCatchAlt}`}
                    width={750}
                    height={493}
                    className="mx-auto my-6"
                  />
                )}
            </>
          )}
          {article.frontmatter.date && (
            <p className="mx-2 mb-2 text-right font-sm text-gray-600">
              投稿日：{article.frontmatter.date}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default ContentsArea;
