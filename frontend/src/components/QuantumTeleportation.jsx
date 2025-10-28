import React, { useState } from 'react';
import './Card.css';

export default function QuantumTeleportation({ onPointsEarned, isUnlocked }) {
  const [teleporting, setTeleporting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [successes, setSuccesses] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const attemptTeleport = () => {
    if (!isUnlocked || teleporting) return;
    
    setTeleporting(true);
    setSuccess(null);
    
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% success rate
      setSuccess(isSuccess);
      setTeleporting(false);
      setAttempts(prev => prev + 1);
      
      if (isSuccess) {
        setSuccesses(prev => prev + 1);
        setCurrentStreak(prev => {
          const newStreak = prev + 1;
          setBestStreak(current => Math.max(current, newStreak));
          return newStreak;
        });
        onPointsEarned(25);
      } else {
        setCurrentStreak(0);
      }
    }, 2000);
  };

  const resetStats = () => {
    setAttempts(0);
    setSuccesses(0);
    setCurrentStreak(0);
    setSuccess(null);
  };

  if (!isUnlocked) {
    return (
      <div className="card locked-card">
        <div className="card-header">
          <div className="header-left">
            <span className="card-icon">🔒</span>
            <div>
              <h2>Quantum Teleportation</h2>
              <p className="card-subtitle">Unlock at 500 points</p>
            </div>
          </div>
        </div>
        <div className="card-content">
          <div className="unlock-message">
            <p>🎯 Reach 500 points to unlock!</p>
            <p className="unlock-hint">Master the previous experiments to access quantum teleportation</p>
          </div>
        </div>
      </div>
    );
  }

  const successRate = attempts > 0 ? Math.round((successes / attempts) * 100) : 0;

  return (
    <div className="card teleport-card">
      <div className="card-header">
        <div className="header-left">
          <span className="card-icon">🚀</span>
          <div>
            <h2>Quantum Teleportation</h2>
            <p className="card-subtitle">Entanglement in Action</p>
          </div>
        </div>
        <div className="xp-badge">+25 XP per success</div>
      </div>
      
      <div className="card-content">
        <div className="science-box">
          <div className="science-header">
            <span className="science-icon">🔬</span>
            <strong>"Spooky Action at a Distance"</strong>
          </div>
          <p>Using <strong>quantum entanglement</strong>, we can teleport quantum information instantly! Two particles become "entangled" - they share a mysterious connection no matter how far apart they are. Einstein called this "spooky action at a distance" and didn't believe it was real. But experiments proved him wrong!</p>
        </div>

        <div className="stats-row">
          <div className="stat-card highlight">
            <div className="stat-icon">✅</div>
            <div className="stat-value">{successRate}%</div>
            <div className="stat-label">Success Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-value">{successes}/{attempts}</div>
            <div className="stat-label">Successful</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-value">{currentStreak}</div>
            <div className="stat-label">Current Streak</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-value">{bestStreak}</div>
            <div className="stat-label">Best Streak</div>
          </div>
        </div>

        <div className="teleport-visual">
          <div className="teleport-station">
            <div className="station source">
              <div className="station-label">📍 Station A (Earth)</div>
              <div className="qubit">⚛️</div>
              <div className="station-status">
                {teleporting ? 'Sending...' : 'Ready to Send'}
              </div>
            </div>
            
            {teleporting && (
              <div className="entanglement-beam">
                <div className="beam-particle">✨</div>
                <div className="beam-particle">✨</div>
                <div className="beam-particle">✨</div>
              </div>
            )}
            
            <div className="station destination">
              <div className="station-label">📍 Station B (Moon)</div>
              <div className="qubit">
                {teleporting ? '⏳' : success === true ? '⚛️' : success === false ? '❌' : '❓'}
              </div>
              <div className="station-status">
                {teleporting ? 'Receiving...' : success === true ? 'Success!' : success === false ? 'Failed!' : 'Waiting...'}
              </div>
            </div>
          </div>
        </div>

        <div className="button-group">
          <button 
            className="primary-btn"
            onClick={attemptTeleport}
            disabled={teleporting}
          >
            {teleporting ? '✨ Teleporting Quantum State...' : '🚀 Initiate Teleportation'}
          </button>
          {attempts > 0 && (
            <button 
              className="secondary-btn"
              onClick={resetStats}
            >
              🔄 Reset Statistics
            </button>
          )}
        </div>

        {success !== null && (
          <div className={`result-banner ${success ? 'success' : 'failure'}`}>
            <span className="result-icon">{success ? '🎉' : '⚠️'}</span>
            {success ? (
              <p>Quantum state successfully teleported using entanglement! The information traveled instantly between stations without physically moving through space!</p>
            ) : (
              <p>Entanglement was disrupted! Quantum states are extremely fragile - even tiny disturbances can break the connection. Try again!</p>
            )}
          </div>
        )}

        <div className="insight-box">
          <div className="insight-icon">💡</div>
          <div className="insight-content">
            <strong>How Does It Work?</strong>
            <p>We create two entangled particles at the start. One stays at Station A (Earth) and one goes to Station B (Moon). When we manipulate the particle at A, the entangled particle at B instantly changes state - even though they're 384,400 km apart! This is used in real quantum communication today!</p>
          </div>
        </div>

        {/* Progress */}
        {attempts > 0 && (
          <div className="progress-section">
            <p className="progress-label">Teleportation Mastery Progress</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: `${Math.min((successes / 50) * 100, 100)}%`}}></div>
            </div>
            <p className="progress-text">{Math.max(50 - successes, 0)} successful teleports until quantum master</p>
          </div>
        )}
      </div>
    </div>
  );
}