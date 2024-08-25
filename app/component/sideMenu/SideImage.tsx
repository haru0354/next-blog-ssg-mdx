import Image from "next/image";
import Link from "next/link";
import { getSideImage } from "../lib/MenuService";

const SideImage = async () => {
  const sideImage = await getSideImage();

  if (!sideImage) {
    return null;
  }

  return (
    <>
      {sideImage &&
        sideImage.frontmatter.url &&
        sideImage.frontmatter.eyeCatchName &&
        sideImage.frontmatter.eyeCatchAlt && (
          <div className="mb-8">
            <Link href={`${sideImage.frontmatter.url}`}>
              <Image
                src={`/thumbnail_webp/${sideImage.frontmatter.eyeCatchName}.webp`}
                alt={`${sideImage.frontmatter.eyeCatchAlt}`}
                width={298}
                height={196}
                className="mx-auto md:mt-0 mt-8 hover:-translate-y-2 translate transition duration-300"
              />
            </Link>
          </div>
        )}
    </>
  );
};

export default SideImage;
