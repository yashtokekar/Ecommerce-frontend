import React from 'react';
import { Link } from 'react-router-dom';

export const ProductListItems = ({ product }) => {
  const { price, category, subs, shipping, color, brand, quantity, sold } =
    product;
  return (
    <ul className='list-group'>
      <li className='list-group-item'>
        Price{' '}
        <span className='float-right label label-default label-pill pull-xs-right'>
          &#8377; {price}
        </span>
      </li>
      {category && (
        <li className='list-group-item'>
          Category{' '}
          <Link
            to={`/category/${category.slug}`}
            className='float-right label label-default label-pill pull-xs-right'
          >
            {category.name}
          </Link>
        </li>
      )}

      {subs && (
        <li className='list-group-item'>
          Sub Categories
          {subs.map((s) => (
            <Link
              to={`/sub/${s.slug}`}
              className='float-right label label-default label-pill pull-xs-right'
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}
      <li className='list-group-item'>
        Shipping
        <span className='float-right label label-default label-pill pull-xs-right'>
          {shipping}
        </span>
      </li>
      <li className='list-group-item'>
        Color{' '}
        <span className='float-right label label-default label-pill pull-xs-right'>
          {color}
        </span>
      </li>
      <li className='list-group-item'>
        Brand{' '}
        <span className='float-right label label-default label-pill pull-xs-right'>
          {brand}
        </span>
      </li>
      <li className='list-group-item'>
        Available{' '}
        <span className='float-right label label-default label-pill pull-xs-right'>
          {quantity}
        </span>
      </li>
      <li className='list-group-item'>
        Sold{' '}
        <span className='float-right label label-default label-pill pull-xs-right'>
          {sold}
        </span>
      </li>
    </ul>
  );
};
