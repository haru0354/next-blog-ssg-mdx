import Image from "next/image";

type SpeechProps = {
  position: "left" | "right";
};

const Speech: React.FC<SpeechProps> = ({ position = "left" }) => {
  return (
    <div className={`flex items-start justify-start w-full mb-8 ${position === "right" ? "flex-row-reverse" : "flex-row"}`}>
      <Image
        width={80}
        height={80}
        src="/image_webp/character.webp"
        alt="character"
        className={`border-2 border-gray-300 rounded-full ${position === "right" ? "ml-8" : "mr-8"}`}  />
      <div className="relative max-w-full p-4 bg-gray-50 border rounded-lg border-gray-300 shadow-lg">
        <p>
          テキストテキストテキストテキストテキストテキストテキストテキストテキスト
        </p>
      </div>
    </div>
  );
};

export default Speech;
