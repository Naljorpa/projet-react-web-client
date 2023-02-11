import React from 'react';
import { Link } from 'react-router-dom';
import Biere from '../Biere/Biere';
import './ListeBieres.css';

export default class ListeBieres extends React.Component{
  constructor(){
    super()

    this.state = {bieres: [
      { id: 1,
        nom : "Biere 1",
        prix : 15.50
      },
      { id: 2,
        nom : "Biere 2",
        prix : 25.50
      },
      { id: 3,
        nom : "Biere 3",
        prix : 10.50
      },

    ], 
    messageErreur : "Test"}
  }

  componentDidMount(){
    fetch("http://127.0.0.1:8000/serviceWeb_PHP/biere")
      .then(data=>data.json())
      .then(data=>{
        console.log(data);
        this.setState({
          bieres : data.data
        })
      })

  }

  render(){

    let aBieres = this.state.bieres.map((uneBiere, index)=>{
      //console.log(unProduit, index)
      // Choisir sa façon, pas les deux...}
        //<Produit nom={unProduit.nom} id={unProduit.id_biere} description={unProduit.description} />
      return ( 
        <Link key={uneBiere.id_biere} to={"/biere/" + uneBiere.id_biere}>
            <Biere estConnecte={this.props.estConnecte}  biere={uneBiere} {...uneBiere} /> 
        </Link>
      );
    })
    console.log(aBieres)
    
    if(aBieres.length <= 0){
      aBieres = <p>Aucune biere disponible</p>;
    }

    return (
      <div className="liste">
        <h1>liste</h1>
        <p>Compteur : {this.props.compteur}</p>
        {/*}<p>{this.state.messageErreur}</p>{*/}
        <section className='mesBieres'>
          {aBieres}
          {/*}{(aProduits.length ? aProduits : "Aucun produit disponible")}{*/}
          
        </section>
      </div>
      
    );
  }
}


