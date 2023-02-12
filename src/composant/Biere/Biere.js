import React from 'react';
import './Biere.css';
import can from './beer-can.jpg';

export default class Biere extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {

        return (
            <article className="biere">
                <div className='img-biere'>
                    <img src={can} alt='image de cannette'></img>
                </div>
                <div className='texte'>
                    <h2>Nom : {this.props.biere.nom}</h2>
                    <p>Brasserie: {this.props.biere.brasserie}</p>
                </div>


            </article>
        );
    }
}


