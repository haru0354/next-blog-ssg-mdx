import Image from "next/image";
import Link from "next/link";

type BreadcrumbsProps = {
  categorySlug: string;
  categoryName: string;
  isCategory?: boolean;
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  categorySlug,
  categoryName,
  isCategory,
}) => {
  return (
    <span className="text-sm">
      <Image
        src="/image_webp/home.webp"
        alt="a"
        width={25}
        height={25}
        className="inline mb-[2px] mr-2"
      />
      <Link href="/">ホーム</Link>
      　＞　
      {isCategory ? (
        categoryName
      ) : (
        <Link href={`/${categorySlug}`}>{categoryName}</Link>
      )}
    </span>
  );
};

export default Breadcrumbs;
