import { useEffect, useRef } from "react";

interface WaveformComponentProps {
  type: "ai" | "human";
  isActive: boolean;
  color: string;
}

export const WaveformComponent = ({ type, isActive, color }: WaveformComponentProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const wavePoints = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize wave points
    const initializeWave = () => {
      wavePoints.current = Array.from({ length: 100 }, () => Math.random() * 0.1);
    };

    initializeWave();

    const drawWaveform = (timestamp: number) => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Generate color based on type
      const gradientColor = type === "ai" 
        ? getComputedStyle(document.documentElement).getPropertyValue('--fork-blue').trim()
        : getComputedStyle(document.documentElement).getPropertyValue('--fork-teal').trim();

      const [h, s, l] = gradientColor.split(' ').map(v => v.replace(/[^\d.]/g, ''));

      if (isActive) {
        // Update wave points with more dynamic movement
        wavePoints.current = wavePoints.current.map((point, index) => {
          const baseAmplitude = type === "ai" ? 0.6 : 0.4;
          const variance = type === "ai" ? 0.3 : 0.5;
          const frequency = type === "ai" ? 0.02 : 0.015;
          
          return baseAmplitude + Math.sin(timestamp * frequency + index * 0.1) * variance * Math.random();
        });
      } else {
        // Gradually reduce amplitude when inactive
        wavePoints.current = wavePoints.current.map(point => point * 0.95);
      }

      // Draw waveform
      ctx.strokeStyle = `hsl(${h}, ${s}%, ${l}%)`;
      ctx.lineWidth = 2;
      ctx.beginPath();

      const centerY = height / 2;
      const pointWidth = width / wavePoints.current.length;

      wavePoints.current.forEach((amplitude, index) => {
        const x = index * pointWidth;
        const y = centerY + (amplitude * (height / 2 - 10)) * (Math.random() > 0.5 ? 1 : -1);

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      // Add glow effect for active state
      if (isActive) {
        ctx.shadowColor = `hsl(${h}, ${s}%, ${l}%)`;
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Draw volume indicators
      if (type === "ai") {
        drawVolumeIndicators(ctx, width, height, isActive, `hsl(${h}, ${s}%, ${l}%)`);
      }

      animationRef.current = requestAnimationFrame(drawWaveform);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(drawWaveform);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, type, color]);

  const drawVolumeIndicators = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number, 
    active: boolean, 
    color: string
  ) => {
    const indicatorCount = 20;
    const indicatorWidth = 2;
    const indicatorSpacing = 3;
    const maxHeight = height * 0.8;
    
    for (let i = 0; i < indicatorCount; i++) {
      const x = 20 + i * (indicatorWidth + indicatorSpacing);
      const intensity = active ? Math.random() * 0.8 + 0.2 : Math.random() * 0.1;
      const indicatorHeight = maxHeight * intensity;
      const y = (height - indicatorHeight) / 2;
      
      ctx.fillStyle = active ? color : `${color}40`;
      ctx.fillRect(x, y, indicatorWidth, indicatorHeight);
    }
  };

  return (
    <div className="relative w-full h-full">
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: 'crisp-edges' }}
      />
      
      {/* Volume level text */}
      <div className="absolute top-2 left-2 text-xs text-muted-foreground font-mono">
        {isActive ? (type === "ai" ? "AI: 85%" : "Human: 72%") : "Muted"}
      </div>
      
      {/* Frequency indicator */}
      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground font-mono">
        {isActive ? "44.1kHz" : "0kHz"}
      </div>
    </div>
  );
};