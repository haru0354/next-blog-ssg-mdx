import Footer from "@/app/component/Footer";
import Header from "@/app/component/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
  return (
    <>
      <Header />
      <main className="flex justify-center mb-20">
        <div className="max-w-[1150px] flex flex-wrap justify-center">
            {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
