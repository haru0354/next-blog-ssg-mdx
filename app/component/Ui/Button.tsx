type ButtonProps = {
  color?: 'blue'; 
};

const Button: React.FC<ButtonProps> = ({ color = 'blue' }) => {
  const colors = {
    blue: "min-w-[180px] my-6 bg-sky-400 text-white border rounded hover:border-sky-200 hover:text-gray-700 hover:bg-sky-200",
    green: "min-w-[180px] my-6 bg-green-400 text-white border rounded hover:border-green-200 hover:text-gray-700 hover:bg-green-200",
    red: "min-w-[180px] my-6 bg-red-400 text-white border rounded hover:border-red-200 hover:text-gray-700 hover:bg-red-200",

  
  };

  return <button className={`px-6 py-1  ${colors[color]}`}>詳細はこちら</button>;
};

export default Button;
