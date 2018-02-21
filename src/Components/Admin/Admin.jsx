import React from 'react';
import { getNews, addNews } from '../../newsCalls';
import Form from './Form/Form';
import './Admin.css';
import SingleNews from '../News/SingleNews/SingleNews';
import ControlButton from '../ControlButton/ControlButton';
import DetailsButton from '../DetailsButton/DetailsButton';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
    };
    this.handleNewsSubmit = this.handleNewsSubmit.bind(this);
  }

  componentDidMount() {
    this.setNews();
  }

  setNews() {
    getNews().then(news => this.setState({ news }));
  }
  // eslint-disable-next-line
  handleNewsSubmit(news) {
    addNews(news);
  }

  render() {
    return (
      <div className='admin indent'>
        <Form onNewsSubmit={this.handleNewsSubmit} />
        <div className='news-admin'>
          <h2 className='news-admin--news-heading'>Список всех новостей</h2>
          <div className='news-list'>
            {this.state.news.map(item => (
              <div className='news-list--item' key={item._id}>
                <SingleNews title={item.title} shortDescription={item.shortDescription} />
                <ControlButton text='Редактировать' />
                <ControlButton text='Удалить' />
                <DetailsButton text='ПОДРОБНЕЕ' url='https://tut.by' />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
