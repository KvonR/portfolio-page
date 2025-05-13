import React from 'react';
import './Home.css';

const Home = () => {
  // State to control the animation trigger
  const [animate, setAnimate] = React.useState(false);

  React.useEffect(() => {
    // Trigger the animation shortly after the component mounts
    // This delay ensures that the initial state (pre-animation) is rendered first,
    // allowing the CSS transition to occur.
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100); // 100ms delay, adjust as needed

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <section id="home">
      {/*
        The `home-content-animated` class will be added when `animate` is true.
        You'll need to define the styles for this effect in your './Home.css' file.
        For example, for a fade-in effect:

        In Home.css:
        .home-content {
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        .home-content.home-content-animated {
          opacity: 1;
        }

        Or for a slide-in effect:
        .home-content {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
        }
        .home-content.home-content-animated {
          opacity: 1;
          transform: translateY(0);
        }
      */}
      <div className={`home-content ${animate ? 'home-content-animated' : ''}`}>
        <h1>Creative Web Solutions</h1>
        <p className={animate ? 'typewriter-animated' : ''}>Hi, I'm Kev R, a Web & Software Developer.</p>
      </div>
      <a href="#projects" className="btn">View My Work</a>
    </section>
  );
};

export default Home;
