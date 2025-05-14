import React from 'react';
import './App.css';
import './components/SectionHeaders.css'; // Import shared section header styles
import Header from './components/Header';
import Home from './pages/Home';
import Projects from './pages/Projects'; // Updated path
import Skills from './pages/Skills'; // Updated path
import Contact from './pages/Contact'; // Updated path
import Footer from './components/Footer';
import AboutMe from './pages/AboutMe';
import Experience from './pages/Experience';
import GlitchHeaders from './components/GlitchHeaders'; // Import the glitch effect component

function App() {
  return (
    <div className="App">
      <Header />
      <GlitchHeaders /> {/* This adds the glitch effect to all section headers */}
      <main>
        <Home />
        <Experience />
        <Projects />
        <Skills />
        <AboutMe />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
