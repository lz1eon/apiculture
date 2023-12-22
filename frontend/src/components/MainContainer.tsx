import React from 'react';
import './ExploreContainer.css';

type Props = {
  children: React.ReactNode
}

const MainContainer = ({ children }: Props) => {
  return (
    <div className="container">
      {children}
    </div>
  );
};

export default MainContainer;
