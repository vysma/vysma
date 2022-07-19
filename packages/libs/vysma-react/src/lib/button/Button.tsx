import { ReactNode, useContext } from 'react';
import { VYSMA_REACT, VysmaContext } from '../VysmaContext';

export interface VysmaButtonProps {
  component: ReactNode;
  name?: string;
}

export const VysmaButton = ({ component, name, ...props }: any) => {
  const vysma = useContext(VysmaContext);
  const handleClick = () => {
    vysma!.mutate(VYSMA_REACT, 'button', { name, ...props });
    console.log(`Button clicked!`);
  };
  return <>{component(...{ onClick: handleClick, ...props })}</>;
};
