import Head from "next/head";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { Post } from "@/interfaces/post";
import { MarkdownPreview } from "@/lib/markdown";
import { Box, UnderlineNav } from "@primer/react";
import { BookIcon } from "@primer/octicons-react";

type Props = {
  post: Post;
};

export default function Blog({ post }: Props) {
  if (!post?.slug) {
    return notFound();
  }
  const title = `${post.title} | Miners Online`;
  const content = `
  # ${post.title}
  ${post.content}
  `

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="The official homepage for Miners Online." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Box sx={{
          m: 7,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'border.default',
          borderRadius: 6
        }}>
          <UnderlineNav aria-label="Repository">
            <UnderlineNav.Item aria-current="page" icon={BookIcon}>
              README
            </UnderlineNav.Item>
          </UnderlineNav>
          <Box sx={{
            p: 5
          }}>
            <MarkdownPreview source={content}/>
          </Box>
        </Box>
      </main>
    </>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug);

  return {
    props: {
      post: {
        title: post.title,
        date: post.date.toString(),
        slug: post.slug,
        content: post.content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
