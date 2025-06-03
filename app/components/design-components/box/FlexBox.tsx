import Image from "next/image";

import SplitAndNewLines from "../../content-area/SplitAndNewLines";
import NextLinkButton from "../../ui/NextLinkButton";

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
              <NextLinkButton
                href={content.link}
                color="gray"
                size="small"
                className="block mx-auto"
              >
                {content.buttonText}
              </NextLinkButton>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FlexBox;
