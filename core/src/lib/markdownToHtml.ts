import remarkParse from 'remark-parse';
import {unified} from 'unified';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import { VFile } from 'remark-rehype/lib';

export default async function markdownToHtml(markdown: string): Promise<VFile> {
  const content = unified()
  .use(remarkGfm)
  .use(remarkParse, {fragment: true})
  .use(remarkHtml)
  .process(markdown)
  return content;
}

