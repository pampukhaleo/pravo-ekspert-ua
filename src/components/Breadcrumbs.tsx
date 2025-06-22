import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from './ui/breadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs = ({ items, className = "" }: BreadcrumbsProps) => {
  return (
    <div className={`bg-gray-50 border-b border-gray-200 py-4 ${className}`}>
      <div className="container-custom">
        <Breadcrumb>
          <BreadcrumbList>
            {/* Home icon for first item */}
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center text-gray-600 hover:text-brand-blue transition-colors">
                  <Home className="h-4 w-4 mr-1" />
                  Головна
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                
                <BreadcrumbItem>
                  {item.isCurrentPage || !item.href ? (
                    <BreadcrumbPage className="text-gray-900 font-medium">
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link 
                        to={item.href} 
                        className="text-gray-600 hover:text-brand-blue transition-colors"
                      >
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default Breadcrumbs;
