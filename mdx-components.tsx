import type { MDXComponents } from "mdx/types";
import Button from "./app/component/ui/Button";
import CustomLink from "./app/component/designComponents/CustomLink";
import FlexBox from "./app/component/designComponents/FlexBox";
import ThreeFlexBox from "./app/component/designComponents/ThreeFlexBox";
import BlockquoteInBox from "./app/component/designComponents/BlockquoteInBox";
import Box from "./app/component/designComponents/Box";
import CustomText from "./app/component/designComponents/CustomText";


export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    p: ({ children }) => <p className="leading-loose mb-8">{children}</p>,
    pre: ({ children }) => <pre className="max-w-[700px] w-full md:mx-auto my-4 py-2 md:p-4 text-sm text-white bg-gray-800 rounded break-words whitespace-pre-wrap">{children}</pre>,
    code: ({ children }) => <code className=" break-words">{children}</code>,
    ol: ({ children }) => (
      <ol className="list-decimal list-inside max-w-[600px] py-4 px-2 md:px-8 mx-6 my-8 border border-dashed rounded border-gray-400">
        {children}
      </ol>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside max-w-[600px] py-4 px-2 md:px-8 mx-auto my-8 border border-dashed rounded border-gray-400 marker:text-gray-600">
        {children}
      </ul>
    ),
    li: ({ children }) => <li className="my-4">{children}</li>,
    CustomText: CustomText,
    Button: Button,
    CustomLink: CustomLink,
    Box: Box,
    FlexBox: FlexBox,
    ThreeFlexBox: ThreeFlexBox,
    BlockquoteInBox: BlockquoteInBox,
    ...components,
  };
}
