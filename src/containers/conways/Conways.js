import React, { useEffect, useRef , useState } from 'react';
import { ConwaysInfo } from '../../portfolio';
import './conways.scss';
import {board} from '../conways_script/board'







export default function Conways() {
   const [canvasInstance, setCanvas] = useState(null)
  
  useEffect(() => {
    setCanvas(new board());

  }, []);

  

  const handleClick = (event) => {
    const canvas = event.target;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left; 
    const y = event.clientY - rect.top; 
    
    if (!canvasInstance.running)
      setInterval(() => {
        canvasInstance.updateGame()
      }, 600);
    canvasInstance.onClick(x,y)
  };

  if (ConwaysInfo.display) {
    return (
      <div className="conways-section" >
        <h1 className="conways-heading">Conway's Game of Life</h1>
        <h3> one of my first projects was to build a version conways game of life where different color mix with one another. </h3>
        <h3> here's a quick demo: click to start the game and to add tiles  </h3>

        <div className="conways-container">
          <canvas  width="500" height="500" onClick={handleClick} id = 'canvas' ref={canvasInstance} >Click me </canvas>
        </div>
      </div>
    );
  }
}
