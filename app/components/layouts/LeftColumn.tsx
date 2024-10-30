type LeftColumnProps = {
  children: React.ReactNode;
};

const LeftColumn: React.FC<LeftColumnProps> = ({ children }) => {
  return (
    <div className="flex flex-col flex-wrap w-full md:max-w-[800px] md:min-w-[800px] md:mr-12 rounded bg-white">
      {children}
    </div>
  );
};

export default LeftColumn;
