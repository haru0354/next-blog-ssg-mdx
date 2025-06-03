import Image from "next/image";

import SplitAndNewLines from "../../content-area/SplitAndNewLines";
import NextLinkButton from "../../ui/NextLinkButton";

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
          itemClass =
            "min-w-[300px] w-[100%] md:w-[50%] border-b border-l border-r";
        } else {
          itemClass =
            "min-w-[300px] w-[100%] md:w-[50%] border-b border-r border-l md:border-l-0";
        }
        return (
          <div key={index} className={`p-2 border-gray-400  ${itemClass}`}>
            <p className="text-center my-2 font-semibold">{content.topText}</p>
            <Image
              width={content.width}
              height={content.height}
              src={content.src}
              alt={content.alt}
              className={index === 0 ? "mr-4 md:float-left" : "mx-auto"}
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

export default ThreeFlexBox;
