import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
  isTopPage?: boolean;
};

const Header: React.FC<HeaderProps> = ({ isTopPage }) => {
  return (
    <header className="my-4">
      <div className="w-[350px] mx-auto ">
        <Link href="/">
          {isTopPage ? (
            <h1>
              <Image
                src="/image_webp/logo.webp"
                alt="サイトタイトル"
                width={350}
                height={90}
                priority
                className="mx-auto"
              />
            </h1>
          ) : (
            <Image
              src="/image_webp/logo.webp"
              alt="サイトタイトル"
              width={350}
              height={90}
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
