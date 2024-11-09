import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";

type RankingProps = {
  width: number;
  height: number;
  src: string;
  alt: string;
  imgPosition: "left" | "right";
  className?: string;
  contents: string[];
  titles: string[];
  firstList: string[];
  secondList: string[];
  thirdList?: string[];
  name?: string;
  detailUrl?: string;
  reviewUrl?: string;
};

const Ranking: React.FC<RankingProps> = ({
  width = 240,
  height = 240,
  src,
  alt,
  imgPosition = "left",
  contents,
  titles,
  firstList,
  secondList,
  thirdList,
  name,
  detailUrl,
  reviewUrl,
}) => {
  const imageClass =
    imgPosition === "right" ? "float-right ml-8" : "float-left mr-8";

  const lists = [firstList, secondList, thirdList].filter(Boolean);

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
                <ul>
                  {list?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      {detailUrl && (
        <a href={detailUrl} target="blank">
          <Button color="red" className="block mx-auto">
            {name}の詳細
          </Button>
        </a>
      )}
      {reviewUrl && (
        <Link href={reviewUrl}>
          <Button color="blue" className="block mx-auto">
            {name}の口コミ
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Ranking;
