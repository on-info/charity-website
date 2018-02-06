import React from 'react';
import './newsList.css'
class NewsList extends React.Component {
    render() {
        return (
            <li className="news-list">
                <p className="news-list-title">{this.props.title}</p>
                <p className="news-list--shortDescription">{this.props.shortDescription}</p>
                <button className="news-list--delete-button">X</button>
            </li>
        );
    }
}

export default NewsList;