import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ img, title, text, btn, col4, col3 }) => {
  return (
    <div className={`col-md-6 ${col4 ? "col-lg-4" : "col-lg-3" }`}>
      <div className="card service-card min-vh-50 overflow-hidden rounded-5">
        <img src={img || "default-image.jpg"} className="card-img-top" alt={title || "Service Image"} />
        <div className="card-img-overlay d-flex flex-column justify-content-end p-0">
          <div className="card-content">
            <h5 className="card-title mb-3">{title}</h5>
            <div className="card-details">
              <p className="card-text">{text}</p>
              {btn && (<Link to="#" className="btn btn-primary mt-2">{btn}</Link>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
