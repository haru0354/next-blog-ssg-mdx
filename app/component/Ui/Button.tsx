type ButtonProps = {
  children: React.ReactNode;
  color?: "blue" | "green" | "red" | "gray";
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  color = "blue",
  className,
}) => {
  const colors = {
    blue: "bg-sky-600 hover:bg-sky-200",
    green: "bg-green-600 hover:bg-green-200",
    red: "bg-red-600 hover:bg-red-200",
    gray: "bg-gray-600 hover:bg-gray-200",
  };

  return (
    <button
      className={`min-w-[180px]  my-6 px-6 py-1 text-white hover:text-gray-700 border border-gray-400 rounded 
        ${colors[color]} 
        ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
