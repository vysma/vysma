import { Kernel, KernelConfiguration, kernel } from '@vysma/libs-kernel';
import { ReactNode, createContext, useRef } from 'react';

export const VysmaContext = createContext<Kernel | null>(null);

export const VYSMA_REACT = 'com.vysma.react';

export interface VysmaProviderProps {
  config: KernelConfiguration;
  children: ReactNode;
}

export const VysmaProvider = (props: VysmaProviderProps) => {
  const { config, children } = props;
  const vysma = kernel(config);
  const vysmaKernelRef = useRef<Kernel>(vysma);
  return (
    <VysmaContext.Provider value={vysmaKernelRef.current}>
      {children}
    </VysmaContext.Provider>
  );
};
