import Header from "@/app/components/Header";
import GlobalMenu from "../components/GlobalMenu";
import Footer from "@/app/components/Footer";
import BackToTopButton from "../components/ui/BackToTopButton ";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <GlobalMenu />
      <main className="flex justify-center py-4 md:py-10 bg-layout-bgColor">
        <div className="max-w-[1150px] flex flex-wrap justify-center">
          {children}
        </div>
        <BackToTopButton />
      </main>
      <Footer />
    </>
  );
}
