import type { Metadata } from "next";
import "./globals.css";
import { notoSansJp } from "./component/util/Font";

export const metadata: Metadata = {
  title: {
    default: 'サイトタイトル',
    template: `%s | サイトタイトル`,
  },
  description: '',
  openGraph: {
    title: {
      default: 'サイトタイトル',
      template: `%s | サイトタイトル`,
    },
    description: '',
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
