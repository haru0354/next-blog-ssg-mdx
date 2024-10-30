import SplitAndNewLines from "../content-area/SplitAndNewLines";

type BlockquoteInBoxProps = {
  title?: string;
  contents: string;
  url: string;
  linkText: string;
};

const BlockquoteInBox: React.FC<BlockquoteInBoxProps> = ({
  title,
  contents,
  url,
  linkText,
}) => {
  return (
    <blockquote className="p-4 border border-gray-400 rounded shadow-md my-8">
      {title && <p className="text-center font-semibold mb-4">「{title}」</p>}
      <SplitAndNewLines text={contents} />
      <p className="mt-4 text-right">
        引用元：
        <a href={url} className="text-sky-600">
          {linkText}
        </a>
      </p>
    </blockquote>
  );
};

export default BlockquoteInBox;
