import React, { useEffect } from 'react';
import './App.css';
import './components/SectionHeaders.css'; // Import shared section header styles
import './styles/scrollReveal.css'; // Import scroll reveal animations
import Header from './components/Header';
import Home from './pages/Home';
import Projects from './pages/Projects'; // Updated path
import Skills from './pages/Skills'; // Updated path
import Contact from './pages/Contact'; // Updated path
import Footer from './components/Footer';
import AboutMe from './pages/AboutMe';
import Experience from './pages/Experience';
import GlitchHeaders from './components/GlitchHeaders'; // Import the glitch effect component
import MobileSplitHeaders from './components/MobileSplitHeaders'; // Import mobile split-color headers
import BackToTop from './components/BackToTop'; // Import back to top button
import BackToTopSection from './components/BackToTopSection'; // Import the back to top section
import { setupScrollRevealAnimations } from './utils/scrollReveal';
import { ParallaxProvider } from 'react-scroll-parallax';

function App() {
  // Set up scroll reveal animations
  useEffect(() => {
    setupScrollRevealAnimations();
  }, []);

  return (
    <ParallaxProvider>
      <div className="App">
        <Header />
        <GlitchHeaders /> {/* This adds the glitch effect to all section headers */}
        <MobileSplitHeaders /> {/* This adds mobile split-color effect to section headers */}
        <main>
          <Home />
          <Experience />
          <Projects />
          <Skills />
          <AboutMe />
          <Contact />
        </main>
        <BackToTopSection />
        <Footer />
        <BackToTop />
      </div>
    </ParallaxProvider>
  );
}

export default App;
