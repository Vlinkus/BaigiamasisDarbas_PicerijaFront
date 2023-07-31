//import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";

export default function RegisterPage() {
    const [agreement, setAgreement] = useState({
        text: "Susipažinau su \"Privatumo politika\" ir \"Svetainės naudojimosi taisyklėmis\" ir su jomis sutinku." ,
        agree: false
    });

    return (
        <>
        <p>Vartotojo vardas</p>
        <input type="text"/>
        <p>El. paštas</p>
        <input type="text"/>
        <p>Slaptažodis</p>
        <input type="password"/>
        <p>Pakartokite slaptažodį</p>
        <input type="password"/><br/>
        <input type="checkbox" ></input><br/>
        <input type="button" value="Registruotis"/>
        </>
    );
}