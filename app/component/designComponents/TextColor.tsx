type TextColorProps = {
  color: "red" | "green";
  children: React.ReactNode;
};

const TextColor: React.FC<TextColorProps> = ({ color , children }) => {
  const colors = {
    red: "text-red-500",
    green: "text-green-500"
  }

  return <p className={`${colors[color]}`}>{children}</p>;
};

export default TextColor;
