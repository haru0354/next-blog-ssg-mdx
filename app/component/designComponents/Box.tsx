type BoxProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
};

const Box: React.FC<BoxProps> = ({ children, title, className }) => {
  return (
    <div className={`p-4 my-4 border border-gray-700 ${className}`}>
      {title && <p className="text-center font-semibold">「{title}」</p>}
      {children}
    </div>
  );
};

export default Box;
