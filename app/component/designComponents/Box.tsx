type BoxProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
};

const Box: React.FC<BoxProps> = ({ children, title, className }) => {
  return (
    <div className={`p-4 my-4 border border-gray-400 shadow-md bg-gray-50 ${className}`}>
      {title && <p className="text-center font-semibold border-b border-dashed pb-2 mb-2 border-gray-400">「{title}」</p>}
      {children}
    </div>
  );
};

export default Box;
