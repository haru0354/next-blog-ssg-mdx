import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import nextMDX from "@next/mdx";

const withMDX = nextMDX({
  extensions: /\.mdx?$/,
  options: {
    rehypePlugins: [
      rehypeSlug
    ],
    remarkPlugins: [
      [remarkToc, { maxDepth: 3, heading: "目次" }],
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default withMDX(nextConfig);