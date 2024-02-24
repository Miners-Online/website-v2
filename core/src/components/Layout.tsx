import { ReactNode } from "react";
import NextLink from "next/link";
import { Box, Button, Text } from "@primer/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

interface Page {
  name: string;
  path: string;
}

// add your navigation items here
const pages: Page[] = [
  { name: "Home", path: "/" },
];

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navigation />
      <Box p={3}>{children}</Box>
    </>
  );
}

function Navigation() {
  const router = useRouter();
  const activePath = router.pathname;
  return (
    <Box
      as="nav"
      display="flex"
      p={3}
      height={56}
      alignItems="center"
      justifyContent={"space-between"}
      width="100%"
      position="sticky"
      top="0"
      sx={{
        borderBottom: "1px solid",
        borderColor: "border.muted",
        bg: "canvas.default",
      }}
    >
      <Box as="ul" display="flex" sx={{ alignItems: "center" }}>
        <Box as="li" sx={{ listStyle: "none" }}>
          <Text
            fontSize={2}
            fontWeight="bold"
            color="fg.default"
            pr={3}
            mr={1}
            sx={{ borderRight: "1px solid", borderColor: "border.muted" }}
          >
            Miners Online
          </Text>
        </Box>
        {pages.map((page) => (
          <Box as="li" sx={{ listStyle: "none" }} key={page.path}>
            <NextLink href={page.path} passHref legacyBehavior>
              <Button
                variant="invisible"
                as="a"
                sx={{
                  color: activePath === page.path ? "fg.accent" : "fg.default",
                }}
              >
                {page.name}
              </Button>
            </NextLink>
          </Box>
        ))}
      </Box>
      <Authentication />
    </Box>
  );
}

function Authentication() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <Button variant="invisible" onClick={() => signOut()}>
        Sign out
      </Button>
    );
  }

  return (
    <Button variant="invisible" onClick={() => signIn("github")}>
      Sign in
    </Button>
  );
}
