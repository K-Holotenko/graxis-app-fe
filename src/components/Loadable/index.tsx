import { ReactNode } from 'react';

interface LoadableProps {
  isLoading: boolean;
  skeleton: ReactNode;
  component: () => ReactNode;
}

export const Loadable = ({ isLoading, skeleton, component }: LoadableProps) =>
  isLoading ? skeleton : component();
