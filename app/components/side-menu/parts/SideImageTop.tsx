import Image from "next/image";
import Link from "next/link";
import { getSideImageTop } from "@/app/lib/service/menuService";

type Image = {
  eyeCatchName: string;
  eyeCatchAlt: string;
  url: string;
};

const SideImageTop = async () => {
  const sideImages = await getSideImageTop();

  if (!sideImages) {
    return null;
  }

  return (
    <>
      {sideImages.frontmatter.display && (
        <div>
          {sideImages.frontmatter.internalLink ? (
            <>
              {sideImages.frontmatter.images.map((image: Image) => (
                <Link href={`${image.url}`} key={image.url}>
                  <Image
                    src={`/thumbnail_webp/${image.eyeCatchName}.webp`}
                    alt={`${image.eyeCatchAlt}`}
                    width={298}
                    height={196}
                    className="mx-auto md:mt-0 mt-8 mb-8 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                  />
                </Link>
              ))}
            </>
          ) : (
            <>
              {sideImages.frontmatter.images.map((image: Image) => (
                <a href={`${image.url}`} key={image.url} target="blank">
                  <Image
                    src={`/thumbnail_webp/${image.eyeCatchName}.webp`}
                    alt={`${image.eyeCatchAlt}`}
                    width={298}
                    height={196}
                    className="mx-auto md:mt-0 mt-8 mb-8 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                  />
                </a>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SideImageTop;
