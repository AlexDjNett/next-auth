import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { prisma } from './prisma'

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  // pages: {
  //   signIn: '/login',
  // },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user || !(await compare(credentials.password, user.password))) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          randomKey: 'Hey cool',
        }
      },
      async redirect({ url, baseUrl, ...props }) {
        console.log('🚀 ~ file: auth.js:34 ~ redirect ~ props:', props)
        // Allows relative callback URLs
        // if (url.startsWith("/")) return `${baseUrl}${url}`
        // // Allows callback URLs on the same origin
        // else if (new URL(url).origin === baseUrl) return url
        // return baseUrl
      },
      session: ({ session, token }) => {
        console.log('Session Callback', { session, token })
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            randomKey: token.randomKey,
          },
        }
      },
      jwt: ({ token, user }) => {
        console.log('JWT Callback', { token, user })
        if (user) {
          const u = user
          return {
            ...token,
            id: u.id,
            randomKey: u.randomKey,
          }
        }
        return token
      },
    }),
  ],
}
