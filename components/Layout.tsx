import React, { ReactNode } from 'react';
import Header from './Header';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Header />
      {children}
    </div>
  );
};

export default Layout;
