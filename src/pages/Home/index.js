import React from "react";

import "./styles.css";

import imgFlavio from "../../assets/flavio.png";

export function Home() {
    return (
        <div>
            <img
                src={imgFlavio}
                alt="Flávio Rachadinha"
                className="flavio"
            />
        </div>
    );
}