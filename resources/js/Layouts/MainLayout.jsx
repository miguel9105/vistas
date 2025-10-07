import React from 'react';
import { Navbar } from '../Components/Navbar';
import { Footer } from '../Components/Footer';

const layoutStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const contentStyle = {
  flexGrow: 1, // Permite que el contenido tome el espacio restante
  width: '100%',
};

const MainLayout = ({ children }) => {
  return (
    <div style={layoutStyle}>
      <Navbar />
      <main style={contentStyle}>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;