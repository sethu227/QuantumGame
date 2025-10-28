import React, { useState, useEffect, useRef } from 'react';
import './Card.css';

export default function DoubleSlitSimulator({ onPointsEarned, isUnlocked }) {
  const [particlesFired, setParticlesFired] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const canvasRef = useRef(null);
  const [detectionPattern, setDetectionPattern] = useState([]);
  const [observerActive, setObserverActive] = useState(false);

  useEffect(() => {
    if (!isUnlocked) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    animateExperiment(ctx, canvas.width, canvas.height);
  }, [observerActive, detectionPattern, isUnlocked]);

  const animateExperiment = (ctx, width, height) => {
    ctx.clearRect(0, 0, width, height);
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#f8f9fa');
    gradient.addColorStop(1, '#e9ecef');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Particle Source at top
    ctx.fillStyle = '#667eea';
    ctx.beginPath();
    ctx.arc(width / 2, 40, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#764ba2';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Source label
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('⚛️ PARTICLE SOURCE', width / 2, 85);
    
    // Barrier with slits in the middle
    const barrierY = height / 2 - 50;
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(50, barrierY, width - 100, 20);
    
    // Slits configuration
    const slitWidth = 40;
    const slitGap = 90;
    const centerX = width / 2;
    
    // Left slit
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(centerX - slitGap - slitWidth/2, barrierY - 5, slitWidth, 30);
    
    // Right slit
    ctx.fillRect(centerX + slitGap - slitWidth/2, barrierY - 5, slitWidth, 30);
    
    // Slit borders (highlight)
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 3;
    ctx.strokeRect(centerX - slitGap - slitWidth/2, barrierY - 5, slitWidth, 30);
    ctx.strokeRect(centerX + slitGap - slitWidth/2, barrierY - 5, slitWidth, 30);
    
    // Slit labels
    ctx.fillStyle = '#3498db';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('SLIT A', centerX - slitGap, barrierY - 15);
    ctx.fillText('SLIT B', centerX + slitGap, barrierY - 15);
    
    // Observer eyes (if active)
    if (observerActive) {
      ctx.font = '30px Arial';
      ctx.fillText('👁️', centerX - slitGap - 70, barrierY + 15);
      ctx.fillText('👁️', centerX + slitGap + 70, barrierY + 15);
      
      ctx.fillStyle = '#e74c3c';
      ctx.font = 'bold 11px Arial';
      ctx.fillText('WATCHING', centerX - slitGap - 70, barrierY + 40);
      ctx.fillText('WATCHING', centerX + slitGap + 70, barrierY + 40);
    }
    
    // Detection Screen at bottom
    const screenY = height - 100;
    ctx.fillStyle = '#34495e';
    ctx.fillRect(50, screenY, width - 100, 10);
    
    // Screen glow effect
    const screenGradient = ctx.createLinearGradient(0, screenY - 40, 0, screenY);
    screenGradient.addColorStop(0, 'rgba(236, 240, 241, 0)');
    screenGradient.addColorStop(1, 'rgba(236, 240, 241, 0.8)');
    ctx.fillStyle = screenGradient;
    ctx.fillRect(50, screenY - 40, width - 100, 40);
    
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('📊 DETECTION SCREEN', width / 2, screenY + 35);

    // Draw pattern based on observer state
    if (!observerActive) {
      drawInterferencePattern(ctx, width, screenY);
    } else {
      drawTwoBandPattern(ctx, width, screenY, slitGap);
    }
    
    // Draw accumulated detection dots
    detectionPattern.forEach((point, i) => {
      const alpha = Math.max(0.2, 1 - i / 150);
      ctx.fillStyle = `rgba(102, 126, 234, ${alpha})`;
      ctx.beginPath();
      ctx.arc(point.x, screenY - 5, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const drawInterferencePattern = (ctx, width, screenY) => {
    // Wave interference pattern - multiple bands
    for (let x = 50; x < width - 50; x += 3) {
      const distFromCenter = Math.abs(x - width/2);
      // Cosine squared gives interference pattern
      const intensity = Math.pow(Math.abs(Math.cos(distFromCenter / 45)), 2);
      
      if (intensity > 0.15) {
        ctx.fillStyle = `rgba(52, 152, 219, ${intensity * 0.7})`;
        ctx.fillRect(x, screenY - 45, 3, 40);
      }
    }
  };

  const drawTwoBandPattern = (ctx, width, screenY, slitGap) => {
    // Two distinct bands when observed - particle behavior
    const centerX = width / 2;
    const bandWidth = 70;
    
    // Left band (from left slit)
    const leftGradient = ctx.createRadialGradient(
      centerX - slitGap, screenY - 20, 0, 
      centerX - slitGap, screenY - 20, bandWidth
    );
    leftGradient.addColorStop(0, 'rgba(231, 76, 60, 0.7)');
    leftGradient.addColorStop(1, 'rgba(231, 76, 60, 0)');
    ctx.fillStyle = leftGradient;
    ctx.fillRect(centerX - slitGap - bandWidth, screenY - 45, bandWidth * 2, 40);
    
    // Right band (from right slit)
    const rightGradient = ctx.createRadialGradient(
      centerX + slitGap, screenY - 20, 0, 
      centerX + slitGap, screenY - 20, bandWidth
    );
    rightGradient.addColorStop(0, 'rgba(231, 76, 60, 0.7)');
    rightGradient.addColorStop(1, 'rgba(231, 76, 60, 0)');
    ctx.fillStyle = rightGradient;
    ctx.fillRect(centerX + slitGap - bandWidth, screenY - 45, bandWidth * 2, 40);
  };

  const fireParticles = () => {
    if (!isUnlocked || isRunning) return;
    
    setIsRunning(true);
    const canvas = canvasRef.current;
    const centerX = canvas.width / 2;
    const slitGap = 90;
    
    // Fire 10 particles with delays
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        let x;
        
        if (observerActive) {
          // OBSERVED: Particles go through one slit or the other (particle behavior)
          const throughLeft = Math.random() < 0.5;
          const slitX = throughLeft ? centerX - slitGap : centerX + slitGap;
          x = slitX + (Math.random() - 0.5) * 70; // Small spread around slit
        } else {
          // UNOBSERVED: Quantum interference pattern (wave behavior)
          const distFromCenter = (Math.random() - 0.5) * 400;
          const probability = Math.pow(Math.abs(Math.cos(Math.abs(distFromCenter) / 45)), 2);
          
          // Higher probability where interference is constructive
          if (Math.random() < probability + 0.2) {
            x = centerX + distFromCenter;
          } else {
            x = centerX + (Math.random() - 0.5) * 300;
          }
        }
        
        // Add detection point
        setDetectionPattern(prev => [...prev.slice(-100), { x, y: canvas.height - 100 }]);
        setParticlesFired(prev => prev + 1);
        onPointsEarned(2);
      }, i * 150);
    }
    
    setTimeout(() => setIsRunning(false), 1600);
  };

  const clearPattern = () => {
    setDetectionPattern([]);
    setParticlesFired(0);
  };

  const toggleObserver = (checked) => {
    setObserverActive(checked);
    setDetectionPattern([]); // Clear pattern when toggling observer
  };

  if (!isUnlocked) {
    return (
      <div className="card locked-card">
        <div className="card-header">
          <div className="header-left">
            <span className="card-icon">🔒</span>
            <div>
              <h2>Double Slit Experiment</h2>
              <p className="card-subtitle">Unlock at 100 points</p>
            </div>
          </div>
        </div>
        <div className="card-content">
          <div className="unlock-message">
            <p>🎯 Reach 100 points to unlock!</p>
            <p className="unlock-hint">Keep experimenting with the quantum coin to unlock this mind-bending experiment</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card experiment-card">
      <div className="card-header">
        <div className="header-left">
          <span className="card-icon">🌊</span>
          <div>
            <h2>Double Slit Experiment</h2>
            <p className="card-subtitle">Wave-Particle Duality</p>
          </div>
        </div>
        <div className="xp-badge">+2 XP per particle</div>
      </div>
      
      <div className="card-content">
        {/* Scientific Explanation */}
        <div className="science-box">
          <div className="science-header">
            <span className="science-icon">🔬</span>
            <strong>The Most Beautiful Experiment in Physics</strong>
          </div>
          <p>
            This experiment proves that electrons behave like <strong>waves AND particles</strong>! 
            When not observed, they create an interference pattern (like water waves overlapping). 
            But when we watch which slit they go through, they suddenly act like particles and 
            create just TWO bands! This shows that observation changes reality at the quantum level.
          </p>
        </div>

        {/* Statistics Row */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-icon">🚀</div>
            <div className="stat-value">{particlesFired}</div>
            <div className="stat-label">Particles Fired</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-value">{detectionPattern.length}</div>
            <div className="stat-label">Detections</div>
          </div>
          <div className="stat-card highlight">
            <div className="stat-icon">{observerActive ? '👁️' : '🌊'}</div>
            <div className="stat-value">{observerActive ? 'Particle' : 'Wave'}</div>
            <div className="stat-label">Current Mode</div>
          </div>
        </div>

        {/* Observer Toggle Control */}
        <div className="observer-control">
          <label className="toggle-label">
            <input 
              type="checkbox" 
              checked={observerActive}
              onChange={(e) => toggleObserver(e.target.checked)}
            />
            <span className="toggle-slider"></span>
            <span className="toggle-text">
              {observerActive 
                ? '👁️ Observer ON - Watching which slit particles go through!' 
                : '🌊 Observer OFF - Not watching, let quantum weirdness happen'}
            </span>
          </label>
        </div>

        {/* Experiment Canvas */}
        <canvas 
          ref={canvasRef}
          width={700}
          height={500}
          className="experiment-canvas"
        />

        {/* Control Buttons */}
        <div className="button-group">
          <button 
            className="primary-btn"
            onClick={fireParticles}
            disabled={isRunning}
          >
            {isRunning ? '⚡ Firing Particles...' : '🚀 Fire 10 Particles'}
          </button>
          <button 
            className="secondary-btn"
            onClick={clearPattern}
          >
            🔄 Clear Pattern
          </button>
        </div>

        {/* Educational Insight Box */}
        <div className="insight-box">
          <div className="insight-icon">💡</div>
          <div className="insight-content">
            <strong>Try This Experiment:</strong>
            <p>
              <strong>Step 1:</strong> Turn OFF the observer and fire 50+ particles - you'll see 
              multiple bands forming an interference pattern (wave behavior). 
              <strong>Step 2:</strong> Clear the pattern, turn ON the observer, and fire again - 
              watch how the pattern changes to just TWO bands directly behind the slits (particle behavior)! 
              The particles literally "know" they're being watched and change their behavior!
            </p>
          </div>
        </div>

        {/* Progress Tracker */}
        {particlesFired > 0 && (
          <div className="progress-section">
            <p className="progress-label">Experiment Progress</p>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{width: `${Math.min((particlesFired / 100) * 100, 100)}%`}}
              ></div>
            </div>
            <p className="progress-text">
              {Math.max(100 - particlesFired, 0)} particles until milestone
            </p>
          </div>
        )}
      </div>
    </div>
  );
}