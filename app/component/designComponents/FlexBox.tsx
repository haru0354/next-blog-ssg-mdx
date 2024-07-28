import Image from "next/image";
import React from "react";

type FlexBoxProps = {
  contents: Contents[];
};

type Contents = {
  topText: string;
  content: string;
  width: number;
  height: number;
  src: string;
  alt: string;
};

const FlexBox: React.FC<FlexBoxProps> = ({ contents }) => {
  return (
    <div className="flex flex-wrap">
      {contents.map((content, index) => {
        const borderClass =
          index % 2 === 0 ? "border" : "border-t border-b border-r";
        return (
          <div
            key={index}
            className={`w-[50%] p-2 ${borderClass} border-gray-700 border-dashed`}
          >
            <p className="text-center font-semibold">{content.topText}</p>
            <Image
              width={content.width}
              height={content.height}
              src={content.src}
              alt={content.alt}
            />
            {content.content}
          </div>
        );
      })}
    </div>
  );
};

export default FlexBox;
