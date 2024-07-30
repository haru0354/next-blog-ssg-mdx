import Image from "next/image";
import Link from "next/link";
import { getSideTopImage } from "../lib/MenuService";

const SideTopImage = async () => {
  const sideImage = await getSideTopImage();

  return (
    <div className="mb-8">
      <Link href={`${sideImage.frontmatter.url}`}>
        <Image
          src={`/thumbnail_webp/${sideImage.frontmatter.eyeCatchName}.webp`}
          alt={`${sideImage.frontmatter.eyeCatchAlt}`}
          width={298}
          height={196}
          className="mx-auto md:mt-0 mt-8 hover:-translate-y-2 translate"
        />
      </Link>
    </div>
  );
};

export default SideTopImage;
