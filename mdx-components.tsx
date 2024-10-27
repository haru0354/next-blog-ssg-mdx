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
    h2: ({ children }) => <h2 className="my-6 p-5 text-xl font-bold rounded text-white bg-main-gray">{children}</h2>,
    h3: ({ children }) => <h3 className="my-6 p-3 text-lg font-semibold border-b-2 border-main-gray">{children}</h3>,
    h4: ({ children }) => <h4 className="my-6 p-2 text-center text-lg font-semibold border-b-2 border-dashed border-main-gray">{children}</h4>,
    pre: ({ children }) => (
      <pre className="max-w-[700px] w-full md:mx-auto my-4 py-2 md:p-4 text-sm text-white bg-gray-800 rounded break-words whitespace-pre-wrap">
        {children}
      </pre>
    ),
    code: ({ children }) => <code className=" break-words">{children}</code>,
    ol: ({ children }) => (
      <ol className="list-decimal list-inside py-2 px-2 md:px-8 mx-auto border-main-gray">
        {children}
      </ol>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside py-2 px-2 md:px-8 mx-auto border-main-gray">
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
