import BackToTopButton from "../ui/BackToTopButton ";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <main className="flex justify-center py-4 md:py-10 bg-layout-bgColor">
      <div className="max-w-[1150px] flex flex-wrap justify-center">
        {children}
      </div>
      <BackToTopButton />
    </main>
  );
};

export default MainLayout;
