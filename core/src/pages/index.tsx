import Head from "next/head";
import { useSession } from "next-auth/react";
import { Box } from "@primer/react";
import { MarkdownPreview } from "@/lib/markdown";

export default function Home() {
  const { data } = useSession();
  const markdown = `# AAAAAAAAAAA Just a link: www.example.com.`

  return (
    <>
      <Head>
        <title>Home | Miners Online</title>
        <meta name="description" content="The official homepage for Miners Online." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box
          sx={{
            margin: "0 auto",
            width: "800px",
            p: 4,
            backgroundColor: "canvas.inset",
            borderRadius: 6,
            color: "fg.default",
          }}
          as="pre"
        >
          {data ? JSON.stringify(data, null, 2) : "Sign in to get started!"}
        </Box>
      </main>

      <div className='markdown-body'>
        <MarkdownPreview source={markdown}/>
      </div>
    </>
  );
}
