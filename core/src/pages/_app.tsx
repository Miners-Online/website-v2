import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ThemeProvider, BaseStyles, Box } from "@primer/react";
import { useTheme } from "@primer/react";
import "@/styles/reset.css";
import '@/styles/github-markdown.css'
import Layout from "@/components/Layout";
import { useEffect } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { setColorMode } = useTheme();

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDarkMode) {
      setColorMode("night");
      document.body.setAttribute("data-theme", "dark");
    } else {
      setColorMode("day");
      document.body.setAttribute("data-theme", "light");
    }
  });
  return (
    <ThemeProvider colorMode="auto" preventSSRMismatch>
      <BaseStyles>
        <SessionProvider session={session}>
          <Box
            backgroundColor={"canvas.default"}
            minHeight={"100vh"}
            width={"100vw"}
            position={"absolute"}
            top={0}
            left={0}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Box>
        </SessionProvider>
      </BaseStyles>
    </ThemeProvider>
  );
}
