import { type ReactNode } from 'react';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DesignBSurface } from './DesignBSurface';

interface DashboardTileProps {
  icon: LucideIcon;
  label: string;
  value?: string | number;
  caption?: string;
  colorAccent?: 'purple' | 'green' | 'pink' | 'amber' | 'blue' | 'indigo' | 'primary' | 'accent';
  variant?: 'default' | 'elevated' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  isToday?: boolean;
  onClick?: () => void;
  className?: string;
}

const colorMap = {
  purple: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30',
  green: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30',
  pink: 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/30',
  amber: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30',
  blue: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30',
  indigo: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30',
  primary: 'text-primary bg-primary/10',
  accent: 'text-accent bg-accent/10',
};

const sizeMap = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

const iconSizeMap = {
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

export function DashboardTile({
  icon: Icon,
  label,
  value,
  caption,
  colorAccent = 'primary',
  variant = 'elevated',
  size = 'md',
  isToday = false,
  onClick,
  className,
}: DashboardTileProps) {
  const isInteractive = !!onClick;

  const content = (
    <>
      {/* Icon wrapper with dynamic states */}
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'rounded-xl p-2.5 transition-all duration-300',
            'group-hover:scale-110 group-focus-visible:scale-110',
            'group-active:scale-95',
            isToday && 'animate-pulse-soft',
            colorMap[colorAccent]
          )}
        >
          <Icon
            className={cn(
              iconSizeMap[size],
              'transition-transform duration-300',
              'group-hover:rotate-6 group-focus-visible:rotate-6'
            )}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground text-sm md:text-base truncate">
            {label}
          </p>
          {value && (
            <p className="text-xl md:text-2xl font-bold text-foreground mt-1">
              {value}
            </p>
          )}
          {caption && (
            <p className="text-xs text-muted-foreground mt-1 truncate">
              {caption}
            </p>
          )}
        </div>
      </div>

      {/* Focus visible ring */}
      {isInteractive && (
        <div className="absolute inset-0 rounded-lg ring-2 ring-ring ring-offset-2 ring-offset-background opacity-0 group-focus-visible:opacity-100 transition-opacity pointer-events-none" />
      )}
    </>
  );

  if (isInteractive) {
    return (
      <button
        onClick={onClick}
        className={cn(
          'group relative overflow-hidden transition-all duration-300 w-full text-left',
          'cursor-pointer hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]',
          'rounded-lg',
          {
            'bg-card': variant === 'default',
            'bg-card shadow-md': variant === 'elevated',
            'bg-card border border-border': variant === 'outlined',
          },
          sizeMap[size],
          className
        )}
      >
        {content}
      </button>
    );
  }

  return (
    <DesignBSurface
      variant={variant}
      className={cn(
        'group relative overflow-hidden',
        sizeMap[size],
        className
      )}
    >
      {content}
    </DesignBSurface>
  );
}
