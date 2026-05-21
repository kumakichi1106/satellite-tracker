import type { ButtonHTMLAttributes, ReactNode } from 'react';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
};

export function IconButton({
  label,
  children,
  className = '',
  type = 'button',
  ...buttonProps
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={[
        'inline-flex size-9 items-center justify-center rounded border border-slate-700 text-slate-300',
        'transition hover:bg-slate-800 hover:text-white',
        'focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950',
        className,
      ].join(' ')}
      aria-label={label}
      {...buttonProps}
    >
      {children}
    </button>
  );
}