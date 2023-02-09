import "./Details.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Details({estConnecte, courriel}){
    console.log(estConnecte, courriel)
    const {id} = useParams();
    //const params = useParams();
    //console.log(id, params)
    const [produit, setProduit] = useState({});
    const [commentaires, setCommentaires] = useState({data : {}});
    const [note, setNote] = useState({data : {}});



    useEffect(()=>{
        fetch("//127.0.0.1:8000/webservice/php/biere/"+id)
            .then(data=>data.json())
            .then(data=>{
                console.log(data);
                setProduit(data.data);
                console.log(produit)
            })
        //fetch() // Commentaires sur la bière
        // Fetch() // La note...
    }, [])

    let message = "";
    if(estConnecte){
        message = <p>Connecté avec : {courriel}</p>
    }
    
    return (
        <section>
            <h1>Details d'une bière</h1>
            <h2>{produit.nom}</h2>
            <p>{produit.description}</p>
            {message}
        </section>

    );

}