import "./DetailsBiere.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import can from './beer-can.jpg';

export default function DetailsBiere({ estConnecte, courriel }) {

    const { id } = useParams();
    const [biere, setBiere] = useState({});
    const [commentaires, setCommentaires] = useState({ data: [] });
    const [note, setNote] = useState({ data: [] });
    const [newNote, setNewNote] = useState({});
    const [newComment, setNewComment] = useState({})
    //Je récupère la valeur d'un commentaire et la set de façon séparé afin de l'effacer après l'envoi
    const [commentValue, setCommentValue] = useState('');


   

    //Les fetch initiaux
    useEffect(() => {

        fetch("//127.0.0.1:8000/serviceWeb_PHP/biere/" + id)
            .then(data => data.json())
            .then(data => {
                setBiere(data.data);
            })
        fetch("//127.0.0.1:8000/serviceWeb_PHP/biere/" + id + "/commentaire")
            .then(data => data.json())
            .then(data => {
                setCommentaires(data);
            })

        fetch("//127.0.0.1:8000/serviceWeb_PHP/biere/" + id + "/note")
            .then(data => data.json())
            .then(data => {
                setNote(data);
            })

    }, [])

    //Quelques inspiration pour le code suivant: 
    //https://beta.reactjs.org/learn/adding-interactivity
    //https://jasonwatmore.com/post/2020/11/02/react-fetch-http-put-request-examples
    //j'aimerais également remercier les dieux pour la révélation que le service web attendait le courriel et non l'id de l'utilisateur



    /**
     * Récupère l'évènement du onclick et récupère la note
     * @param {*} e 
     */
    function RecupererNote(e) {

        let noteValue = e.target.getAttribute("data-note")
        let newNote = {
            note: parseInt(noteValue),
            id_biere: parseInt(id),
            courriel: courriel
        }
        setNewNote(newNote);
    }

    //cette solution pour ne pas a avoir à cliquer deux fois pour updater la moyenne de des note lorsque je clique sur un étoiles m'a été fourni par chatgpt après plusieurs heures d'essai et erreur du genre (settimeout, loading= true, etc) 
    //Ce que ça fait c'est qu'a chaque fois que mon newNote change la fonction AjouterNote est déclenché.
    useEffect(() => {
        if (newNote.note) {
            AjouterNote();
        }
    }, [newNote]);

    /**
     * Ajoute la note avec un fetch put dans la db
     */
    function AjouterNote() {
        //https://jasonwatmore.com/post/2020/11/02/react-fetch-http-put-request-examples
        var entete = new Headers();
        entete.append("Content-Type", "application/json");
        entete.append("Authorization", "Basic " + btoa("biero:biero"));
        fetch("//127.0.0.1:8000/serviceWeb_PHP/biere/" + id + "/note", {
            method: "PUT",
            body: JSON.stringify(newNote),
            headers: entete
        })
            .then(reponse => reponse.json())
            .then(data => {
                //deuxième fetch pour mettre à jour la note affichée
                fetch("//127.0.0.1:8000/serviceWeb_PHP/biere/" + id + "/note")
                    .then(data => data.json())
                    .then(data => {
                        setNote(data);
                    });
            })

    };

    /**
     * Récupère l'évènement du onclick et récupère la note
     * @param {*} e 
     */
    function RecupererCommentaire(e) {

        let commentValue = e.target.value;

        setCommentValue(commentValue);
    }

  
     /**
     * Ajoute la note avec un fetch put dans la db
     */
    function AjouterCommentaire() {
        let newComment = {
            commentaire: commentValue,
            id_biere: parseInt(id),
            courriel: courriel
        }
        setNewComment(newComment);
        setCommentValue('');
        var entete = new Headers();
        entete.append("Content-Type", "application/json");
        entete.append("Authorization", "Basic " + btoa("biero:biero"));
        fetch("//127.0.0.1:8000/serviceWeb_PHP/biere/" + id + "/commentaire", {
            method: "PUT",
            body: JSON.stringify(newComment),
            headers: entete
        })
            .then(reponse => reponse.json())
            .then(data => {
                fetch("//127.0.0.1:8000/serviceWeb_PHP/biere/" + id + "/commentaire")
                    .then(data => data.json())
                    .then(data => {
                        setCommentaires(data);
                    });
            });
    }

     //**** Les Rendus *****//
    
     let votreCommentaire = "";
     let votreNote = "";
 
     //https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
     //https://stackoverflow.com/questions/37929825/how-to-access-data-attributes-from-event-object
     //Génère les étoiles pour donner une note
     let lesEtoiles = Array(5).fill().map((v, i) => {
         return (
             <span className="etoile" data-note={++i} onClick={(e) => { RecupererNote(e); }} >
                 ☆
             </span>
         );
     })
     
     //Génère la liste des commentaires
     let listeCommentaires = commentaires.data.map((unCommentaire, index) => {
         return (
             <div className="unCommentaire">
                 <p>
                     {unCommentaire.commentaire}
                 </p>
                 <small>
                     envoyé par: {unCommentaire.courriel}
                 </small>
             </div>
         );
     })
     
     //Si connecteé génère les zones pour entrer notes et commentaires 
     if (estConnecte) {
         votreNote = <div><p>Entrez votre note: {lesEtoiles}</p></div>;
         votreCommentaire =
             <div className="zone-comment">
                 <label>Entrez votre commentaires : </label>
                 <textarea name="commentaire" value={commentValue} onChange={(e) => { RecupererCommentaire(e); }} ></textarea>
                 <button className="btnSoumettre" onClick={() => { AjouterCommentaire() }}>Envoyer le commentaire</button>
             </div>;
     }

    //Merci chatgpt pour le parseFloat et le toFixed
    //Formate la note pour n'avoir que deux décimales
    let noteAffiche = parseFloat(note.data.note);
    noteAffiche = noteAffiche.toFixed(2);

    // Le rendu en tant que tel qui prend les zones créées plus haut
    return (
        <section className="detail">
            <h1>Details d'une bière</h1>
            <h2>{biere.nom}</h2>
            <div className="detail-desc">
                <div className="img-detail">
                    <img src={can} alt='image de cannette'></img>
                </div>
                <div className="desc-note">
                    <p>Note: {noteAffiche}</p>
                    {votreNote}
                    <p>{biere.description}</p>
                </div>
            </div>

            {votreCommentaire}
            <h3>Commentaires:</h3>
            {/* j'utilise reverse() ici pour inverser le display des commentaires afin de voir le dernier commentaire en premier */}
            {listeCommentaires.reverse()}

        </section>

    );

}