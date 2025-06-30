import { ReactNode } from 'react';
import styles from './Container.module.scss';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className = '' }: ContainerProps) => {
  const containerClasses = `${styles.container} ${className}`;

  return <div className={containerClasses}>{children}</div>;
};
