import React, { Component } from 'react';
import moment from 'moment';
import ProjectGallery from '../../Components/ProjectGallery/ProjectGallery';
import ProjectDefaultImg from '../../Assets/AssetsSvg/project-default.svg';


class Project extends Component {

    render() {
        return (
            <div className="projects-page-content">
                <div className="img-container">
                    <div className="img-placeholder">
                         <img className="project-main-img" src={this.props.content.image ? `http://localhost:3001/images/${this.props.content.image}` : ProjectDefaultImg }/>
                    </div>
                </div>
                <div className="project-section">
                    <div>
                        <div className="text-container">
                            <div className="project-title">
                                <h3>{this.props.content.name}</h3>
                            </div>
                            <div className="project-address">{this.props.content.address}</div>
                            <div className="project-desc">
                                <span dangerouslySetInnerHTML= {{__html: this.props.content.fullText}}></span>
                            </div>
                        </div>
                        {<ProjectGallery content={this.props.content} />}    
                        <div className="contact-info">
                            <p>Контактны:</p>
                            <p>{this.props.content.organization}</p>
                            <p>{this.props.content.headArray.map((item, i) => {
                                    return <div><p key={i}>{item}</p></div>     
                                    })
                                }, {this.props.content.contactsArray.map((item, i) => {
                                    return <p key={i}>{item}</p>     
                                    })
                                }</p>
                            <p>{this.props.content.site}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Project;
