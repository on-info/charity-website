import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteNews } from '../../newsCalls';
import SingleNews from '../News/SingleNews/SingleNews';
import ControlButton from '../ControlButton/ControlButton';
import DetailsButton from '../DetailsButton/DetailsButton';
import Modal from './ModalWindow/ModalWindow';
import checkMessageType from './checkMessageType';
import Message from '../Message/Message';
import './Admin.css';
import './AdminNewsItem.css';
import '../ControlButton/ControlButton.css';

class AdminNewsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      link: '',
      text: '',
      message: {
        type: '',
        text: '',
      },
    };
    this.deleteHandler = this.deleteHandler.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.checkUrlHandler = this.checkUrlHandler.bind(this);
  }

  componentDidMount() {
    this.checkUrlHandler();
  }

  checkUrlHandler() {
    if (this.props.url) {
      this.setState({
        link: this.props.url,
        text: 'Перейти',
      });
    } else {
      this.setState({
        link: `/news/${this.props._id}`,
        text: 'Подробнее',
      });
    }
  }

  handleEditClick() {
    this.props.history.push(`${this.props.match.url}/edit/${this.props._id}`);
  }

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  deleteHandler() {
    deleteNews(this.props._id).then((data) => {
      this.setState({ message: checkMessageType(data) });
    });
    this.toggleModal();
  }

  render() {
    return (
      <div className='news-card'>
        <Message {...this.state.message} />
        <SingleNews {...this.props} />
        <div className='item--buttons'>
          <ControlButton
            text='Редактировать'
            className='control-button control-button--green control-button--small'
            onButtonClick={this.handleEditClick}
          />
          <ControlButton
            text='Удалить'
            className='control-button control-button--red control-button--small'
            onButtonClick={this.toggleModal}
          />
          {this.state.isOpen && <Modal onConfirm={this.deleteHandler} toggle={this.toggleModal} />}
          <DetailsButton
            className='control-button control-button--blue control-button--small'
            url={this.state.link}
            text={this.state.text}
          />
        </div>
      </div>
    );
  }
}
export default withRouter(AdminNewsItem);

AdminNewsItem.defaultProps = {
  url: '',
};

AdminNewsItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string,
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
