import React from 'react';
import PropTypes from 'prop-types';
import rules from './rules.json';
import './RulesPage.css';

const RulesPage = props => (
  <div className='accept-rules'>
    <div className='accept-rules--window'>
      <button className='window--close' onClick={props.toggle} />
      <p className='window--heading'>{rules.title}</p>
      {rules.points.map(rule => <p key={rule.slice(0, 20)}>{rule}</p>)}
    </div>
  </div>
);

export default RulesPage;

RulesPage.propTypes = {
  toggle: PropTypes.func.isRequired,
};
