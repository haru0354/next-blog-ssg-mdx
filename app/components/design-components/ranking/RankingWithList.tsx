import Image from "next/image";
import Button from "../../ui/Button";
import Link from "next/link";
import NextLinkButton from "../../ui/NextLinkButton";

type RankingWithListProps = {
  width?: number;
  height?: number;
  src: string;
  alt: string;
  imgPosition: "left" | "right";
  className?: string;
  contents: string[];
  titles: string[];
  lists: string[][];
  name?: string;
  detailUrl?: string;
  reviewUrl?: string;
};

const RankingWithList: React.FC<RankingWithListProps> = ({
  width = 240,
  height = 240,
  src,
  alt,
  imgPosition = "left",
  contents,
  titles,
  lists,
  name,
  detailUrl,
  reviewUrl,
}) => {
  const imageClass =
    imgPosition === "right" ? "float-right ml-8" : "float-left mr-8";

  return (
    <div>
      <Image
        width={width}
        height={height}
        src={src}
        alt={alt}
        className={imageClass}
      />
      {contents.map((content, index) => (
        <p key={index} className="leading-loose mb-8">
          {content}
        </p>
      ))}
      <table className="text-center">
        <thead>
          <tr>
            {titles.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {lists.map((list, index) => (
              <td key={index}>
                {list.map((item, index) => (
                  <li key={index}> {item}</li>
                ))}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      {detailUrl && (
        <NextLinkButton
          href={detailUrl}
          color="red"
          size="normal"
          className="block mx-auto"
        >
          {name}の詳細
        </NextLinkButton>
      )}
      {reviewUrl && (
        <NextLinkButton
          href={reviewUrl}
          color="blue"
          size="normal"
          className="block mx-auto"
        >
          {name}の口コミ
        </NextLinkButton>
      )}
    </div>
  );
};

export default RankingWithList;
