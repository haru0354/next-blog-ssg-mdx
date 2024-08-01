type CustomTextProps = {
  color?: "red" | "green";
  font?: "semibold" | "bold";
  marker?: "red" | "green";
  underMarker?: "red" | "green";
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
  };

  const fonts = {
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const markers = {
    red: "bg-red-200",
    green: "bg-green-200",
  };

  const underMarkers = {
    red: "bg-red-underMarker",
    green: "bg-green-underMarker",
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
