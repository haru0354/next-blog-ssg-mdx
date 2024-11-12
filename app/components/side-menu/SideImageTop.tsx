import Image from "next/image";
import Link from "next/link";
import { getSideImage } from "@/app/lib/menuService";

type Image = {
  eyeCatchName: string;
  eyeCatchAlt: string;
  url: string;
};

const SideImageTop = async () => {
  const sideImages = await getSideImage();

  if (!sideImages) {
    return null;
  }

  return (
    <>
      {sideImages && sideImages.frontmatter.display && (
        <div>
          {sideImages.frontmatter.images.map((image: Image) => (
            <Link href={`${image.url}`}>
              <Image
                src={`/thumbnail_webp/${image.eyeCatchName}.webp`}
                alt={`${image.eyeCatchAlt}`}
                width={298}
                height={196}
                className="mx-auto md:mt-0 mt-8 mb-8 hover:-translate-y-2 translate transition duration-300"
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default SideImageTop;
