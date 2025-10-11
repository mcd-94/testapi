'use client';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const ClientLayout = ({ children }) => {
  return (
    <>

      <Header />
        
      <div>{children}</div>

      <Footer />

    </>
  )
}

export default ClientLayout
