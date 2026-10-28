import Menu from '@/components/Menu';
import React from 'react'

const MainLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
      <main className="flex">
        <div>
          <Menu />
        </div>
        <div className='mt-18 lg:ml-74 lg:mt-0'>{children}</div>
      </main>
    </>
  );
}

export default MainLayout