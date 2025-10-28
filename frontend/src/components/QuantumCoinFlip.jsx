import React, { useState } from 'react';
import './Card.css';

export default function QuantumCoinFlip({ onPointsEarned, isUnlocked }) {
  const [result, setResult] = useState('');
  const [flipping, setFlipping] = useState(false);
  const [showSuperposition, setShowSuperposition] = useState(true);
  const [flipCount, setFlipCount] = useState(0);
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [predictions, setPredictions] = useState({ correct: 0, total: 0 });
  const [nextPrediction, setNextPrediction] = useState('');

  const flipCoin = () => {
    setFlipping(true);
    setShowSuperposition(false);
    
    setTimeout(() => {
      const outcome = Math.random() < 0.5 ? 'heads' : 'tails';
      setResult(outcome);
      setFlipping(false);
      setFlipCount(prev => prev + 1);
      
      if (outcome === 'heads') setHeadsCount(prev => prev + 1);
      else setTailsCount(prev => prev + 1);
      
      // Check prediction
      if (nextPrediction) {
        if (nextPrediction === outcome) {
          setPredictions(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
          onPointsEarned(20);
          setStreak(prev => prev + 1);
        } else {
          setPredictions(prev => ({ ...prev, total: prev.total + 1 }));
          setStreak(0);
        }
        setNextPrediction('');
      } else {
        onPointsEarned(5);
      }
    }, 1000);
  };

  const resetToSuperposition = () => {
    setShowSuperposition(true);
    setResult('');
  };

  const accuracy = predictions.total > 0 
    ? Math.round((predictions.correct / predictions.total) * 100) 
    : 0;

  return (
    <div className="card quantum-card">
      <div className="card-header">
        <div className="header-left">
          <span className="card-icon">🪙</span>
          <div>
            <h2>Quantum Coin Flip</h2>
            <p className="card-subtitle">Superposition & Measurement</p>
          </div>
        </div>
        <div className="xp-badge">+5 XP per flip</div>
      </div>
      
      <div className="card-content">
        {/* Real Science Explanation */}
        <div className="science-box">
          <div className="science-header">
            <span className="science-icon">🔬</span>
            <strong>The Real Science</strong>
          </div>
          <p>In quantum mechanics, particles can exist in <strong>superposition</strong> - being in multiple states at once! Just like Schrödinger's famous cat being both alive AND dead, our quantum coin is both heads AND tails until you measure it.</p>
        </div>

        {/* Live Statistics */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-value">{flipCount}</div>
            <div className="stat-label">Total Flips</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-value">{flipCount > 0 ? Math.round((headsCount/flipCount)*100) : 50}%</div>
            <div className="stat-label">Heads Ratio</div>
          </div>
          <div className="stat-card highlight">
            <div className="stat-icon">🔥</div>
            <div className="stat-value">{streak}</div>
            <div className="stat-label">Prediction Streak</div>
          </div>
          {predictions.total > 0 && (
            <div className="stat-card">
              <div className="stat-icon">🎓</div>
              <div className="stat-value">{accuracy}%</div>
              <div className="stat-label">Accuracy</div>
            </div>
          )}
        </div>

        {/* Interactive Experiment */}
        <div className="experiment-area">
          <div className="coin-display">
            {showSuperposition && !flipping && !result && (
              <div className="superposition-state">
                <div className="quantum-coin">
                  <div className="coin-side heads">H</div>
                  <div className="coin-side tails">T</div>
                </div>
                <div className="superposition-equation">
                  |ψ⟩ = (|H⟩ + |T⟩) / √2
                </div>
                <p className="state-label">⚡ Superposition State</p>
              </div>
            )}
            
            {flipping && (
              <div className="flipping-state">
                <div className="coin-flip-animation">
                  <div className="coin-spinner">🪙</div>
                </div>
                <p className="state-label">📡 Measuring...</p>
                <div className="measurement-waves">
                  <div className="wave"></div>
                  <div className="wave"></div>
                  <div className="wave"></div>
                </div>
              </div>
            )}
            
            {result && !flipping && (
              <div className="result-state">
                <div className={`coin-result ${result}`}>
                  <div className="result-icon">
                    {result === 'heads' ? '👑' : '⚛️'}
                  </div>
                  <div className="result-text">{result.toUpperCase()}</div>
                  <div className="result-equation">
                    |ψ⟩ = |{result === 'heads' ? 'H' : 'T'}⟩
                  </div>
                </div>
                <p className="state-label">✅ Collapsed to {result}!</p>
                {nextPrediction && (
                  <div className={`prediction-result ${nextPrediction === result ? 'correct' : 'wrong'}`}>
                    {nextPrediction === result ? '🎯 Correct Prediction! +20 XP' : '❌ Wrong Prediction'}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Prediction Challenge */}
        {!flipping && !result && (
          <div className="prediction-box">
            <p className="prediction-label">🎯 Can you predict the outcome? (Extra points!)</p>
            <div className="prediction-buttons">
              <button 
                className={`pred-btn ${nextPrediction === 'heads' ? 'selected' : ''}`}
                onClick={() => setNextPrediction('heads')}
              >
                👑 Heads
              </button>
              <button 
                className={`pred-btn ${nextPrediction === 'tails' ? 'selected' : ''}`}
                onClick={() => setNextPrediction('tails')}
              >
                ⚛️ Tails
              </button>
            </div>
          </div>
        )}

        {/* Control Buttons */}
        <div className="button-group">
          <button 
            className="primary-btn"
            onClick={flipCoin}
            disabled={flipping}
          >
            {flipping ? '🔮 Measuring...' : '🎲 Flip Quantum Coin'}
          </button>
          {result && (
            <button 
              className="secondary-btn"
              onClick={resetToSuperposition}
            >
              🔄 Reset to Superposition
            </button>
          )}
        </div>

        {/* Key Insight */}
        <div className="insight-box">
          <div className="insight-icon">💡</div>
          <div className="insight-content">
            <strong>Key Insight:</strong>
            <p>Notice how the coin becomes "real" only when you measure it! Before measurement, it exists in both states simultaneously. This isn't just theory - real quantum computers use this property!</p>
          </div>
        </div>

        {/* Progress to next milestone */}
        {flipCount > 0 && (
          <div className="progress-section">
            <p className="progress-label">Progress to 100 flips milestone</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: `${(flipCount % 100)}%`}}></div>
            </div>
            <p className="progress-text">{100 - (flipCount % 100)} flips remaining</p>
          </div>
        )}
      </div>
    </div>
  );
}