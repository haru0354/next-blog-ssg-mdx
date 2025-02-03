import Image from "next/image";
import Link from "next/link";

type BreadcrumbsProps = {
  addItem?: string;
  categoryName?: string;
  categorySlug?: string;
  childCategorySlug?: string;
  childCategoryName?: string;
  isFirstLevelPage: boolean;
  isSecondLevelPage: boolean;
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  addItem,
  categorySlug,
  categoryName,
  childCategorySlug,
  childCategoryName,
  isFirstLevelPage,
  isSecondLevelPage,
}) => {
  console.log(childCategoryName);

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
        {isFirstLevelPage ? (
          <span className="text-gray-900">{categoryName}</span>
        ) : (
          <Link href={`/${categorySlug}`}>{categoryName}</Link>
        )}
        {isSecondLevelPage ? (
          <>
            <span className="mx-2"> &gt; </span>
            <span className="text-gray-900">{childCategoryName}</span>
          </>
        ) : (
          <>
            {isFirstLevelPage || <span className="mx-2"> &gt; </span>}
            <Link href={`/${categorySlug}/${childCategorySlug}`}>
              {childCategoryName}
            </Link>
          </>
        )}
        {addItem && addItem}
      </nav>
    </div>
  );
};

export default Breadcrumbs;
