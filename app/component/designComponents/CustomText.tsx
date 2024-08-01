type CustomTextProps = {
  font?: "semibold" | "bold";
  size?: "sm" | "lg" | "xl";
  color?: "red" | "green" | "orange" | "yellow";
  marker?: "red" | "green" | "orange" | "yellow";
  underMarker?: "red" | "green" | "orange" | "yellow";
  children: React.ReactNode;
};

const CustomText: React.FC<CustomTextProps> = ({
  font,
  size,
  color,
  marker,
  underMarker,
  children,
}) => {
  const fonts = {
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const sizes = {
    sm: "text-sm",
    lg: "text-lg",
    xl: "text-xl",
  };

  const colors = {
    red: "text-red-500",
    green: "text-green-500",
    orange: "text-orange-500",
    yellow: "text-yellow-500",
  };

  const markers = {
    red: "bg-red-200",
    green: "bg-green-200",
    orange: "bg-orange-200",
    yellow: "bg-yellow-200",
  };

  const underMarkers = {
    red: "bg-red-underMarker",
    green: "bg-green-underMarker",
    orange: "bg-orange-underMarker",
    yellow: "bg-yellow-underMarker",
  };

  const fontClass = font ? fonts[font] : "";
  const sizeClass = size ? sizes[size] : "";
  const colorClass = color ? colors[color] : "";
  const markerClass = marker ? markers[marker] : "";
  const underMarkerClass = underMarker ? underMarkers[underMarker] : "";

  return (
    <span
      className={`${fontClass} ${sizeClass} ${colorClass} ${markerClass} ${underMarkerClass}`}
    >
      {children}
    </span>
  );
};

export default CustomText;
