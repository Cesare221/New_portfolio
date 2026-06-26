import { useRef, useEffect } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let frame = 0;
    const mouse = { x: null, y: null, radius: 150 };

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 1.5 + 0.8;
        this.baseX = this.x;
        this.baseY = this.y;
        this.velocityX = 0;
        this.velocityY = 0;
        this.opacity = Math.random() * 0.4 + 0.4;
        this.flickerSpeed = (Math.random() - 0.5) * 0.04;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(200, 220, 255, ${this.opacity})`;
        ctx.fill();
      }

      update() {
        // 1. Força de Repulsão do Mouse
        let dx_mouse = this.x - mouse.x;
        let dy_mouse = this.y - mouse.y;
        let distance_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
        let mouse_force_x = 0;
        let mouse_force_y = 0;

        if (distance_mouse < mouse.radius && mouse.x !== null) {
          const repulsionStrength = 1 - (distance_mouse / mouse.radius);
          mouse_force_x = (dx_mouse / distance_mouse) * repulsionStrength * 1.5;
          mouse_force_y = (dy_mouse / distance_mouse) * repulsionStrength * 1.5;
        }

        // 2. Força de Retorno à Base (Efeito Mola)
        const springStrength = 0.008;
        const return_force_x = (this.baseX - this.x) * springStrength;
        const return_force_y = (this.baseY - this.y) * springStrength;

        // 3. Força do Campo de Fluxo Orgânico (Simulação de Noise)
        const noiseStrength = 0.05;
        const angle = (Math.cos(this.x * 0.004) + Math.sin(this.y * 0.004) + frame * 0.005) * Math.PI;
        const noise_force_x = Math.cos(angle) * noiseStrength;
        const noise_force_y = Math.sin(angle) * noiseStrength;

        // Soma das forças para obter a aceleração
        this.velocityX += mouse_force_x + return_force_x + noise_force_x;
        this.velocityY += mouse_force_y + return_force_y + noise_force_y;

        // Aplicar atrito para suavizar o movimento
        this.velocityX *= 0.96;
        this.velocityY *= 0.96;

        // Atualizar a posição com base na velocidade
        this.x += this.velocityX;
        this.y += this.velocityY;
        
        // Efeito de cintilação
        this.opacity += this.flickerSpeed;
        if (this.opacity > 0.8 || this.opacity < 0.3) {
            this.flickerSpeed = -this.flickerSpeed;
        }

        this.draw();
      }
    }

    const init = () => {
      particles = [];
      const numberOfParticles = (canvas.height * canvas.width) / 11000;
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;
        particles.push(new Particle(x, y));
      }
    };
    
const connect = () => {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      let distance =
        ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x)) +
        ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));

      if (distance < (canvas.width / 8) * (canvas.height / 8)) {
        const lineOpacity = 1 - (distance / 25000);
        ctx.strokeStyle = `rgba(200, 220, 255, ${lineOpacity * 0.25})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particles[a].x, particles[a].y);
              ctx.lineTo(particles[b].x, particles[b].y);
              ctx.stroke();
            }
          }
        }
      };

    const animate = () => {
      frame++;
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      connect();
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    
    const handleMouseOut = () => {
        mouse.x = null;
        mouse.y = null;
    }
    
    const handleResize = () => {
      setCanvasSize();
      init();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('resize', handleResize);
    
    setCanvasSize();
    init();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas"></canvas>;
};

export default ParticleBackground;
