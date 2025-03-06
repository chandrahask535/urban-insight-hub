
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type FadeInProps = {
  children: ReactNode;
  delay?: 'none' | 'short' | 'medium' | 'long';
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  fullWidth?: boolean;
};

export const FadeIn = ({
  children,
  delay = 'none',
  direction = 'up',
  className,
  fullWidth = false,
}: FadeInProps) => {
  const getAnimation = () => {
    if (direction === 'none') {
      return delay === 'none'
        ? 'animate-fade-in'
        : delay === 'short'
        ? 'animate-fade-in [animation-delay:150ms]'
        : delay === 'medium'
        ? 'animate-fade-in [animation-delay:300ms]'
        : 'animate-fade-in [animation-delay:450ms]';
    }

    const baseAnimation = 
      direction === 'up'
        ? 'translate-y-4'
        : direction === 'down'
        ? '-translate-y-4'
        : direction === 'left'
        ? 'translate-x-4'
        : '-translate-x-4';

    const animationClass = 'animate-fade-in';
    
    const delayClass = 
      delay === 'short'
        ? '[animation-delay:150ms]'
        : delay === 'medium'
        ? '[animation-delay:300ms]'
        : delay === 'long'
        ? '[animation-delay:450ms]'
        : '';

    return `${baseAnimation} ${animationClass} ${delayClass}`;
  };

  return (
    <div
      className={cn(
        'opacity-0',
        getAnimation(),
        fullWidth ? 'w-full' : '',
        className
      )}
    >
      {children}
    </div>
  );
};
