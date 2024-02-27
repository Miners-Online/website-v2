import Head from "next/head";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import { Post } from "@/interfaces/post";
import { ReactNode, useEffect, useState } from "react";

type Props = {
  post: Post;
};

export default function Blog({ post }: Props) {
  const [content, setContent] = useState<ReactNode | undefined>(undefined);

  if (!post?.slug) {
    return notFound();
  }
  const title = `${post.title} | Miners Online`;

  useEffect(() => {
    async function getContent() {
      const val = (await markdownToHtml(post.content)).value as string;
      setContent(<div className='markdown-body' dangerouslySetInnerHTML={{__html: val}}></div>);
    };

    if (!content) {
      getContent();
    }
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="The official homepage for Miners Online." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {content}
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
