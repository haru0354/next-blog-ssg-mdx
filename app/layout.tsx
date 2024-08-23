import type { Metadata } from "next";
import "./globals.css";
import { notoSansJp } from "./component/util/Font";

const websiteTitle = process.env.WEBSITE_TITLE || "サイトタイトル";
const websiteDescription = process.env.WEBSITE_DESCRIPTION || "サイト説明文";

export const metadata: Metadata = {
  title: {
    default: websiteTitle,
    template: `%s | ${websiteTitle}`,
  },
  description: `${websiteDescription}`,
  openGraph: {
    title: {
      default: websiteTitle,
      template: `%s | ${websiteTitle}`,
    },
    description: `${websiteDescription}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notoSansJp.className}>{children}</body>
    </html>
  );
}
