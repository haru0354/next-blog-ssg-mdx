import Image from "next/image";
import Link from "next/link";
import { getSideImageBottom } from "../lib/MenuService";

const SideImageBottom = async () => {
  const sideImageBottom = await getSideImageBottom();

  return (
    <>
      <div className="mb-8">
        <Link href={`${sideImageBottom.frontmatter.url}`}>
          <Image
            src={`/thumbnail_webp/${sideImageBottom.frontmatter.eyeCatchName}.webp`}
            alt={`${sideImageBottom.frontmatter.eyeCatchAlt}`}
            width={298}
            height={196}
            className="mx-auto md:mt-0 mt-8 hover:-translate-y-2 translate"
          />
        </Link>
      </div>
      {sideImageBottom.frontmatter.url2 &&
        sideImageBottom.frontmatter.eyeCatchName2 &&
        sideImageBottom.frontmatter.eyeCatchAlt2 && (
          <div className="mb-8">
            <Link href={`${sideImageBottom.frontmatter.url2}`}>
              <Image
                src={`/thumbnail_webp/${sideImageBottom.frontmatter.eyeCatchName2}.webp`}
                alt={`${sideImageBottom.frontmatter.eyeCatchAlt2}`}
                width={298}
                height={196}
                className="mx-auto md:mt-0 mt-8 hover:-translate-y-2 translate"
              />
            </Link>
          </div>
        )}
      {sideImageBottom.frontmatter.url3 &&
        sideImageBottom.frontmatter.eyeCatchName3 &&
        sideImageBottom.frontmatter.eyeCatchAlt3 && (
          <div className="mb-8">
            <Link href={`${sideImageBottom.frontmatter.url3}`}>
              <Image
                src={`/thumbnail_webp/${sideImageBottom.frontmatter.eyeCatchName3}.webp`}
                alt={`${sideImageBottom.frontmatter.eyeCatchAlt3}`}
                width={298}
                height={196}
                className="mx-auto md:mt-0 mt-8 hover:-translate-y-2 translate"
              />
            </Link>
          </div>
        )}
    </>
  );
};

export default SideImageBottom;
