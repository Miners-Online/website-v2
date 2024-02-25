import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { Octokit } from "octokit";

const clientId = process.env.GITHUB_APP_CLIENT_ID;
const clientSecret = process.env.GITHUB_APP_SECRET;

if (!clientId || !clientSecret) throw new Error("Environment variables not set");

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: clientId,
      clientSecret: clientSecret,
      authorization: {
        params: { scope: "read:user user:email notifications public_repo" },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token as string;
      }
      if (account?.id) {
        token.id = account.id
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider
      session.accessToken = token.accessToken as string;
      var octokit = new Octokit({ auth: token.accessToken });
      
      const response = await octokit?.request("GET /user");
      const data = response?.data;
      session.user = {
        name: token.name as string,
        email: token.email as string,
        image: token.picture as string,
        sub: token.sub as string,
        provider_data: {
          profile_page: data.html_url,
          user_name: data.login,
        }
      }

      return session;
    },
  },
});
