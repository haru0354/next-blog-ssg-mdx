import type { MDXComponents } from "mdx/types";
import Button from "./app/components/ui/Button";
import CustomLink from "./app/components/design-components/nextjs-components/CustomLink";
import FlexBox from "./app/components/design-components/FlexBox";
import ThreeFlexBox from "./app/components/design-components/ThreeFlexBox";
import BlockquoteInBox from "./app/components/design-components/BlockquoteInBox";
import Box from "./app/components/design-components/Box";
import CustomText from "./app/components/design-components/CustomText";
import CustomImage from "./app/components/design-components/CustomImage";
import Speech from "./app/components/design-components/Speech";
import RankingWithList from "./app/components/design-components/ranking/RankingWithList";
import RankingWithTable from "./app/components/design-components/ranking/RankingWithTable";
import DualHeaderTable from "./app/components/design-components/table/DualHeaderTable";
import BesideHeaderTable from "./app/components/design-components/table/BesideHeaderTable";
import VerticalHeaderTable from "./app/components/design-components/table/VerticalHeaderTable copy";

export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    p: ({ children }) => <p className="leading-loose mb-8">{children}</p>,
    a: ({ children, ...props }) => (
      <a className="text-sky-500 no-underline" {...props}>
        {children}
      </a>
    ),
    h2: ({ children }) => (
      <h2 className="my-6 p-5 text-xl font-bold rounded text-white bg-layout-mainColor">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="my-6 p-3 text-lg font-semibold border-b-2 border-layout-mainColor">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="my-6 p-2 text-center text-lg font-semibold border-b-2 border-dashed border-layout-mainColor">
        {children}
      </h4>
    ),
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
    CustomImage: CustomImage,
    CustomLink: CustomLink,
    CustomText: CustomText,
    Button: Button,
    Box: Box,
    FlexBox: FlexBox,
    ThreeFlexBox: ThreeFlexBox,
    BlockquoteInBox: BlockquoteInBox,
    Speech: Speech,
    RankingWithList: RankingWithList,
    RankingWithTable: RankingWithTable,
    DualHeaderTable: DualHeaderTable,
    BesideHeaderTable: BesideHeaderTable,
    VerticalHeaderTable: VerticalHeaderTable,
    ...components,
  };
}
