import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-center text-xs py-2 bg-main-gray text-white">
      <ul className="flex flex-column items-center justify-center my-1">
        <li className="mb-2 mx-4 text-sky-500">
          <Link href="/privacypolicy">プライバシーポリシー・免責事項</Link>
        </li>
        <li className="mb-2 mx-4 text-sky-500">
          <Link href="/sitemaps">サイトマップ</Link>
        </li>
      </ul>
      &copy; {process.env.WEBSITE_TITLE}
    </footer>
  );
};

export default Footer;
