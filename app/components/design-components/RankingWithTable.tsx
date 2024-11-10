import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";

type RankingLayoutBProps = {
  width: number;
  height: number;
  src: string;
  alt: string;
  imgPosition?: "left" | "right";
  contents: string[];
  tableData: TableData[];
  name?: string;
  detailUrl?: string;
  reviewUrl?: string;
};

type TableData = {
  title: string;
  item: string;
};

const RankingLayoutB: React.FC<RankingLayoutBProps> = ({
  width = 240,
  height = 240,
  src,
  alt,
  imgPosition = "left",
  contents,
  name,
  detailUrl,
  reviewUrl,
  tableData,
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
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <th>{data.title}</th>
              <td>{data.item}</td>
            </tr>
          ))}
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

export default RankingLayoutB;
