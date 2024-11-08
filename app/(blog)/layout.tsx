import Header from "@/app/components/Header";
import GlobalMenu from "../components/GlobalMenu";
import Footer from "@/app/components/Footer";
import MainLayout from "../components/layouts/MainLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <GlobalMenu />
      <MainLayout>{children}</MainLayout>
      <Footer />
    </>
  );
}
