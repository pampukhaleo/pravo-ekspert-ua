
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ViewAllNewsButton: React.FC = () => {
  return (
    <div className="mt-10 text-center">
      <Button 
        asChild
        variant="outline"
        className="px-6 py-3 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition-colors"
        onClick={() => window.scrollTo(0, 0)}
      >
        <Link to="/novini" className="inline-flex items-center">
          Всі новини
          <ChevronRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
};

export default ViewAllNewsButton;
