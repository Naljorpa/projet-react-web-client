import React from 'react';
import Entete from '../Entete/Entete';
import ListeProduit from '../ListeProduit/ListeProduit';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import Accueil from '../Accueil/Accueil';
import Details from '../Details/Details';

export default class App extends React.Component{
  constructor(){
    super();  // Appel explicite au constructeur de la classe React.Component
    this.message = "Ceci est un message";
    this.compteur = 0;
    this.state = { 
      compteur : 0,
      estConnecte : false,
      courriel : ""
    };

    this.augmenteCompte = this.augmenteCompte.bind(this);
    this.connection = this.connection.bind(this);
  }

  connection(courriel) {
    this.setState({
      estConnecte : !this.state.estConnecte,
      courriel: courriel
    });
  }

  augmenteCompte(){
    //this.state.compteur++;
    this.setState({
      compteur : this.state.compteur+1
    })
    
    //this.compteur++;
    console.log(this.state.compteur);
   
  }

  render(){
    return (
      <Router id="App">
        <Entete seConnecter={this.connection} estConnecte={this.state.estConnecte} />
        <Routes>
          <Route path="/" element={<Accueil />}/>
          <Route path="/produit"  element={<ListeProduit />}/>
          <Route path="/produit/:id"  element={<Details estConnecte={this.state.estConnecte} courriel={this.state.courriel}/>}/>
        </Routes>
      </Router>

      //<section className='App'>
      //  <button onClick={this.augmenteCompte}>Clique ({this.state.compteur})</button>
      //  <ListeProduit estConnecte={this.state.estConnecte} compteur={this.state.compteur} />
  

      //</section>
    );
  }
}


