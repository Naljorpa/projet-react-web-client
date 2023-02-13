import React from 'react';
import { Link } from 'react-router-dom';
import Biere from '../Biere/Biere';
import './ListeBieres.css';

export default class ListeBieres extends React.Component{
  constructor(){
    super()

    this.state = {bieres: [
 

    ]}
  }

  componentDidMount(){
    fetch("http://127.0.0.1:8000/serviceWeb_PHP/biere")
      .then(data=>data.json())
      .then(data=>{
        this.setState({
          bieres : data.data
        })
      })

  }

  render(){

    let aBieres = this.state.bieres.map((uneBiere, index)=>{

      return ( 
        <Link key={uneBiere.id_biere} to={"/biere/" + uneBiere.id_biere}>
            <Biere estConnecte={this.props.estConnecte}  biere={uneBiere} /> 
        </Link>
      );
      
    })
    
    if(aBieres.length <= 0){
      aBieres = <p className='erreur'>Aucune biere disponible</p>;
    }

    return (
      <div className="liste">
        <h1>Notre sélection de bières</h1>
        {/*}<p>{this.state.messageErreur}</p>{*/}
        <section className='mesBieres'>
          {aBieres}
          {/*}{(aProduits.length ? aProduits : "Aucun produit disponible")}{*/}
          
        </section>
      </div>
      
    );
  }
}


