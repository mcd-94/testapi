'use client';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import StartMenu from '@/components/StartMenu/StartMenu';

const ClientLayout = ({ children }) => {
  return (
    <>

      <Header />
    <p>Hola</p>
      <div>{children}</div>

      <Footer />

    </>
  )
}

export default ClientLayout
