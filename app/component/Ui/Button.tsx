type ButtonProps = {
  children: React.ReactNode;
  color?: "blue" | "green" | "red" | "gray";
  size?: "search" | "small" | "normal" | "big";
  className?: string;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({
  children,
  color = "blue",
  size = "normal",
  className,
  onClick,
}) => {
  const colors = {
    blue: "bg-sky-600 hover:bg-sky-200",
    green: "bg-green-600 hover:bg-green-200",
    red: "bg-red-600 hover:bg-red-200",
    gray: "bg-gray-600 hover:bg-gray-200",
  };

  const sizes = {
    search: "min-w-[60px] my-0",
    small: "min-w-[120px] my-6 px-2",
    normal: "min-w-[180px] my-6 px-4",
    big: "min-w-[240px] my-6 px-6",
  };

  return (
    <button
      className={`py-2 text-white hover:text-gray-700 border border-gray-400 rounded 
        ${colors[color]} 
        ${sizes[size]} 
        ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
