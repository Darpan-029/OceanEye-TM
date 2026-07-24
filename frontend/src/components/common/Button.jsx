import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  onClick,
  disabled = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ocean-cyan focus:ring-offset-2 focus:ring-offset-ocean-darkest disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary: 'bg-ocean-blue hover:bg-blue-600 text-white rounded-button shadow-glow-blue hover:shadow-glow-cyan hover:-translate-y-0.5',
    secondary: 'bg-ocean-midnight/80 border border-ocean-cyan/30 text-ocean-cyan hover:border-ocean-cyan hover:bg-ocean-cyan/10 rounded-button hover:-translate-y-0.5',
    cyan: 'bg-ocean-cyan text-ocean-darkest font-semibold hover:bg-cyan-300 rounded-button shadow-glow-cyan hover:-translate-y-0.5',
    ghost: 'text-slate-300 hover:text-white hover:bg-white/10 rounded-button',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white rounded-button shadow-md',
    outline: 'border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white rounded-button'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5 font-semibold'
  };

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
      <span>{children}</span>
    </motion.button>
  );
};
