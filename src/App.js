import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AboutMe from './pages/AboutMe';
import Experience from './pages/Experience';

function App() {
  return (
    <div className="App">
      <Header />
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
