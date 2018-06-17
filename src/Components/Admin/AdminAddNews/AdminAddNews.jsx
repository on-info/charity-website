import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import moment from 'moment';
import axios from 'axios';

import {server} from '../../../api';
import AdminUploadImage from '../AdminComponents/AdminUploadImage/AdminUploadImage';
import TextField from '../../TextField/TextField';
import ControlledEditor from  '../AdminComponents/AdminEditor/AdminEditor';
import Button from '../../Button/Button';
import Navigation from '../../Navigation/Navigation';
import NavBar from '../../NavBar/NavBar';
import AdminPreview from '../AdminComponents/AdminPreview/AdminPreview'

import './AdminAddNews.css';

class AdminAddNews extends Component {
    state = {
        title: '',
        shortText: '',
        fullText: '',
        source: '',
        isPublic: false,
        imageData: '',
        isPreview: false,
        image: ''
    }
    cropperRef = React.createRef()

    componentWillMount() {
        this.setState({source: 'organizers'})
        if (this.props.location.state) {
            let infoAboutNews = this.props.location.state.detail;

            this.setState({
                title: this.props.location.state.detail.title,
                shortText: this.props.location.state.detail.shortText,
                fullText: this.props.location.state.detail.fullText,
                source: this.props.location.state.detail.source,
                isPublic: this.props.location.state.detail.isPublic,
                image: this.props.location.state.detail.image
            })
        }
    }

    render() {
        return (
            <div className="admin-content">
                <Navigation onLogout={this.onLogout} />
                <NavBar />
                {!this.state.isPreview ? 
                    <form className = "form-create-news" encType="multipart/form-data" method="post">
                        <div className = "news-status">
                            <span>Статус новости: {this.state.isPublic ? " опубликована" : " черновик"}</span>
                            <Route render={({history}) => (
                                <Button 
                                    label={"Опубликовать"}
                                    name = "button-admin"
                                    clickHandler = {this.onPublish}
                                />
                            )} />
                        </div>
                        <div className="admin-title-news">
                            <TextField 
                                id = "title-news" 
                                title = "Название новости:" 
                                type = "text"
                                name = "title-news"
                                value = {this.state.title}
                                onChangeValue = {this.onChangeValue}
                            />
                        </div>
                        <hr />
                        <div>
                            <AdminUploadImage 
                                id = "image-news"
                                name = "image-news"
                                imageData = {this.state.imageData}
                                image = {this.state.image}
                                onCropImage = {this.onCropImage}
                                ratio = {8 /3}
                            />
                        </div>
                        <hr />
                        <div className="text-news">
                            <div>Краткое описание:</div>
                            <ControlledEditor 
                                text = {this.state.shortText} 
                                getCurrentText = {this.getCurrentTextShort}
                            />
                        </div>
                        <hr />
                        <div className="text-news">
                            <div className="full-text-news">Полное описание:</div>
                            <ControlledEditor 
                                text = {this.state.fullText} 
                                getCurrentText = {this.getCurrentTextFull}
                            /> 
                        </div>
                        <hr />
                        <div className="text-news">
                            <div className = "news-source">
                                <label>Источник:</label>
                            </div>
                            <div>
                                <select value={this.state.source} onChange={this.handleChange}>
                                    <option value="organizers">Организаторы</option>
                                    <option value="sponsors">Спонсоры</option>
                                    <option value="activists">Активисты</option>
                                    <option value="volunteers">Волонтеры</option>
                                </select>
                            </div>
                        </div>
                        <div className = 'button-info'>
                            <span>* При нажатии на кнопку "Сохранить" новость сохраняется как черновик</span>
                        </div>
                        <div className="admin-buttons">
                            <Route render={({history}) => (
                                <Button 
                                    label = {"Предпросмотр"} 
                                    name = "button-admin"
                                    clickHandler = {this.onPreview}
                                />
                            )} />
                            <Route render={({history}) => (
                                <Button 
                                    label={"Опубликовать"}
                                    name = "button-admin"
                                    clickHandler = {this.onPublish}
                                />
                            )} />
                            <Route render={({history}) => (
                                <Button 
                                    label={"Сохранить"}
                                    name = "button-admin"
                                    clickHandler = {this.onDraft}
                                />
                            )} />
                            <Route render={({history}) => (
                                <Button 
                                    label={"Отмена"}
                                    name = "button-admin"
                                    clickHandler = {this.onCancel}
                                />
                            )} />
                        </div>
                    </form>  : 

                    <AdminPreview 
                        imageData = {this.state.imageData}
                        image = {this.state.image}
                        title = {this.state.title}
                        fullText = {this.state.fullText}
                        onPublish = {this.onPublish}
                        onDraft = {this.onDraft}
                        getNewStatePreview = {this.getNewStatePreview}
                    />
                }
            </div>
        )
    }
    onCropImage = (image) => {
        this.setState({imageData: image})
    }
    onChangeValue = (object) => {
        this.setState({title: object.value});
    }
    getCurrentTextFull = (str) => {
        this.setState({fullText: str});
    }
    getCurrentTextShort = (str) => {
        this.setState({shortText: str})
    }
    handleChange = (event) => {
        this.setState({source: event.target.value})
    }
    getNewStatePreview = () => {
        this.setState({
            isPreview: false
        })
    }
    checkText = () => {
        if (!this.state.shortText) {
            let newText = this.state.fullText.slice(0, 200) 
            if (this.state.fullText.length >= 201) {newText = newText + "..."}
            this.setState({shortText: newText}, this.sendNews)
        } else {
            this.sendNews()
        }
    }
    onPreview = (e) => {
        e.preventDefault()
        this.setState({
            isPreview: true
        })
    }
    onPublish = (e) => {
        e.preventDefault()
        this.setState({isPublic: true}, this.checkText)
    }
    onCancel = (e) => {
        e.preventDefault()
        this.setState({
            title: '',
            shortText: '',
            fullText: '',
            source: '',
            isPublic: false,
            imageData: '',
            image: ''
        }) 
        this.props.history.push({
            pathname: '/admin-panel/news'
        })  
    }
    onDraft = (e) => {
        e.preventDefault()
        this.setState({isPublic: false}, this.checkText)
    }
    sendNews = () => {
        let formData  = new FormData();
        Object.keys(this.state).forEach(key => formData.append(key, this.state[key]));

        let id = ''
        if (this.props.location.state) {
            id = this.props.location.state.detail._id
        }
        axios({
            method: id ? 'put' : 'post',
            url: id ? `${server}/news/` + id : `${server}/news/`,
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data; charset=UTF-8'}},
        })
        .then(response => {
            this.setState({
                title: '',
                shortText: '',
                fullText: '',
                source: '',
                isPublic: false,
                imageData: '',
                image: ''
            }) 
            this.props.history.push({
                pathname: '/admin-panel/news'
            })  
          })
          .catch(function (error) {
            console.log(error);
          });
    }
}

export default withRouter(AdminAddNews);