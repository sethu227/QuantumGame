import React, { useState, useEffect } from 'react';
import QuantumCoinFlip from './components/QuantumCoinFlip';
import DoubleSlitSimulator from './components/DoubleSlitSimulator';
import QuantumTeleportation from './components/QuantumTeleportation';
import './App.css';

export default function App() {
  const [totalPoints, setTotalPoints] = useState(0);
  const [globalLevel, setGlobalLevel] = useState(1);
  const [unlockedExperiments, setUnlockedExperiments] = useState(['coin']);

  useEffect(() => {
    // Unlock experiments based on points
    if (totalPoints >= 100 && !unlockedExperiments.includes('slit')) {
      setUnlockedExperiments(prev => [...prev, 'slit']);
      showNotification('🎉 Double Slit Experiment Unlocked!');
    }
    if (totalPoints >= 500 && !unlockedExperiments.includes('teleport')) {
      setUnlockedExperiments(prev => [...prev, 'teleport']);
      showNotification('🚀 Quantum Teleportation Unlocked!');
    }
    
    // Level up based on points
    const newLevel = Math.floor(totalPoints / 200) + 1;
    if (newLevel > globalLevel) {
      setGlobalLevel(newLevel);
      showNotification(`⭐ Level ${newLevel} Reached!`);
    }
  }, [totalPoints, globalLevel, unlockedExperiments]);

  const showNotification = (message) => {
    const notif = document.createElement('div');
    notif.className = 'global-notification';
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
  };

  return (
    <div className="app-container">
      {/* Enhanced Header */}
      <header className="hero-section">
        <div className="particles-bg"></div>
        <div className="hero-content">
          <div className="hero-icon">⚛️</div>
          <h1 className="hero-title">Quantum Playground</h1>
          <p className="hero-subtitle">Experience the Mind-Bending World of Quantum Physics!</p>
          <p className="hero-description">
            Real quantum experiments, simplified for you. Learn by doing, not just reading!
          </p>
          <div className="global-stats">
            <div className="global-stat">
              <span className="stat-emoji">⭐</span>
              <span className="stat-text">Level {globalLevel}</span>
            </div>
            <div className="global-stat">
              <span className="stat-emoji">💎</span>
              <span className="stat-text">{totalPoints} Points</span>
            </div>
            <div className="global-stat">
              <span className="stat-emoji">🔓</span>
              <span className="stat-text">{unlockedExperiments.length}/3 Unlocked</span>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <QuantumCoinFlip 
          onPointsEarned={(pts) => setTotalPoints(prev => prev + pts)}
          isUnlocked={true}
        />
        
        <DoubleSlitSimulator 
          onPointsEarned={(pts) => setTotalPoints(prev => prev + pts)}
          isUnlocked={unlockedExperiments.includes('slit')}
        />
        
        <QuantumTeleportation 
          onPointsEarned={(pts) => setTotalPoints(prev => prev + pts)}
          isUnlocked={unlockedExperiments.includes('teleport')}
        />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>🧪 Built for curious minds exploring quantum mechanics</p>
          <p className="footer-small">Made with ❤️ and quantum entanglement</p>
        </div>
      </footer>
    </div>
  );
}