import { motion } from 'framer-motion';
import { 
  ClipboardCheck, Users, Flag, 
  Megaphone, Vote, Landmark 
} from 'lucide-react';
import './Timeline.css';

const IconMap = {
  'clipboard-check': ClipboardCheck,
  'users': Users,
  'flag': Flag,
  'megaphone': Megaphone,
  'vote': Vote,
  'landmark': Landmark
};

const Timeline = ({ steps, activeStepId, onStepClick, earnedStamps }) => {
  return (
    <div className="timeline-container">
      <div className="timeline-line"></div>
      
      <div className="timeline-nodes">
        {steps.map((step, index) => {
          const isActive = step.id === activeStepId;
          const isEarned = earnedStamps.includes(step.id);
          const Icon = IconMap[step.icon];
          const isLeft = index % 2 === 0;

          return (
            <motion.div 
              key={step.id}
              className={`timeline-node-wrapper ${isLeft ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div 
                className={`timeline-card glass-panel ${isActive ? 'active' : ''} ${isEarned ? 'earned' : ''}`}
                onClick={() => onStepClick(step.id)}
              >
                <div className="card-header">
                  <div className={`icon-container ${isActive ? 'pulse' : ''}`}>
                    {Icon && <Icon size={24} />}
                  </div>
                  <div className="date-badge">{step.date}</div>
                </div>
                
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
                
                {isActive && (
                  <motion.div 
                    className="active-indicator"
                    layoutId="activeIndicator"
                  />
                )}
              </div>
              
              <div className={`timeline-connector ${isActive ? 'active' : ''} ${isEarned ? 'earned' : ''}`}>
                <div className="connector-dot"></div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
