
import React from 'react';
import { Link } from 'react-router-dom';
import './Accueil.css';

export default class Accueil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="pageAccueil">
                <h1>Bienvenue sur Biero</h1>
                <div className="contenu">
                    <div className="bandeau">
                        <a href="/bieres" className="btnAction">Notre sélection de bieres</a>
                    </div>
                    <div className="arguments">
                        <div>
                            <h2>Une sélection exceptionnelle de bières</h2>
                        </div>
                        <div>
                            <h2>Notez vos dégustations</h2>
                        </div>
                        <div>
                            <h2>Participer à la communauté en commentant nos bières</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}