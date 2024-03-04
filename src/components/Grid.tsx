import { FC, ReactNode } from 'react';

type GridProps = {
  children?: ReactNode;
}

export const Grid: FC<GridProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {children}
    </div>
  );
};