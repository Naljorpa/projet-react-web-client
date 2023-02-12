import React from 'react';
import Entete from '../Entete/Entete';
import ListeBieres from '../ListeBieres/ListeBieres';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Accueil from '../Accueil/Accueil';
import DetailsBiere from '../DetailsBiere/DetailsBiere';
import NotFound from '../NotFound/NotFound';

export default class App extends React.Component {
  constructor() {
    super();  // Appel explicite au constructeur de la classe React.Component
    this.message = "Ceci est un message";
    this.state = {
      estConnecte: false,
      courriel: ""
    };

    this.connection = this.connection.bind(this);
  }

  connection(courriel) {
    this.setState({
      estConnecte: !this.state.estConnecte,
      courriel: courriel
    });
  }

  render() {
    return (
      <Router id="App">
        <Entete seConnecter={this.connection} estConnecte={this.state.estConnecte} />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/bieres" element={<ListeBieres />} />
          <Route path="/biere/:id" element={<DetailsBiere estConnecte={this.state.estConnecte} courriel={this.state.courriel} />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </Router>

      //<section className='App'>
      //  <button onClick={this.augmenteCompte}>Clique ({this.state.compteur})</button>
      //  <ListeBieres estConnecte={this.state.estConnecte} compteur={this.state.compteur} />


      //</section>
    );
  }
}


