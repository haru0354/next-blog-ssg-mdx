import Image from "next/image";

type CustomImageProps = {
  width: number;
  height: number;
  src: string;
  alt: string;
  className?: string;
};

const CustomImage: React.FC<CustomImageProps> = ({
  width,
  height,
  src,
  alt,
  className,
}) => {
  return <Image width={width} height={height} src={src} alt={alt} className={className}/>;
};

export default CustomImage;
