import React,{useState} from "react";

export function RandomBackground() {
    const [bgSrc,setBg] = useState("https://source.unsplash.com/random");

    const changeBackground = () =>{
         setBg(`${bgSrc}?v=${Math.random() * 10}`);
    };
    
   return <img id="background" className="background blur animation loaded" src={bgSrc} alt="bg" onClick={changeBackground}></img>;
}
