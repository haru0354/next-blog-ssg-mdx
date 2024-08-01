type CustomTextProps = {
  color?: "red" | "green";
  font?: "semibold" | "bold";
  children: React.ReactNode;
};

const CustomText: React.FC<CustomTextProps> = ({ color, font, children }) => {
  const colors = {
    red: "text-red-500",
    green: "text-green-500",
  };

  const fonts = {
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const colorClass = color ? colors[color] : "";
  const fontClass = font ? fonts[font] : "";

  return <p className={`${colorClass} ${fontClass}`}>{children}</p>;
};

export default CustomText;
