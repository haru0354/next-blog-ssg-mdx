import Footer from "@/app/component/Footer";
import Header from "@/app/component/Header";
import SideMenu from "@/app/component/SideMenu";
import GlobalMenu from "../component/GlobalMenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <GlobalMenu />
      <main className="flex justify-center mb-20">
        <div className="max-w-[1150px] flex flex-wrap justify-center">
          <div className="flex flex-col flex-wrap w-full md:w-[800px] md:mr-6">
            {children}
          </div>
          <SideMenu />
        </div>
      </main>
      <Footer />
    </>
  );
}
