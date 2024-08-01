type CustomTextProps = {
  font?: "semibold" | "bold";
  color?: "red" | "green" | "orange" | "yellow";
  marker?: "red" | "green" | "orange" | "yellow";
  underMarker?: "red" | "green" | "orange" | "yellow";
  children: React.ReactNode;
};

const CustomText: React.FC<CustomTextProps> = ({
  color,
  font,
  marker,
  underMarker,
  children,
}) => {
  const colors = {
    red: "text-red-500",
    green: "text-green-500",
    orange: "text-orange-500",
    yellow: "text-yellow-500",
  };

  const fonts = {
    semibold: "font-semibold",
    bold: "font-bold",
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

  const colorClass = color ? colors[color] : "";
  const fontClass = font ? fonts[font] : "";
  const markerClass = marker ? markers[marker] : "";
  const underMarkerClass = underMarker ? underMarkers[underMarker] : "";

  return (
    <span
      className={`${colorClass} ${fontClass} ${markerClass} ${underMarkerClass}`}
    >
      {children}
    </span>
  );
};

export default CustomText;
