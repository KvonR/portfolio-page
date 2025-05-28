import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import { Parallax } from 'react-scroll-parallax';
import { handleSmoothScroll } from '../utils/scrollUtils';

// Force load Orbitron font with white text and initial blue glow
const orbitronStyle = {
  fontFamily: "'Orbitron', sans-serif",
  color: '#FFFFFF',
  textShadow: '0 0 10px #00ccff, 0 0 20px #00ccff, 0 0 30px #00ccff'
};

const Home = () => {
  const canvasRef = useRef(null);
  const subtitleRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Effect for detecting mobile devices
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Effect for initializing the subtitle glow animation
  useEffect(() => {
    if (subtitleRef.current) {
      // Start the blue glow animation on component mount
      subtitleRef.current.animate([
        { textShadow: '0 0 10px #00ccff, 0 0 20px #00ccff, 0 0 30px #00ccff' },
        { textShadow: '0 0 15px #00ccff, 0 0 25px #00ccff, 0 0 35px #00ccff' },
        { textShadow: '0 0 10px #00ccff, 0 0 20px #00ccff, 0 0 30px #00ccff' }
      ], {
        duration: 2000,
        iterations: Infinity
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size based on device type
    const updateCanvasSize = () => {
      if (isMobile) {
        // On mobile, constrain canvas to home section only
        const homeSection = document.getElementById('home');
        if (homeSection) {
          canvas.width = homeSection.offsetWidth;
          canvas.height = homeSection.offsetHeight;
        }
      } else {
        // On desktop, use full viewport
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    updateCanvasSize();

    const particles = [];
    const colors = [ '#ff00ff', '#00ccff'];

    class Particle {
      constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = (Math.random() - 0.5) * 2;
        this.dy = (Math.random() - 0.5) * 2;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.closePath();
      }

      update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
          this.dx = -this.dx;
        }

        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
          this.dy = -this.dy;
        }

        this.draw();
      }
    }

    function initParticles() {
      // Reduce particle count on mobile for better performance
      const particleCount = isMobile ? 50 : 100;
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 3 + 2;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, radius, color));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => particle.update());
      requestAnimationFrame(animate);
    }

    initParticles();
    animate();

    const handleResize = () => {
      updateCanvasSize();
      particles.length = 0;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]); // Add isMobile as dependency

  return (
    <section id="home">
      <canvas ref={canvasRef} className="neon-canvas"></canvas>
      <div className="home-content">
        {isMobile ? (
          <h1 className="split-color-permanent mobile-title">
            <div className="title-line">
              <span className="blue-half">Building the Web<span className="period">.</span></span>
            </div>
            <div className="title-line">
              <span className="purple-half">One Line at a Time<span className="period">.</span></span>
            </div>
          </h1>
        ) : (
          <Parallax speed={-10}>
            <h1 
              className="split-color-permanent" 
            >
              <span className="blue-half">Building the Web<span className="period">.</span></span> 
              <span className="purple-half">One Line at a Time<span className="period">.</span></span>
            </h1>
          </Parallax>
        )}
        
        {isMobile ? (
          <p 
            ref={subtitleRef}
            className="subtitle-text" 
            style={orbitronStyle}
          >
            Hi, I'm Kev — a Web & Software Developer.
          </p>
        ) : (
          <Parallax speed={5}>
            <p 
              ref={subtitleRef}
              className="subtitle-text" 
              style={orbitronStyle}
              onMouseEnter={(e) => {
                // Apply purple glow on hover
                e.currentTarget.style.textShadow = '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff';
                // Start a pulsating animation
                e.currentTarget.animate([
                  { textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff' },
                  { textShadow: '0 0 15px #ff00ff, 0 0 25px #ff00ff, 0 0 35px #ff00ff' },
                  { textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff' }
                ], {
                  duration: 2000,
                  iterations: Infinity
                });
              }}
              onMouseLeave={(e) => {
                // Restore blue glow when not hovering
                e.currentTarget.style.textShadow = '0 0 10px #00ccff, 0 0 20px #00ccff, 0 0 30px #00ccff';
                // Clear any running animations
                e.currentTarget.getAnimations().forEach(anim => anim.cancel());
                // Start blue glow pulsating
                e.currentTarget.animate([
                  { textShadow: '0 0 10px #00ccff, 0 0 20px #00ccff, 0 0 30px #00ccff' },
                  { textShadow: '0 0 15px #00ccff, 0 0 25px #00ccff, 0 0 35px #00ccff' },
                  { textShadow: '0 0 10px #00ccff, 0 0 20px #00ccff, 0 0 30px #00ccff' }
                ], {
                  duration: 2000,
                  iterations: Infinity
                });
              }}
            >
              Hi, I'm Kev — a Web & Software Developer.
            </p>
          </Parallax>
        )}
      </div>
      
      {isMobile ? (
        <a href="#projects" className="btn" onClick={handleSmoothScroll}>View My Work</a>
      ) : (
        <Parallax speed={15} className="home-button-parallax-wrapper">
          <a href="#projects" className="btn" onClick={handleSmoothScroll}>View My Work</a>
        </Parallax>
      )}
    </section>
  );
};

export default Home;
