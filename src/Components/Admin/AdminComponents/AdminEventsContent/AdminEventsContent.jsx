import React, {Component} from 'react';
import AdminEventsList from '../AdminEventsList/AdminEventsList';
import Button from '../../../Button/Button';
import AdminCreateEvent from '../AdminCreateEvent/AdminCreateEvent';
import './AdminEventsContent.css';
import "../../../../App.css";
import Navigation from '../../../Navigation/Navigation';
import NavBar from '../../../NavBar/NavBar';
import { server } from "../../../../api";
import { Route } from 'react-router-dom';

class AdminEventsContent extends Component {
    state= {
        events : {}
    }
    componentDidMount(){
       this.getList();
    };
    render() {
        return(
            <div>
                <Navigation onLogout={this.onLogout} />
                <NavBar />
                <div className="list-container">
                    <div className="new-event">
                        <div className="button-new-news">                     
                            <Route render={({history}) => (
                                <Button 
                                    name = "button-admin" 
                                    label = "Создать" 
                                    clickHandler = {() => { history.push('/admin-panel/events/create') }}
                                />
                               )} 
                            />
                        </div>     
                        {(this.state.events.length > 0)?
                        <AdminEventsList 
                            events = {this.state.events} 
                            getUpdateEventsList = {this.getUpdateEventsList}
                        /> 
                        : null} 
                    </div>
                </div>
            </div>
        )
    }
    getList = () => {
        fetch(`${ server }/api/events`)
        .then(response => response.json())
        .then(data => {         
              this.setState({ events: data.events }              
            )})
        .catch(error => this.setState({ error, isLoading: false }));
    };
    getUpdateEventsList = () => {
        setTimeout(this.getList,100);
    }
    addEvent = () => {
        this.setState({isOpen: true});        
    }
    saveEvent = () => {
        setTimeout(this.getList,0);
    }
}

export default AdminEventsContent;