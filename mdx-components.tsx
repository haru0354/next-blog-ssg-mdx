import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    p: ({ children }) => <p className="mb-4">{children}</p>,
    a: ({ children }) => <a className="text-sky-500">{children}</a>,
    h2: ({ children }) => <h2 className="text-xl font-semibold text-white my-6 p-4 bg-main-gray rounded">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg font-semibold my-6 p-2 border-b-2 border-main-gray">{children}</h3>,
    li: ({ children }) => <li className=" my-4">{children}</li>,
    ...components,
  };
}
