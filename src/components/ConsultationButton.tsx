
import React from 'react';
import { Link } from 'react-router-dom';

interface ConsultationButtonProps {
  className?: string;
  variant?: 'primary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
}

const ConsultationButton: React.FC<ConsultationButtonProps> = ({ 
  className = '', 
  variant = 'primary',
  size = 'md'
}) => {
  const baseClasses = "font-medium rounded-md transition-colors duration-300 text-center inline-block";
  
  const variantClasses = {
    primary: "bg-brand-blue hover:bg-brand-light text-white",
    outline: "border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white",
    text: "text-brand-blue hover:text-brand-light underline"
  };
  
  const sizeClasses = {
    sm: "py-1.5 px-4 text-sm",
    md: "py-2.5 px-6",
    lg: "py-3 px-8 text-lg"
  };
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <Link to="/kontakty" className={buttonClasses}>
      Отримати консультацію
    </Link>
  );
};

export default ConsultationButton;
