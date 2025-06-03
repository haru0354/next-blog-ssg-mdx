type ExternalLinkButtonProps = {
  children: React.ReactNode;
  href: string;
  color?: "blue" | "green" | "red" | "gray";
  size?: "search" | "small" | "normal" | "big";
  className?: string;
};

const ExternalLinkButton: React.FC<ExternalLinkButtonProps> = ({
  children,
  href,
  color = "blue",
  size = "normal",
  className = "",
}) => {
  const colors = {
    blue: "bg-sky-600 hover:bg-sky-200",
    green: "bg-green-600 hover:bg-green-200",
    red: "bg-red-600 hover:bg-red-200",
    gray: "bg-gray-600 hover:bg-gray-200",
  };

  const sizes = {
    search: "min-w-[60px] my-0 border-l-0",
    small: "w-[120px] my-6 px-2 rounded",
    normal: "w-[180px] my-6 px-4 rounded",
    big: "w-[240px] my-6 px-6 rounded",
  };

  return (
    <a
      className={`py-2 text-center transition-colors duration-300 text-white hover:text-gray-700 border border-gray-400  
          ${colors[color]} 
          ${sizes[size]} 
          ${className}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default ExternalLinkButton;
