import React from 'react';
import classnames from 'classnames';
import NavigationList from './NavigationLIst';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.toggleClass = this.toggleClass.bind(this);
    this.setStateToFalse = this.setStateToFalse.bind(this);
    this.state = {
      active: false,
    };
  }
  setStateToFalse() {
    this.setState({ active: false });
  }

  getImageClass() {
    return classnames('navigation--button', {
      'navigation--button-open': this.state.active,
    });
  }

  toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  render() {
    return (
      <nav className='navigation'>
        <ul className='navigation--menu'>
          <button className={this.getImageClass()} onClick={this.toggleClass} />
          <NavigationList onClick={this.setStateToFalse} />
        </ul>
      </nav>
    );
  }
}

export default Navigation;
