"use client";

import { useState } from "react";
import Slideshow from "./components/Slideshow";
import { projects } from "./data";

interface Project {
  title: string;
  role: string;
  src: string;
  link: string;
  description?: string;
  year?: string;
  location?: string;
  images?: string[];
}

export default function Home() {
  const [showIndex, setShowIndex] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  return (
    <main>
      {/* LAYER -2: The Project Image */}
      {showIndex && hoveredProject && (
        <div className="index-bg-preview">
          <img src={hoveredProject.src} alt="" />
        </div>
      )}

      {/* LAYER -1: The Blue Texture Overlay */}
      <div className="bg-overlay" />
      
      <div className="mobile-wrapper">
        {!showIndex && (
          <div className="top-left">
            <div style={{ marginBottom: "4px" }}>
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
        )}

        <div className="main-viewport">
          {!showIndex ? (
            <Slideshow data={projects} />
          ) : (
            <div className="index-overlay no-scrollbar">
              <div className="index-view-label">index</div>
              
              <a 
                href="#" 
                className="back-button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowIndex(false);
                  setHoveredProject(null); // Clear hover on exit
                }}
              >
                back
              </a>

              <div className="index-outer-grid">
                {projects.map((project, idx) => (
                  <div 
                    key={idx} 
                    className="index-project-entry"
                    onClick={() => window.open(project.link, "_blank")}
                    // HOVER LOGIC: Updates state on enter/leave
                    onMouseEnter={() => setHoveredProject(project)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
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

                    <div className="index-col col-3">
                      <div className="index-label text-right">Media</div>
                      <div className="media-filename-list">
                        <div className="media-filename">{project.src.split('/').pop()}</div>
                        {project.images?.slice(0, 4).map((img, i) => (
                          <div key={i} className="media-filename">{img.split('/').pop()}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* The bottom bar is visible in both states, but you can wrap it in !showIndex too if desired */}
        <div className="bottom-bar">
        {!showIndex && (
          <div className="contact-group">
            <a href="https://instagram.com/icantevendothat" target="_blank">@icantevendothat</a>
            <a href="mailto:annikasanthanam@gmail.com">annikasanthanam@gmail.com</a>
          </div>
        )}
        </div>
      </div>
    </main>
  );
}