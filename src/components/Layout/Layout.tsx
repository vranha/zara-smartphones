import { ReactNode } from 'react';
import Navbar from '../Navbar/Navbar';
import styles from '@/styles/Home.module.scss';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className={styles.mainContent}>{children}</main>
    </>
  );
}
