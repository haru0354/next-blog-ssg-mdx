import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-center text-xs py-2 bg-layout-mainColor text-white">
      <ul className="flex flex-column items-center justify-center my-1">
        <li className="mb-2 mx-4 text-white">
          <Link href="/privacypolicy">プライバシーポリシー・免責事項</Link>
        </li>
        <li className="mb-2 mx-4 text-white">
          <Link href="/sitemaps">サイトマップ</Link>
        </li>
      </ul>
      &copy; {process.env.WEBSITE_TITLE}
    </footer>
  );
};

export default Footer;
