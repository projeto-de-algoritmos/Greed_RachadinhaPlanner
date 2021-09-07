import React from "react";

import "./styles.css";

import imgFlavio from "../../assets/flavio.png";

export function Home() {
    return (
        <div className="home-page">
            <h1> Rachadinha Planner </h1>
            <p>
                A família de políticos Baldonaro tem uma mania peculiar de realizar um procedimento 
                vulgarmente conhecido como "rachadinha". Ignorantemente chamada de corrupção pelos 
                canhotos, trata-se apenas de um acordo entre a família e seus funcionários, no qual eles 
                retornam 80% de seu salário de servidor público para a família como forma de gratidão.
                Os Baldonaros, apesar de ousados, são espertinhos e expeculam um número máximo de funcionarios
                fantasmas (número de segurança) que podem rachar para evitar que a Polícia Federal peguem eles.
                Afim de otimizar seus ganhos com segurança, a Melícia, uma grande companheira 
                da família, sequestrou 2 alunos de Engenharia de Software para ajudar nesse 
                problema. E esse foi o resultado.
            </p>
            <a href="/simulacao">CONTINUAR</a>
            <img
                src={imgFlavio}
                alt="Flávio Rachadinha"
                className="flavio"
            />
        </div>
    );
}