import type { MDXComponents } from "mdx/types";
import Button from "./app/component/Button";

export function useMDXComponents(): MDXComponents {
  return {
    p: ({ children }) => <p className="mb-4">{children}</p>,
    a: ({ children }) => <a className="text-sky-500">{children}</a>,
    h2: ({ children }) => <h2 className="text-xl font-semibold text-white my-6 p-4 bg-gray-800 rounded">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg font-semibold my-6 p-2 border-b-2 border-gray-700">{children}</h3>,
    Button,
  };
}
