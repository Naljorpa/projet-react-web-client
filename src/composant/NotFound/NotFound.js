
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default class NotFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="notFound">
                <div className='container'>
                    <h1>Erreur 404</h1>
                    <div className="contenu">
                        <h2>La page que vous cherchez n'existe pas!</h2>
                    </div>
                </div>
            </div>
        );
    }
}