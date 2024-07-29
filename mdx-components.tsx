import type { MDXComponents } from "mdx/types";
import Button from "./app/component/ui/Button";
import CustomLink from "./app/component/designComponents/CustomLink";
import FlexBox from "./app/component/designComponents/FlexBox";
import ThreeFlexBox from "./app/component/designComponents/ThreeFlexBox";

export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    p: ({ children }) => <p className="leading-loose mb-8">{children}</p>,
    a: ({ children }) => <a className="text-sky-700">{children}</a>,
    h2: ({ children }) => (
      <h2 className="text-xl font-semibold text-white my-6 p-5 bg-main-gray rounded">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-semibold my-6 p-2 border-b-2 border-main-gray">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h3 className="text-center font-semibold my-6 p-2 border-b-2 border-dashed border-main-gray">
        {children}
      </h3>
    ),
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
    FlexBox: FlexBox,
    ThreeFlexBox: ThreeFlexBox,
    ...components,
  };
}
