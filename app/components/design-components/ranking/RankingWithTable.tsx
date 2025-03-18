import Image from "next/image";
import Link from "next/link";
import Button from "../../ui/Button";
import NextLinkButton from "../../ui/NextLinkButton";

type RankingWithTableProps = {
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

const RankingWithTable: React.FC<RankingWithTableProps> = ({
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

export default RankingWithTable;
