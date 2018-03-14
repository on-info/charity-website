import React from 'react';
import Card from '../Card/Card';
import educationImage from '../img/kids.svg';
import './EducationRouteLanding.css';

export default () => (
  <div className='home--education-route'>
    <img src={educationImage} alt='Образовательный маршрут' className='education-route--image' />
    <Card
      heading='Образовательный маршрут'
      text='Раздел образовательный маршрут предполагает возможность
      объединение родителей для дальнейшего выстраивания образовательного маршрута
      детей с особыми образовательными потребностями.'
      path='education_route'
    />
  </div>
);