import { MarkdownPreviewProps } from "@uiw/react-markdown-preview";
import dynamic from "next/dynamic";


export const MarkdownPreview = dynamic<MarkdownPreviewProps>(
  () => import("@uiw/react-markdown-preview"),
  {
    ssr: false,
  }
);
