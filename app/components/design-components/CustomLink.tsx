import Link from "next/link";

type CustomLinkProps = {
  href: string;
  children: React.ReactNode;
};

const CustomLink: React.FC<CustomLinkProps> = ({ href, children }) => {
  return (
    <Link href={href} className="text-sky-600 mb-16">
      {children}
    </Link>
  );
};

export default CustomLink;
