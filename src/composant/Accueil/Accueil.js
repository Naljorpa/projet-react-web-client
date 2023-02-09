
import React from 'react';
import { Link } from 'react-router-dom';
import './Accueil.css';

export default class Accueil extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return(
            <div className="pageAccueil">
				<div className="contenu">
					<div className="bandeau">
						<a href="/produit" className="btnAction">Notre sélection de produit</a>
					</div>
					<div className="arguments">
						<div>Argument 1 : (à compléter) 
                            <p>Pourquoi utiliser notre application?</p><p>Lorem ipsum...</p>
                        </div>
						<div>Argument 2 : (à compléter) 
                            <p>Pourquoi utiliser notre application?</p><p>Lorem ipsum...</p>
                        </div>
						<div>Argument 3 : (à compléter) 
                            <p>Pourquoi utiliser notre application?</p><p>Lorem ipsum...</p>
                            </div>
					</div>
				</div>
			</div>
        );
    }
}