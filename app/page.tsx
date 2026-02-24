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
        <div className="index-overlay no-scrollbar">
          {/* Page Header elements */}
          <div className="index-view-label">index</div>
          
          <a 
            href="#" 
            className="back-button"
            onClick={(e) => {
              e.preventDefault();
              setShowIndex(false);
            }}
          >
            back
          </a>

          <div className="index-outer-grid">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className="index-project-entry"
              onClick={() => window.open(project.link, "_blank")} // Optional: makes the whole block a link
            >
              {/* COLUMN 1: INDEX, ROLE, YEAR/LOCATION */}
              <div className="index-col col-1">
                <div className="index-number">({String(idx + 1).padStart(3, '0')})</div>
                <div className="index-group mt-auto">
                  <div className="index-value role-text">{project.role}</div>
                  <div className="index-group" style={{ marginTop: '20px' }}>
                    <div className="index-value year-text">{project.year || "2026"}</div>
                    <div className="index-value location-text">{project.location || "Global"}</div>
                  </div>
                </div>
              </div>

              {/* COLUMN 2: TITLE (TOP) & DESCRIPTION (BOTTOM) */}
              <div className="index-col col-2">
                <div className="index-group">
                  <div className="index-value project-title-top">{project.title}</div>
                </div>
                <div className="index-group mt-auto">
                  <div className="index-value description-text">
                    {project.description || "Project description goes here."}
                  </div>
                </div>
              </div>

              {/* COLUMN 3: MEDIA LIST */}
              <div className="index-col col-3">
                <div className="index-label text-right">Media</div>
                <div className="media-filename-list">
                  <div className="media-filename">{project.src.split('/').pop()}</div>
                  {project.images?.slice(0, 4).map((img, i) => (
                    <div key={i} className="media-filename">{img.split('/').pop()}</div>
                  ))}
                  {project.media && (
                    <div className="media-filename">{project.media.split('/').pop()}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
</div>
        </div>
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