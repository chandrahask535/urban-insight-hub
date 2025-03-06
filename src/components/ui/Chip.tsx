
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type ChipProps = {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'urban' | 'eco' | 'heat';
  size?: 'sm' | 'md';
};

export const Chip = ({
  children,
  className,
  variant = 'default',
  size = 'md',
}: ChipProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground border-secondary/50';
      case 'urban':
        return 'bg-urban-100 text-urban-800 border-urban-200';
      case 'eco':
        return 'bg-eco-100 text-eco-800 border-eco-200';
      case 'heat':
        return 'bg-heat-100 text-heat-800 border-heat-200';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getSizeStyles = () => {
    return size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border',
        getVariantStyles(),
        getSizeStyles(),
        className
      )}
    >
      {children}
    </span>
  );
};
