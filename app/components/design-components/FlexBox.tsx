import Image from "next/image";
import React from "react";
import Button from "../ui/Button";
import Link from "next/link";
import SplitAndNewLines from "../content-area/SplitAndNewLines";

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
  buttonText?: string;
  link?: string;
};

const FlexBox: React.FC<FlexBoxProps> = ({ contents }) => {
  return (
    <div className="flex flex-wrap items-center justify-center my-6">
      {contents.map((content, index) => {
        const borderClass =
          index % 2 === 0
            ? "border"
            : " border-b border-r border-l md:border-t md:border-l-0";
        return (
          <div
            key={index}
            className={`min-w-[300px] w-[100%] md:w-[50%] p-2 ${borderClass} border-gray-400`}
          >
            <p className="text-center font-semibold my-2">{content.topText}</p>
            <Image
              width={content.width}
              height={content.height}
              src={content.src}
              alt={content.alt}
              className="mx-auto"
            />
            {content.content && <SplitAndNewLines text={content.content} />}
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

export default FlexBox;
