import React, { useState } from 'react';
import './style.css'
import MotivationImage from "./images/00.Motivation.png"
import ObjectiveImage from "./images/01.Objective.png"
import Phase1Image from "./images/02.Phase1.png"
import TurnImage from "./images/03.Turn.png"
import GLImage1 from "./images/04.Guideline00.png"
import GLImage2 from "./images/05.Guideline01.png"
import InstructionsImage from "./images/06.Instructions.png"
import example1Image from "./images/07.example1.png"
import example2Image from "./images/08.example2.png"
import example3Image from "./images/09.example3.png"
import example4Image from "./images/10.example4.png"
import finalImage from "./images/11.final.png"

export default function GuidelinesNavigator({ onComplete }) {
  const [pageIndex, setPageIndex] = useState(0);

  const pages = [
    {
      title: "",
      content: (
        <div style={{ textAlign: 'center',padding: '20px',}}>
          <h2 style={{ fontSize: '1.8em', color: '#003366', marginBottom: '20px'}}></h2>
          <img 
            src={MotivationImage} 
            alt="Survey Motivation" 
            style={{
              width: '80%',         // adjust as needed (e.g., 100% for full width)
              maxWidth: '1500px',    // cap the max size
              margin: '0 auto',     // ensure horizontal center fallback
              display: 'block'
            }}
          />
        </div>
      ),
    },
    {
      title: "",
      content: (
        <div style={{ textAlign: 'center',padding: '20px',}}>
          <h2 style={{ fontSize: '1.8em', color: '#003366', marginBottom: '20px'}}></h2>
          <img 
            src={ObjectiveImage} 
            alt="Survey Objective" 
            style={{
              width: '80%',         // adjust as needed (e.g., 100% for full width)
              maxWidth: '1500px',    // cap the max size
              margin: '0 auto',     // ensure horizontal center fallback
              display: 'block'
            }}
          />
        </div>
      ),
    },
    {
      title: "",
      content: (
        <div style={{ textAlign: 'center',padding: '20px',}}>
          <h2 style={{ fontSize: '1.8em', color: '#003366', marginBottom: '20px'}}></h2>
          <img 
            src={Phase1Image} 
            alt="Survey Phase 1" 
            style={{
              width: '80%',         // adjust as needed (e.g., 100% for full width)
              maxWidth: '1500px',    // cap the max size
              margin: '0 auto',     // ensure horizontal center fallback
              display: 'block'
            }}
          />
        </div>
      ),
    },
    {
    title: "",
    content: (
      <div style={{ textAlign: 'center',padding: '20px',}}>
        <h2 style={{ fontSize: '1.8em', color: '#003366', marginBottom: '20px'}}></h2>
        <img 
          src={TurnImage} 
          alt="Survey Turn" 
          style={{
            width: '80%',         // adjust as needed (e.g., 100% for full width)
            maxWidth: '1500px',    // cap the max size
            margin: '0 auto',     // ensure horizontal center fallback
            display: 'block'
          }}
        />
      </div>
    ),
  },
  {
    title: "",
    content: (
      <div style={{ textAlign: 'center',padding: '20px',}}>
        <h2 style={{ fontSize: '1.8em', color: '#003366', marginBottom: '20px'}}></h2>
        <img 
          src={GLImage1} 
          alt="Survey Guideline" 
          style={{
            width: '80%',         // adjust as needed (e.g., 100% for full width)
            maxWidth: '1500px',    // cap the max size
            margin: '0 auto',     // ensure horizontal center fallback
            display: 'block'
          }}
        />
      </div>
    ),
  },
  {
    title: "",
    content: (
      <div style={{ textAlign: 'center',padding: '20px',}}>
        <h2 style={{ fontSize: '1.8em', color: '#003366', marginBottom: '20px'}}></h2>
        <img 
          src={GLImage2} 
          alt="Survey Guideline" 
          style={{
            width: '80%',         // adjust as needed (e.g., 100% for full width)
            maxWidth: '1500px',    // cap the max size
            margin: '0 auto',     // ensure horizontal center fallback
            display: 'block'
          }}
        />
      </div>
    ),
  },
  {
    title: "",
    content: (
      <div style={{ textAlign: 'center',padding: '20px',}}>
        <h2 style={{ fontSize: '1.8em', color: '#003366', marginBottom: '20px'}}></h2>
        <img 
          src={InstructionsImage} 
          alt="Survey Guideline" 
          style={{
            width: '80%',         // adjust as needed (e.g., 100% for full width)
            maxWidth: '1500px',    // cap the max size
            margin: '0 auto',     // ensure horizontal center fallback
            display: 'block'
          }}
        />
      </div>
      ),
    },
    {
      title: "",
      content: (
        <div style={{ textAlign: 'center',padding: '20px',}}>
          <h2 style={{ fontSize: '1.8em', color: '#003366', marginBottom: '20px'}}></h2>
          <img 
            src={example1Image} 
            alt="Survey Guideline" 
            style={{
              width: '80%',         // adjust as needed (e.g., 100% for full width)
              maxWidth: '1500px',    // cap the max size
              margin: '0 auto',     // ensure horizontal center fallback
              display: 'block'
            }}
          />
        </div>
        ),
    },
    {
      title: "",
      content: (
        <div style={{ textAlign: 'center',padding: '20px',}}>
          <h2 style={{ fontSize: '1.8em', color: '#003366', marginBottom: '20px'}}></h2>
          <img 
            src={example2Image} 
            alt="Survey Guideline" 
            style={{
              width: '80%',         // adjust as needed (e.g., 100% for full width)
              maxWidth: '1500px',    // cap the max size
              margin: '0 auto',     // ensure horizontal center fallback
              display: 'block'
            }}
          />
        </div>
        ),
    },
    {
      title: "",
      content: (
        <div style={{ textAlign: 'center',padding: '20px',}}>
          <h2 style={{ fontSize: '1.8em', color: '#003366', marginBottom: '20px'}}></h2>
          <img 
            src={example3Image} 
            alt="Survey Guideline" 
            style={{
              width: '80%',         // adjust as needed (e.g., 100% for full width)
              maxWidth: '1500px',    // cap the max size
              margin: '0 auto',     // ensure horizontal center fallback
              display: 'block'
            }}
          />
        </div>
        ),
    },
    {
      title: "",
      content: (
        <div style={{ textAlign: 'center',padding: '20px',}}>
          <h2 style={{ fontSize: '1.8em', color: '#003366', marginBottom: '20px'}}></h2>
          <img 
            src={example4Image} 
            alt="Survey Guideline" 
            style={{
              width: '80%',         // adjust as needed (e.g., 100% for full width)
              maxWidth: '1500px',    // cap the max size
              margin: '0 auto',     // ensure horizontal center fallback
              display: 'block'
            }}
          />
        </div>
        ),
    },
    {
      title: "",
      content: (
        <div style={{ textAlign: 'center',padding: '20px',}}>
          <h2 style={{ fontSize: '1.8em', color: '#003366', marginBottom: '20px'}}></h2>
          <img 
            src={finalImage} 
            alt="Survey Guideline" 
            style={{
              width: '80%',         // adjust as needed (e.g., 100% for full width)
              maxWidth: '1500px',    // cap the max size
              margin: '0 auto',     // ensure horizontal center fallback
              display: 'block'
            }}
          />
        </div>
        ),
    },
  ];

  const nextPage = () => {
    if (pageIndex < pages.length - 1) setPageIndex(pageIndex + 1);
    else onComplete();
  };

  const prevPage = () => {
    if (pageIndex > 0) setPageIndex(pageIndex - 1);
  };

  return (
    <div>
      <h1>{pages[pageIndex].title}</h1>
      <div>{pages[pageIndex].content}</div>
      <div className="button-container mt-4 flex justify-between">
        <button onClick={prevPage} disabled={pageIndex === 0} className="button button-back">
          Back
        </button>
        <button onClick={nextPage} className="button button-next">
          {pageIndex === pages.length - 1 ? "Sample Task" : "Next"}
        </button>
      </div>
    </div>
  );
}
