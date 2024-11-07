import Image from "next/image";
import Link from "next/link";

type BreadcrumbsProps = {
  pageTitle?: string;
  addItem?: string;
  categoryName?: string;
  categorySlug?: string;
  childCategorySlug?: string;
  childCategoryName?: string;
  isNotParentCategoryPage?: boolean;
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  pageTitle,
  addItem,
  categorySlug,
  categoryName,
  childCategorySlug,
  childCategoryName,
  isNotParentCategoryPage = true,
}) => {
  return (
    <div className="text-sm mx-2 text-gray-500">
      <nav>
        <Image
          src="/image_webp/home.webp"
          alt="home"
          width={20}
          height={20}
          className="inline mb-[2px] mr-2"
        />
        <Link href="/">ホーム</Link>
        <span className="mx-2"> &gt; </span>
        {categorySlug && categoryName ? (
          <Link href={`/${categorySlug}`}>{categoryName}</Link>
        ) : (
          categoryName
        )}
        {childCategorySlug && childCategoryName && (
          <>
            <span className="mx-2"> &gt; </span>
            <Link href={`/${categorySlug}/${childCategorySlug}`}>
              {childCategoryName}
            </Link>
          </>
        )}
        {isNotParentCategoryPage && (
          <>
            <span className="mx-2"> &gt; </span>
            {pageTitle}
          </>
        )}
        {addItem && addItem}
      </nav>
    </div>
  );
};

export default Breadcrumbs;
