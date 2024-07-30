type BoxProps = {
    children: React.ReactNode;
    className: string;
}

const Box:React.FC<BoxProps> = ({ children, className }) => {
  return (
    <div className={`p-4 border border-gray-700 ${className}`}>
        {children}
    </div>
  )
}

export default Box