import React, { useEffect, useRef } from 'react';
import './Home.css';
import { Parallax } from 'react-scroll-parallax';

// Force load Orbitron font with white text and initial blue glow
const orbitronStyle = {
  fontFamily: "'Orbitron', sans-serif",
  color: '#FFFFFF',
  textShadow: '0 0 10px #00ccff, 0 0 20px #00ccff, 0 0 30px #00ccff'
};

const Home = () => {
  const canvasRef = useRef(null);
  const subtitleRef = useRef(null);

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
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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
      for (let i = 0; i < 100; i++) {
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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.length = 0;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="home">
      <canvas ref={canvasRef} className="neon-canvas"></canvas>
      <div className="home-content">
        <Parallax speed={-10}>
          <h1 
            className="glitch" 
            data-text="Building the Web. One Line at a Time."
            onMouseEnter={(e) => {
              // Split the text into the two sentences
              
              // Create the split effect with the first sentence blue and second sentence purple
              e.target.innerHTML = `
                <span class="blue-half">Building the Web.</span> 
                <span class="purple-half">One Line at a Time.</span>
              `;
              
              // Add glitch hover class
              e.target.classList.add('glitch-hover');
            }}
            onMouseLeave={(e) => {
              // Restore the original text
              e.target.innerHTML = 'Building the Web. One Line at a Time.';
              
              // Remove glitch hover class
              e.target.classList.remove('glitch-hover');
            }}
          >Building the Web. One Line at a Time.</h1>
        </Parallax>
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
      </div>
      <Parallax speed={15} className="home-button-parallax-wrapper">
        <a href="#projects" className="btn">View My Work</a>
      </Parallax>
    </section>
  );
};

export default Home;
