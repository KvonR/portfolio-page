import React, { useRef, useEffect } from 'react';
import './InteractiveParticles.css';

const InteractiveParticles = () => {
  const canvasRef = useRef(null);
  const mousePosition = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      // Ensure canvas dimensions are set based on its parent's dimensions
      // The parent needs to have explicit dimensions and position:relative
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      } else {
        // Fallback if parentElement is not available immediately
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      // DEBUG: Log mouse position
      // console.log('Mouse position:', mousePosition.current);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);
    
    class Particle {
      constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.originX = x;
        this.originY = y;
        this.radius = radius;
        this.color = color;
        this.density = Math.random() * 20 + 5; // How much it reacts to mouse
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        if (mousePosition.current.x !== null) {
          let dx = mousePosition.current.x - this.x;
          let dy = mousePosition.current.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let maxDistance = 100; // Max distance mouse will affect particles
          let force = (maxDistance - distance) / maxDistance;

          // DEBUG: Log particle update
          // if (distance < maxDistance) console.log('Particle reacting:', this.x, this.y);

          if (distance < maxDistance) {
            this.x -= forceDirectionX * force * this.density * 0.05; // Slower reaction
            this.y -= forceDirectionY * force * this.density * 0.05;
          } else {
            // Return to origin
            if (this.x !== this.originX) {
              let odx = this.originX - this.x;
              this.x += odx * 0.01; // Slow return
            }
            if (this.y !== this.originY) {
              let ody = this.originY - this.y;
              this.y += ody * 0.01; // Slow return
            }
          }
        }
        this.draw();
      }
    }

    function init() {
      resizeCanvas(); // Set initial canvas size
      particles = [];
      const particleCount = 80; // INCREASED particle count
      // Reverted particle colors and size for production
      const colors = ['rgba(0, 240, 255, 0.3)', 'rgba(255, 0, 255, 0.3)', 'rgba(100, 100, 255, 0.3)']; // REVERTED to subtle colors
      
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 1.5 + 0.5; // REVERTED to smaller particles
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, radius, color));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => particle.update());
      animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="interactive-particle-canvas"></canvas>;
};

export default InteractiveParticles;
