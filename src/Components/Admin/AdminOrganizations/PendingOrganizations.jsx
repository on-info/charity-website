import React from 'react';
import { getPendingOrganizations } from '../../../organizationsCalls';
import PendingItem from './PendingItem';
import cancelablePromise from '../../../utils/cancelablePromise';
import './PendingOrganizations.css';
import '../../Tabs/Tabs.css';

export default class PendingOrganizations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingItems: [],
    };
    this.setPendingItems = this.setPendingItems.bind(this);
  }

  componentDidMount() {
    this.setPendingItems();
  }

  componentWillUnmount() {
    this.cancelablePromise.cancel();
  }

  setPendingItems() {
    this.cancelablePromise = cancelablePromise(getPendingOrganizations());
    this.cancelablePromise.promise
      .then(pendingItems => this.setState({ pendingItems }))
      .catch((err) => {
        window.console.log(err);
      });
  }

  render() {
    return (
      <div className='tabs-box'>
        <h2 className='secondary-heading'>Заявки на добавление</h2>
        {this.state.pendingItems.map(item => (
          <PendingItem
            key={item._id}
            {...item}
            setPendingItems={this.setPendingItems}
            {...this.props}
          />
        ))}
      </div>
    );
  }
}
