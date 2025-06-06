import Image from "next/image";

type SpeechProps = {
  src: string;
  contents: string[];
  position?: "left" | "right";
};

const Speech: React.FC<SpeechProps> = ({
  src,
  contents,
  position = "left",
}) => {
  const divPosition = position === "right" ? "flex-row-reverse" : "flex-row";
  const imagePosition = position === "right" ? "ml-8" : "mr-8";

  return (
    <div
      className={`flex items-start justify-start w-full mb-8 ${divPosition}`}
    >
      <Image
        width={80}
        height={80}
        src={src}
        alt="character"
        className={`border-2 border-opacity-40 border-layout-mainColor rounded-full ${imagePosition}`}
      />
      <div className="relative max-w-full p-4  border rounded-lg border-opacity-40 border-layout-mainColor  shadow-lg bg-opacity-10 bg-layout-mainColor">
        {contents.map((content) => (
          <p key={content}>{content}</p>
        ))}
      </div>
    </div>
  );
};

export default Speech;
