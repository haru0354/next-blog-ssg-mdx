import Image from "next/image";
import Link from "next/link";

import { getSideImageBottom } from "@/app/lib/service/menuService";

type Image = {
  eyeCatchName: string;
  eyeCatchAlt: string;
  url: string;
};

const SideImageBottom = async () => {
  const sideImageBottom = await getSideImageBottom();

  if (!sideImageBottom) {
    return null;
  }

  return (
    <>
      {sideImageBottom.frontmatter.display && (
        <div>
          {sideImageBottom.frontmatter.images.map((image: Image) => (
            <Link href={`${image.url}`} key={image.url}>
              <Image
                src={`/thumbnail_webp/${image.eyeCatchName}.webp`}
                alt={`${image.eyeCatchAlt}`}
                width={298}
                height={196}
                className="mx-auto md:mt-0 my-8  transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default SideImageBottom;
