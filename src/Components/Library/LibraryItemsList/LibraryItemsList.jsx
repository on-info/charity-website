import React from 'react';
import PropTypes from 'prop-types';
import URLSearchParams from 'url-search-params';
import { fullTextLibrarySearch, getLibraryItems } from '../../../libraryCalls';
import LibraryItem from '../LibraryItem/LibraryItem';
import DetailsButton from '../../DetailsButton/DetailsButton';
import cancelablePromise from '../../../utils/cancelablePromise';
import uiLogger from '../../../logdown/uiLogger';

export default class LibraryItemsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      libraryItems: [],
    };
  }
  componentDidMount() {
    if (this.props.location.search) {
      this.setSearchTextResult(this.props.location.search);
    } else this.setLibraryItems(this.props.match.params);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search) {
      this.setSearchTextResult(nextProps.location.search);
    } else if (this.props.location.pathname !== nextProps.location.pathname) {
      this.setLibraryItems(nextProps.match.params);
    }
  }

  componentWillUnmount() {
    this.cancelablePromise.cancel();
  }

  setSearchTextResult(urlParams) {
    const urlParamsQuery = new URLSearchParams(urlParams);
    const textSearch = encodeURIComponent(urlParamsQuery.get('textSearch'));
    const types = urlParamsQuery.get('types');
    this.cancelablePromise = cancelablePromise(fullTextLibrarySearch(textSearch, types));
    this.cancelablePromise.promise
      .then(libraryItems => this.setState({ libraryItems }))
      .catch((err) => {
        uiLogger.log(err);
      });
  }

  setLibraryItems({ category, type }) {
    this.cancelablePromise = cancelablePromise(getLibraryItems(category, type));
    this.cancelablePromise.promise
      .then(libraryItems => this.setState({ libraryItems }))
      .catch((err) => {
        uiLogger.log(err);
      });
  }

  render() {
    return this.state.libraryItems.map(item => (
      <div key={item._id} className='library-item'>
        <LibraryItem {...item} />
        <DetailsButton
          className='control-button control-button-primary'
          text='Подробнее'
          url={item.url}
        />
      </div>
    ));
  }
}

LibraryItemsList.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.string,
      type: PropTypes.string,
    }),
  }).isRequired,
};
