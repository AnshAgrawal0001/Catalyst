'use client';
import React, { useEffect, useRef } from 'react';

interface EmberParticle {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  color: string;
  sparkle: boolean;
  flickerIntensity: number;
}

const GameOfThronesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to full window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Ember particle creation and management
    const createEmber = (width: number, height: number): EmberParticle => {
      const isSparkle = Math.random() < 0.2; // 20% chance of being a sparkle

      return {
        x: Math.random() * width,
        y: -10,
        radius: isSparkle 
          ? Math.random() * 1.5 + 0.5  // Smaller for sparkles
          : Math.random() * 2.5 + 1,   // Slightly larger for embers
        speed: isSparkle 
          ? Math.random() * 3 + 1.5    // Faster for sparkles
          : Math.random() * 2 + 1,     // Slower for embers
        opacity: isSparkle 
          ? Math.random() * 0.6 + 0.4  // More varied opacity for sparkles
          : Math.random() * 0.5 + 0.5, // More consistent for embers
        color: isSparkle 
          ? 'rgba(255, 220, 100, '     // Bright, golden sparkle color
          : `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 50 + 50)}, 0, `,
        sparkle: isSparkle,
        flickerIntensity: Math.random() * 0.3 + 0.7,
      };
    };

    let embers: EmberParticle[] = [];

    const animate = () => {
      if (!canvas || !ctx) return;

      // Transparent canvas to reveal the background image
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new embers
      if (embers.length < 150) {
        embers.push(createEmber(canvas.width, canvas.height));
      }

      // Update and draw embers
      embers.forEach((ember, index) => {
        // Movement
        ember.y += ember.speed;
        ember.x += Math.sin(ember.y * 0.1) * 0.3;

        // Drawing
        ctx.beginPath();

        // Flicker effect
        const currentOpacity = ember.sparkle 
          ? ember.opacity * (Math.sin(Date.now() * 0.01) * 0.3 + 0.7)
          : ember.opacity;

        ctx.globalAlpha = currentOpacity;

        // Radial gradient for soft glow
        const gradient = ctx.createRadialGradient(
          ember.x, ember.y, 0, 
          ember.x, ember.y, ember.radius
        );
        gradient.addColorStop(0, ember.color + currentOpacity + ')');
        gradient.addColorStop(1, ember.color + '0)');

        ctx.fillStyle = gradient;
        ctx.arc(ember.x, ember.y, ember.radius, 0, Math.PI * 2);
        ctx.fill();

        // Remove particles off screen
        if (ember.y > canvas.height) {
          embers.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    // Initial setup
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Background Image with Gradient Shadow */}
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-2]">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-gradient-to-b from-[rgba(20,0,0,1)] to-[rgba(40,0,0,0.9)]"
          style={{
            backgroundImage: "url('/bgimg1.jpg')", // Replace with your image path
            backgroundBlendMode: "multiply", // Blend the gradient with the image
          }}
        />
      </div>
      {/* Canvas for Embers */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full z-[-1] pointer-events-none"
      />
    </div>
  );
};

export default GameOfThronesBackground;
