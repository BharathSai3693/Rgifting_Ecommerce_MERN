import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


const Breadcrumbs = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-gray-600">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
           <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 mx-1 text-gray-400" />
         
          )}
          {item.link ? (
            <Link
              to={item.link}
              className="hover:text-gray-800 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-500">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
