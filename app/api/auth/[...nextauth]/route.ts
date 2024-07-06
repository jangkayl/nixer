import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
	interface Session {
		user: {
			name?: string | null;
			email?: string | null;
			image?: string | null;
			username?: string | null;
			uid?: string | null;
		};
	}

	interface User {
		username?: string | null;
		uid?: string | null;
	}
}

const authOptions: NextAuthOptions = {
	secret: process.env.SECRET,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
		}),
	],
	callbacks: {
		async session({ session, token }: { session: Session; token: any }) {
			if (session.user) {
				const user = session.user as User;
				user.username = user.name?.split(" ").join("").toLowerCase();
				user.uid = token.sub;
			}
			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
