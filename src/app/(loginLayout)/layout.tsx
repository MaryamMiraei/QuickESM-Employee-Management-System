import React from 'react'

const LoginLayout = ({children}:{children: React.ReactNode}) => {
  return (
    
   <main className="auth-container">{children}</main>

  )
}

export default LoginLayout