import LeftColumn from "@/app/components/layouts/LeftColumn";
import SideMenu from "@/app/components/side-menu/SideMenu";

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { firstLevelArticle_slug: string };
}>) {
  return (
    <>
      <LeftColumn>{children}</LeftColumn>
      <SideMenu firstLevelArticle_slug={params.firstLevelArticle_slug} />
    </>
  );
}
