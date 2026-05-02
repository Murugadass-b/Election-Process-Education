import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import './App.css';
import Timeline from './components/Timeline';
import AIGuide from './components/AIGuide';
import Passport from './components/Passport';

function App() {
  const [activeStepId, setActiveStepId] = useState(1);
  const [earnedStamps, setEarnedStamps] = useState([]);
  
  const electionSteps = [
    {
      id: 1,
      title: "Voter Registration & EPIC",
      date: "Continuous Update",
      description: "Citizens enroll on the electoral roll via Form 6 and get their Voter ID (EPIC). It's your fundamental right to ensure your name is listed.",
      icon: "clipboard-check"
    },
    {
      id: 2,
      title: "Election Announcement",
      date: "By ECI (Election Commission)",
      description: "The ECI announces polling dates. The Model Code of Conduct (MCC) kicks in. Citizens can use the cVIGIL app to report violations.",
      icon: "megaphone"
    },
    {
      id: 3,
      title: "Nominations & Campaigning",
      date: "Weeks before Polls",
      description: "Candidates file nominations and campaign. Citizens should research candidates' backgrounds (Know Your Candidate).",
      icon: "users"
    },
    {
      id: 4,
      title: "Voting Day (Polling Booth)",
      date: "Phase-wise Polling",
      description: "Go to your booth, verify ID, press the EVM button, and check the VVPAT slip to ensure your vote is correctly recorded.",
      icon: "vote"
    },
    {
      id: 5,
      title: "Counting & Results",
      date: "Counting Day",
      description: "EVMs are opened and votes are counted. The party with the majority in the Lok Sabha or Vidhan Sabha forms the government.",
      icon: "landmark"
    }
  ];

  const handleStepClick = (stepId) => {
    setActiveStepId(stepId);
  };

  const handleEarnStamp = (stepId) => {
    if (!earnedStamps.includes(stepId)) {
      setEarnedStamps([...earnedStamps, stepId]);
    }
  };

  const activeStep = electionSteps.find(s => s.id === activeStepId);

  return (
    <div className="app-container">
      {/* Background elements */}
      <div className="bg-glow primary-glow" />
      <div className="bg-glow secondary-glow" />

      <header className="app-header">
        <div className="logo-container">
          <Flame className="logo-icon" size={32} />
          <span className="logo-text">CivicSpark</span>
        </div>
        <Passport earnedStamps={earnedStamps} totalSteps={electionSteps.length} />
      </header>

      <main className="timeline-section">
        <div className="timeline-content">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="timeline-hero"
          >
            <h1 className="hero-title">
              Indian Democracy: Your Journey
            </h1>
            <p className="hero-subtitle">
              Explore the timeline of the Indian election process. Click on a node to learn your role as a citizen and earn stamps in your Voter Passport!
            </p>
          </motion.div>

          <Timeline 
            steps={electionSteps} 
            activeStepId={activeStepId} 
            onStepClick={handleStepClick}
            earnedStamps={earnedStamps}
          />
        </div>
      </main>

      <aside className="ai-section">
        <AIGuide 
          activeStep={activeStep} 
          onComplete={() => handleEarnStamp(activeStepId)}
          hasEarnedStamp={earnedStamps.includes(activeStepId)}
        />
      </aside>
    </div>
  );
}

export default App;
