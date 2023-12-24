import React from 'react';
import './MainContainer.css';

type Props = {
  children: React.ReactNode
}

export const MainContainer = ({ children }: Props) => {
  return (
    <div className="container">
      {children}
    </div>
  );
};
