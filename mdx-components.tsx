import type { MDXComponents } from "mdx/types";
import Button from "./app/component/ui/Button";
import CustomLink from "./app/component/designComponents/CustomLink";
import FlexBox from "./app/component/designComponents/FlexBox";
import ThreeFlexBox from "./app/component/designComponents/ThreeFlexBox";
import BlockquoteInBox from "./app/component/designComponents/BlockquoteInBox";
import Box from "./app/component/designComponents/Box";

export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    p: ({ children }) => <p className="leading-loose mb-8">{children}</p>,
    ol: ({ children }) => (
      <ol className="list-decimal list-inside py-4 px-8 mx-6 my-8 border border-dashed rounded border-gray-400">
        {children}
      </ol>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside py-4 px-8 mx-6 my-8 border border-dashed rounded border-gray-400 marker:text-gray-600">
        {children}
      </ul>
    ),
    li: ({ children }) => <li className="my-4">{children}</li>,
    Button: Button,
    CustomLink: CustomLink,
    Box: Box,
    FlexBox: FlexBox,
    ThreeFlexBox: ThreeFlexBox,
    BlockquoteInBox: BlockquoteInBox,
    ...components,
  };
}
