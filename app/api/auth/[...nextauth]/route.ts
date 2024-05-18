
import NextAuth, {AuthOptions} from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from "@/app/libs/prismadb"

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: "email", type: "text"},
                password: {label: "password", type: "password"},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing credentials');
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!user) {
                    throw new Error('Invalid credentials');
                }

                const isCorrectPassword = user.password === credentials.password;

                if (!isCorrectPassword) {
                    throw new Error('Wrong password');
                }

                return user;
            }
        }),
    ],
    pages: {
        signIn: '/auth/login',
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}