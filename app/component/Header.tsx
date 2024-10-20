import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
  isTopPage?: boolean;
};

const Header: React.FC<HeaderProps> = ({ isTopPage }) => {
  return (
    <header className="w-full bg-white">
      <div className="w-[350px] mx-auto pb-2 md:py-4">
        <Link href="/">
          {isTopPage ? (
            <h1>
              <Image
                src="/image_webp/logo.webp"
                alt={process.env.WEBSITE_TITLE || "サイトタイトル"}
                width={260}
                height={80}
                priority
                className="mx-auto"
              />
            </h1>
          ) : (
            <Image
              src="/image_webp/logo.webp"
              alt={process.env.WEBSITE_TITLE || "サイトタイトル"}
              width={260}
              height={80}
              priority
              className="mx-auto"
            />
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
