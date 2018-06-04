import React from 'react';
import {Jumbotron} from 'react-bootstrap';

const Landing = () => {
    return (
        <Jumbotron>
            <h2 align="center">International Union<br/>BigBall</h2>
            <p align="center"><img src="/assets/bola.png" /></p>
            <p align="center">Bem vindo, Diversão garantida com os amigos</p>
            <p align="center">Leia as regras e efetue login</p>
        </Jumbotron>
    );
};

export default Landing;