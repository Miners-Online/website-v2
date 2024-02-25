import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string;
    
    user?: {
      name?: string;
      email?: string;
      image?: string;
      sub?: string;
      provider_data?: {
        profile_page?: string;
        user_name?: string;
      }
    }
  }
}
