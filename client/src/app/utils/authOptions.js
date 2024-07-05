import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      id: "google",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      id: "signin",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        const res = await fetch(`${process.env.API_BASE_URL}auth/login`, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const user = await res.json();
        return user?.data;
      },
    }),

    CredentialsProvider({
      id: "register",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "email",
        },
        full_name: { label: "full_name", type: "full_name" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const payload = {
          email: credentials.email,
          full_name: credentials.full_name,
          loginType: "local",
          password: credentials.password,
        };

        const res = await fetch(`${process.env.API_BASE_URL}auth/register`, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const user = await res.json();
        return user?.data;
      },
    }),
  ],

  secret: process.env.JWT_SECRET,

  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   // Store the current URL in the session storage
    //   window !== undefined &&
    //     sessionStorage.setItem("lastPage", window.location.pathname);
    //   return true; // Allow sign in
    // },

    // async redirect({ url, baseUrl }) {
    //   // Redirect back to the last page after authentication
    //   const lastPage =
    //     window !== undefined && sessionStorage.getItem("lastPage");
    //   if (lastPage) {
    //     return `${baseUrl}${lastPage}`;
    //   }
    //   return url; // Default redirect
    // },

    async jwt({ token, user, account }) {
      if (account && user) {
        if (
          account?.provider === "google" ||
          account?.provider === "facebook"
        ) {
          const res = await fetch(`${process.env.API_BASE_URL}auth/provider`, {
            method: "POST",
            body: JSON.stringify({
              email: user?.email,
              full_name: user?.name,
              profile_image: user?.image,
              loginType: "google",
              password: user?.id,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const userData = await res.json();

          return {
            ...token,
            accessToken: userData?.data?.token,
            refreshToken: userData?.data?.token,
            name: user?.full_name,
          };
        } else {
          return {
            ...token,
            accessToken: user.token,
            refreshToken: user.token,
            name: user?.full_name,
          };
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;

      return token && token?.accessToken !== undefined ? session : undefined;
    },
  },
  pages: {
    signIn: "/",
    // signIn: "/auth/login",
    // signOut: "/",
  },
};
