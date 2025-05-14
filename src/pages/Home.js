import React, { useEffect, useRef } from 'react';
import './Home.css';
import { Parallax } from 'react-scroll-parallax';

const Home = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#00ffcc', '#ff00ff', '#00ccff'];

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
          <h1>Building the Web. One Line at a Time.</h1>
        </Parallax>
        <Parallax speed={5}>
          <p>Hi, I'm Kev — a Web & Software Developer.</p>
        </Parallax>
      </div>
      <Parallax speed={15} className="home-button-parallax-wrapper">
        <a href="#projects" className="btn">View My Work</a>
      </Parallax>
    </section>
  );
};

export default Home;
