import type { Metadata } from "next";
import { notoSansJp } from "./util/font";
import "./globals.css";

import HeaderWrapper from "./components/layouts/HeaderWrapper ";
import GlobalMenu from "./components/GlobalMenu";
import Footer from "./components/Footer";

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
      <body className={notoSansJp.className}>
        <HeaderWrapper />
        <GlobalMenu />
        {children}
        <Footer />
      </body>
    </html>
  );
}
