import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Projects from './pages/Projects'; // Updated path
import Skills from './pages/Skills'; // Updated path
import Contact from './pages/Contact'; // Updated path
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
