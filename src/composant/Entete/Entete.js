import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Entete.css';

export default class Entete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courrielValide: false,
      courriel: ""
    }
    //this.connection = this.connection.bind(this)
    this.setCourriel = this.setCourriel.bind(this);
    this.seConnecter = this.seConnecter.bind(this);
  }

  setCourriel(evt) {
    console.log(evt.target.value)
    let courriel = evt.target.value;
    let valide;
    let regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    //regex provenant de https://mailtrap.io/blog/validate-emails-in-react/
    //methode test prise de https://stackoverflow.com/questions/41348459/regex-in-react-email-validation
    //test le courriel par rapport la regex
    if (regex.test(courriel)) {
      valide = true;
    } else {
      valide = false;
    }

    this.setState({
      courrielValide: valide,
      courriel: courriel
    })

  }

  seConnecter() {

    this.props.seConnecter(this.state.courriel)
  }
  render() {
    let btnConnecter = (this.props.estConnecte ? "Se déconnecter" : "Se connecter")
    return (
      <header>
        <nav>
          <div className="top-nav">
            <div className="barre">
              <Link className="logo" to="/">

              </Link>
            </div>
            <div className='nav-biere-courriel'>
              <div>
                <ul>
                  <li>
                    <NavLink to="/bieres">Les bieres</NavLink>
                  </li>
                </ul>
              </div>
              <div className='form-courriel'>
                <label>Courriel : </label><input disabled={this.props.estConnecte} type="email" onChange={this.setCourriel}></input>
                <button disabled={!this.state.courrielValide} onClick={this.seConnecter}>{btnConnecter}</button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}


