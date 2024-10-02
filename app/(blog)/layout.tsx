import Header from "@/app/component/Header";
import GlobalMenu from "../component/GlobalMenu";
import Footer from "@/app/component/Footer";
import BackToTopButton from "../component/ui/BackToTopButton ";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <GlobalMenu />
      <main className="flex justify-center my-16">
        <div className="max-w-[1150px] flex flex-wrap justify-center">
          {children}
        </div>
        <BackToTopButton />
      </main>
      <Footer />
    </>
  );
}
