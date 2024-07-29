import Image from "next/image";
import React from "react";
import Button from "../ui/Button";
import Link from "next/link";

type ThreeFlexBoxProps = {
  contents: Contents[];
};

type Contents = {
  topText: string;
  content: string;
  width: number;
  height: number;
  src: string;
  alt: string;
  buttonText?: string;
  link?: string;
};

const ThreeFlexBox: React.FC<ThreeFlexBoxProps> = ({ contents }) => {
  return (
    <div className="flex flex-wrap my-6">
      {contents.map((content, index) => {
        let itemClass;
        if (index === 0) {
          itemClass = "w-[100%] border";
        } else if (index % 2 === 1) {
          itemClass = "w-[50%] border-b border-l border-r";
        } else {
          itemClass = "w-[50%] border-b border-r";
        }
        return (
          <div
            key={index}
            className={`p-2 border-gray-700 border-dashed ${itemClass}`}
          >
            <p className="text-center font-semibold">{content.topText}</p>
            <Image
              width={content.width}
              height={content.height}
              src={content.src}
              alt={content.alt}
              className={`${index === 0 ? "float-left" : ""}`}
            />
            {content.content}
            {content.buttonText && content.link && (
              <Link href={content.link}>
                <Button color="gray" className="block mx-auto">
                  {content.buttonText}
                </Button>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ThreeFlexBox;
