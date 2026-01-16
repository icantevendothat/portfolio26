"use client";

import { useState } from "react";
import Slideshow from "./components/Slideshow";
import { projects } from "./data";

export default function Home() {
  const [showIndex, setShowIndex] = useState(false);

  return (
    <main>
      <div className="bg-overlay" />
      
      <div className="mobile-wrapper">
        <div className="top-left">
          <div style={{ marginBottom: "4px" }}>
            {}
            <a 
              href="#" 
              className="name-link"
              onClick={(e) => { e.preventDefault(); setShowIndex(false); }}
            >
              annika santhanam
            </a>
            <div style={{ opacity: 0.6 }}>art, design, technology, etc.</div>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column" }}>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setShowIndex(true); }}
            >
              index
            </a>
            <a href="https://annikasxyz-annikas-projects-9a017162.vercel.app/" target="_blank">archive</a>
          </div>
        </div>

        <div className="main-viewport">
          {!showIndex ? (
            <Slideshow data={projects} />
          ) : (
            <>
              {}
              <div className="index-placeholder">
                <img src="/000253110032.jpg" alt="Coming Soon" />
              </div>

              {}
              <div className="project-meta-center" style={{ bottom: '30px' }}>
                <div className="coming-soon-text">coming soon...</div>
              </div>
            </>
          )}
        </div>

        <div className="bottom-bar">
          <div className="contact-group">
            <a href="https://instagram.com/icantevendothat" target="_blank">@icantevendothat</a>
            <a href="mailto:annikasanthanam@gmail.com">annikasanthanam@gmail.com</a>
          </div>
        </div>
      </div>
    </main>
  );
}