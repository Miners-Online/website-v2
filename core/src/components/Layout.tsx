import { ReactNode } from "react";
import { Box, Button, Text, ActionMenu, ActionList, Avatar, Header, Spinner, useTheme } from "@primer/react";
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
      {children}
    </>
  );
}

function Navigation() {
  const router = useRouter();
  const activePath = router.pathname;
  return (
    <Header>
      <Header.Item>
        <Header.Link
          href={activePath}
          sx={{
            fontSize: 2,
          }}
        >
          <span>Miners Online</span>
        </Header.Link>
      </Header.Item>
        {pages.map((page) => (
          <Header.Item>
            <Header.Link
              href={page.path}
            >
              {page.name}
            </Header.Link>
          </Header.Item>
        ))}
      <Header.Item full></Header.Item>
      <Authentication/>
    </Header>
  );
}

function Authentication() {
  const { data: session, status } = useSession();
  const { setColorMode } = useTheme();

  if (status === "loading") {
    return <Spinner/>;
  }

  if (session) {
    return (
      <>
        <Header.Item
          sx={{
            mr: 0,
          }}
        >
          <ActionMenu>
            <ActionMenu.Anchor>
              <Avatar size={35} src={session.user?.image || ""} />
            </ActionMenu.Anchor>
            <ActionMenu.Overlay width="medium">
              <ActionList>
                <ActionList.Item onSelect={() => window.location.href=`${session.user?.provider_data?.profile_page}`}>
                  <Box> {/* style="width: 20%; float:left"> */}
                    <Avatar src={session.user?.image || ""} />
                  </Box>

                  <Box> {/* style="width: 80%; float:right"> */}
                    <b>{session.user?.provider_data?.user_name}</b>
                    <br/>
                    <Text>{session.user?.name}</Text>
                  </Box>
                </ActionList.Item>
                <ActionList.Divider />
                <ActionList.Item
                  onSelect={() => {
                    setColorMode("night");
                    document.body.setAttribute("data-theme", "dark");
                  }}
                >
                  Set dark mode
                </ActionList.Item>
                <ActionList.Item
                  onSelect={() => {
                    setColorMode("day");
                    document.body.setAttribute("data-theme", "light");
                  }}
                >
                  Set light mode
                </ActionList.Item>
                <ActionList.Divider />
                <ActionList.Item
                  onSelect={() => signOut()}
                >
                  Sign out
                </ActionList.Item>
              </ActionList>
            </ActionMenu.Overlay>
          </ActionMenu>
        </Header.Item>
      </>
    );
  }

  return (
    <Header.Item>
      <Button variant="invisible" onClick={() => signIn("github")}>
        Sign in
      </Button>
    </Header.Item>
  );
}
