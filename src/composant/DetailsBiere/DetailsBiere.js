import "./DetailsBiere.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailsBiere({ estConnecte, courriel }) {

    // console.log(estConnecte, courriel)
    const { id } = useParams();
    //const params = useParams();
    //console.log(id, params)
    const [biere, setBiere] = useState({});
    const [commentaires, setCommentaires] = useState({ data: [] });
    const [note, setNote] = useState({ data: [] });


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

    const [newNote, setNewNote] = useState({})

    /**
     * Récupère l'évènement du onclick et récupère la note
     * @param {*} e 
     */
    function RecupererNote(e) {

        let noteValue = e.target.getAttribute("data-note")
        console.log(noteValue);
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

                console.log("sent", data);
                //TO DO: ameliorer la vitesse du fetch, pour l'instant je dois appuyer deux fois pour que ca update
                //deuxième fetch pour mettre à jour la note affichée
                fetch("//127.0.0.1:8000/serviceWeb_PHP/biere/" + id + "/note")
                    .then(data => data.json())
                    .then(data => {
                        setNote(data);
                    });
            })

    };



    //https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
    //https://stackoverflow.com/questions/37929825/how-to-access-data-attributes-from-event-object
    let lesEtoiles = Array(5).fill().map((v, i) => {
        return (
            <span className="etoile" data-note={++i} onClick={(e) => {  RecupererNote(e); }} >
                ☆
            </span>
        );
    })

    let listeCommentaires = commentaires.data.map((unCommentaire, index) => {
        return (
            <p>
                {unCommentaire.commentaire};
            </p>
        );
    })

    const [newComment, setNewComment] = useState({})

    /**
     * Récupère l'évènement du onclick et récupère la note
     * @param {*} e 
     */
    function RecupererCommentaire(e) {

        let commentValue = e.target.value;
        console.log(commentValue);
        let newComment = {
            commentaire: commentValue,
            id_biere: parseInt(id),
            courriel: courriel
        }
        setNewComment(newComment);
    }

    let votreCommentaire = "";
    let votreNote = "";
    if (estConnecte) {
        votreNote = <div><p>Entrez votre note: {lesEtoiles}</p></div>;
        votreCommentaire =<div><label>Entrez votre commentaires : </label> <textarea name="commentaire" onChange={(e) => {  RecupererCommentaire(e); }} ></textarea><button className="btnSoumettre" onClick={() =>{AjouterCommentaire()}}>Envoyer le commentaire</button></div>;
    }

    function AjouterCommentaire() {
       
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
                console.log('sent commentaire', data);
            });
    }

    //Merci chatgpt pour le parseFloat et le toFixed
    //Formate la note pour n'avoir que deux décimales
    let noteAffiche = parseFloat(note.data.note);
    noteAffiche = noteAffiche.toFixed(2);


    return (
        <section>
            <h1>Details d'une bière</h1>
            <h2>{biere.nom}</h2>
            <p>Note: {noteAffiche}</p>
            {votreNote}
            <p>{biere.description}</p>
            {votreCommentaire}
            <h3>Commentaires:</h3>
            {listeCommentaires}
        </section>

    );

}