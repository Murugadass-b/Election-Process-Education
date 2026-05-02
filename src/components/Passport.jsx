import { motion } from 'framer-motion';
import { Award, CheckCircle } from 'lucide-react';
import './Passport.css';

const Passport = ({ earnedStamps, totalSteps }) => {
  const progress = (earnedStamps.length / totalSteps) * 100;

  return (
    <div className="passport-container glass-panel">
      <div className="passport-header">
        <Award className="passport-icon" size={24} />
        <div className="passport-title">
          <span className="passport-label">Voter Passport</span>
          <span className="passport-count">{earnedStamps.length} / {totalSteps} Stamps</span>
        </div>
      </div>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="stamps-grid">
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const isEarned = earnedStamps.includes(idx + 1);
          return (
            <motion.div 
              key={idx}
              className={`stamp-slot ${isEarned ? 'earned' : 'empty'}`}
              initial={false}
              animate={{ 
                scale: isEarned ? [1, 1.2, 1] : 1,
                rotate: isEarned ? [0, -10, 10, 0] : 0
              }}
              transition={{ duration: 0.5 }}
            >
              {isEarned ? (
                <CheckCircle size={16} weight="bold" />
              ) : (
                <span className="dot"></span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Passport;
