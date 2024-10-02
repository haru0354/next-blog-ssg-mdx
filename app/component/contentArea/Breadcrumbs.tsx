import Image from "next/image";
import Link from "next/link";

type BreadcrumbsProps = {
  pageTitle?: string;
  categoryName?: string;
  categorySlug?: string;
  childCategorySlug?: string;
  childCategoryName?: string;
  isNotParentCategoryPage?: boolean;
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  pageTitle,
  categorySlug,
  categoryName,
  childCategorySlug,
  childCategoryName,
  isNotParentCategoryPage = true,
}) => {
  return (
    <div className="text-sm">
      <Image
        src="/image_webp/home.webp"
        alt="home"
        width={25}
        height={25}
        className="inline mb-[2px] mr-2"
      />
      <Link href="/" className="text-sky-600">
        ホーム
      </Link>
      　＞　
      {categorySlug && categoryName ? (
        <Link href={`/${categorySlug}`} className="text-sky-600">
          {categoryName}
        </Link>
      ) : (
        categoryName
      )}
      {childCategorySlug && childCategoryName && (
        <>
          　＞　
          <Link
            href={`/${categorySlug}/${childCategorySlug}`}
            className="text-sky-600"
          >
            {childCategoryName}
          </Link>
        </>
      )}
      {isNotParentCategoryPage && <>　＞　 {pageTitle} </>}
    </div>
  );
};

export default Breadcrumbs;
