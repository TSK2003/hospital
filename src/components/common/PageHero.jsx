import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const PageHero = ({ title, subtitle, breadcrumb = [] }) => {
  return (
    <div className="relative bg-slate-900 text-white py-12 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-1.5 text-xs text-sky-400 mb-3 font-medium">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          {breadcrumb.map((item, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              {item.path ? (
                <Link to={item.path} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-slate-300">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHero;
