'use client'
import { signOut, useSession } from 'next-auth/react'

const Dashboard = () => {
  const { data, status } = useSession({ required: true })
  console.log('🚀 ~ file: page.js:6 ~ Dashboard ~ status:', status)
  console.log('🚀 ~ file: page.js:7 ~ Login ~ data:', data)
  return <div onClick={() => signOut()}>Log out</div>
}

export default Dashboard
