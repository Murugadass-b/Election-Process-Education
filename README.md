# CivicSpark: The Voter's Passport (Indian Election Focus)

## Vertical
Election Process Education

## Approach and Logic
CivicSpark moves away from static information delivery and text-heavy chatbots. The approach is deeply rooted in **experiential learning and gamification**. 

The logic is simple: users are more likely to retain complex civic information if they are actively participating in the learning process. The application utilizes a split-screen design:
1. **The Visual Timeline:** A dynamic, interactive representation of the Indian election cycle (Lok Sabha / Vidhan Sabha).
2. **The AI Civic Guide:** Powered by Google's Gemini API, this guide provides contextual, bite-sized information about EVMs, VVPATs, and the Election Commission of India (ECI) as the user navigates the timeline.

## How the Solution Works
1. **Interactive Journey:** Users start at the beginning of the election cycle (Voter Registration & EPIC) on the timeline.
2. **Contextual Education:** Clicking a node on the timeline prompts the AI Civic Guide. Instead of dumping a wall of text, the AI explains the process conversationally, emphasizing the **role of the common citizen**.
3. **Gamified Progress (Voter's Passport):** As users successfully interact with and complete modules for each step of the timeline, they earn a digital "stamp" in their Voter's Passport.
4. **Google Services Integration:** The core intelligence is driven by the **Google Gemini API**, which dynamically generates educational content, answers specific user queries about the Indian democratic process, and acts as the conversational interface.

## Assumptions Made
* **Target Audience:** The user is a newly eligible Indian voter or a citizen looking to understand their role in the democratic process (like using the cVIGIL app or understanding KYC for candidates). They are comfortable with modern web interfaces.
* **Generalization:** The information presented focuses on the general election process (Lok Sabha) in India.
* **API Availability:** The Google Gemini API is available and responsive for generating dynamic content.

## Development Focus Areas (Hackathon Criteria)
* **Code Quality:** Built with React/Vite using strict modularity and clean, vanilla CSS.
* **Security:** API keys secured via environment variables; strict sanitization of AI outputs to prevent XSS.
* **Efficiency:** Optimized React state management and hardware-accelerated CSS animations.
* **Testing:** Component functionality validated via manual testing and UI verification.
* **Accessibility:** Semantic HTML, ARIA attributes for timeline nodes, and high-contrast, readable typography.
* **Google Services:** Meaningful integration of Google Gemini API as the core educational engine.
