type ButtonProps = {
  children: React.ReactNode;
  color?: "blue" | "green" | "red" | "gray";
  size?: "search" | "small" | "normal" | "big";
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  color = "blue",
  size = "normal",
  className,
}) => {
  const colors = {
    blue: "bg-sky-600 hover:bg-sky-200",
    green: "bg-green-600 hover:bg-green-200",
    red: "bg-red-600 hover:bg-red-200",
    gray: "bg-gray-600 hover:bg-gray-200",
  };

  const sizes = {
    search: "min-w-[60px]",
    small: "min-w-[120px] px-2",
    normal: "min-w-[180px] px-4",
    big: "min-w-[240px] px-6",
  };

  return (
    <button
      className={`my-6 py-2 text-white hover:text-gray-700 border border-gray-400 rounded 
        ${colors[color]} 
        ${sizes[size]} 
        ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
