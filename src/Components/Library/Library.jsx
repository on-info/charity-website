import React from 'react';
import Search from './Search/Search';
import CategoriesList from './CategoriesList/CategoriesList';
import './Library.css';

export default () => (
  <div className='library indent'>
    <h1 className='library--heading'>Библиотека</h1>
    <Search />
    <CategoriesList />
  </div>
);