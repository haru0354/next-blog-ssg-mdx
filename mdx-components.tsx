import type { MDXComponents } from "mdx/types";
import Button from "./app/component/Button";

export function useMDXComponents(): MDXComponents {
  return {
    h2: ({ children }) => <h2 style={{ fontSize: "50px" }}>{children}</h2>,
    Button,
  };
}
