
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { Chip } from './Chip';

type DataCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  chip?: {
    text: string;
    variant?: 'default' | 'primary' | 'secondary' | 'urban' | 'eco' | 'heat';
  };
  footer?: ReactNode;
};

export const DataCard = ({
  title,
  description,
  children,
  className,
  chip,
  footer,
}: DataCardProps) => {
  return (
    <div className={cn(
      'rounded-xl bg-card border shadow-card overflow-hidden',
      'transition-all duration-300 ease-in-expo',
      'hover:shadow-elevated',
      className
    )}>
      <div className="p-5">
        <div className="mb-4">
          {chip && (
            <Chip 
              variant={chip.variant}
              size="sm"
              className="mb-2"
            >
              {chip.text}
            </Chip>
          )}
          <h3 className="text-lg font-semibold leading-tight">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="space-y-3">
          {children}
        </div>
      </div>
      {footer && (
        <div className="px-5 py-3 bg-muted/30 border-t">
          {footer}
        </div>
      )}
    </div>
  );
};
