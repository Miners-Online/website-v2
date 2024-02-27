import Head from "next/head";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { Post } from "@/interfaces/post";
import { MarkdownPreview } from "@/lib/markdown";
import { Box, PageLayout, UnderlineNav, Text, LabelGroup, Label, Link } from "@primer/react";
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
        <PageLayout>
          <PageLayout.Header>

          </PageLayout.Header>
          <PageLayout.Content>
            <Box sx={{
              // mr: 4,
              ml: 4,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'border.default',
              borderRadius: 2
            }}>
              <UnderlineNav aria-label="Article">
                <UnderlineNav.Item aria-current="page" icon={BookIcon}>
                  README
                </UnderlineNav.Item>
              </UnderlineNav>
              <Box sx={{
                p: 5,
              }}>
                <MarkdownPreview source={content}/>
              </Box>
            </Box>
          </PageLayout.Content>
          <PageLayout.Pane>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
              <Box>
                <Text sx={{fontSize: 0, display: 'block', color: 'fg.muted'}}>About</Text>
              </Box>
              <Box>
                <Text sx={{fontSize: 0, fontWeight: 'bold', display: 'block', color: 'fg.muted'}}>Title</Text>
                <Text sx={{fontSize: 0, color: 'fg.muted', lineHeight: 'condensed'}}>{post.title}</Text>
              </Box>
              <Box>
                <Text sx={{fontSize: 0, fontWeight: 'bold', display: 'block', color: 'fg.muted'}}>Date published</Text>
                <Text sx={{fontSize: 0, color: 'fg.muted', lineHeight: 'condensed'}}>{post.date}</Text>
              </Box>
              <Box role="separator" sx={{width: '100%', height: 1, backgroundColor: 'border.default'}}></Box>
              <Box>
                <Text sx={{fontSize: 0, fontWeight: 'bold', display: 'block', color: 'fg.muted'}}>Authors</Text>
                {/* <Text sx={{fontSize: 0, color: 'fg.muted', lineHeight: 'condensed'}}>{post.date}</Text> */}
                <LabelGroup sx={{mt: 3}}>
                  {post.authors.map((author) => (
                    <Label variant="accent" key={`la_${author}`}>
                      <Link href={`https://github.com/${author}`}>{author}</Link>
                    </Label>
                  ))}
                </LabelGroup>
              </Box>
            </Box>
          </PageLayout.Pane>
          <PageLayout.Footer>

          </PageLayout.Footer>
        </PageLayout>
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
        date: post.date.toISOString(),
        slug: post.slug,
        content: post.content,
        authors: post.authors
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
