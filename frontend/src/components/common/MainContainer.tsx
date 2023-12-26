import React from 'react';
import './MainContainer.css';

type MainContainerProps = {
  children: React.ReactNode
}

export const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <div className="container">
      {children}
    </div>
  );
};
