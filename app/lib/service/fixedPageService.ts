import path from "path";

import { getMdxFileNamesInDirectory } from "../getMdxFileNamesInDirectory";
import { getFileContents } from "../getFileContents";

export async function getFixedPages() {
  const fixedPageDirectory = path.join(process.cwd(), "mdx-files", "article");

  const mdxFixedPageNames = getMdxFileNamesInDirectory(fixedPageDirectory);

  if (mdxFixedPageNames === null) {
    return null;
  }

  const fixedPages = await Promise.all(
    mdxFixedPageNames.map(async (mdxFixedPageName) => {
      const fixedPageName = mdxFixedPageName.replace(/\.mdx$/, "");

      const fixedContents = await getFileContents(
        fixedPageDirectory,
        fixedPageName
      );

      if (fixedContents === null) {
        return null;
      }

      return {
        slug: fixedPageName,
        frontmatter: fixedContents.frontmatter,
      };
    })
  );

  return fixedPages;
}
