'use client';

import { usePathname } from 'next/navigation';

import Header from '../Header';

const HeaderWrapper  = () => {
  const pathname = usePathname();
  const isTopPage = pathname === '/';
  
  return <Header isTopPage={isTopPage} />;
}


export default HeaderWrapper 