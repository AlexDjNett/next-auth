'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Login = () => {
  const router = useRouter()
  const { status } = useSession()

  const handleSignIn = async (formData) => {
    // e.preventDefault()
    const email = formData.get('email')
    const password = formData.get('password')
    const res = await signIn('credentials', {
      email,
      password,
      callbackUrl: '/dashboard',
    })
  }

  if (status === 'loading') return <div>Loading...</div>

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
      <form
        action={handleSignIn}
        style={{
          maxWidth: '500px',
          padding: '40px',
          background: 'gray',
          borderRadius: '20px',
          width: '100%',
        }}>
        <Input labelText={'email'} name='email' />
        <Input labelText={'password'} name='password' />
        <button type='submit'>Sign in</button>
      </form>
    </div>
  )
}

export default Login

const Input = ({ labelText, ...props }) => {
  return (
    <div>
      <label>{labelText}</label>
      <input style={{ width: '100%' }} {...props} />
    </div>
  )
}
