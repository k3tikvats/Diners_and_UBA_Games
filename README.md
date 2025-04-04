# Diner's and UBA Games

This repository contains a web-based implementation of two game theory-based games: Diner's Game and Unique Bid Auction (UBA). These games test players' strategic thinking and decision-making skills in competitive environments.

## 🎮 Game Descriptions

### Diner's Game

**Storyline:**  
It's the weekend. You are bored at home, and don't have anything to do, when an idea strikes you. Recently a new restaurant has opened in your neighborhood, so you decide to go for dinner with your friends. But being a game theorist, you decide to do something new.

**Rules:**
- Each player places an order in the range ₹0 - ₹250 (in multiples of 10)
- The total bill is split equally among all players (everyone pays the average)
- A player's score is the difference between their individual bill and the amount they paid
- The player with the highest individual bill must pay a tip equal to half of their bill, which is deducted from their score
- In case of multiple highest bills, all those players must pay the tip
- The game consists of 3 rounds
- No communication is allowed between opponents during rounds

### Unique Bid Auction (UBA)

**Rules:**
- Each team bids three integers between 1 and 30 (inclusive)
- Prize money is awarded based on bid uniqueness (a bid no other player made)
- Highest unique bid wins ₹50,000
- Lowest unique bid wins ₹25,000
- A fee of ₹(1000 × average of team's three bids) is deducted from prize money
- If a team has both highest and lowest unique bids, they receive both prizes but the fee is deducted only once
- Teams without highest/lowest unique bids neither gain nor lose
- The auction consists of 3 rounds
- If all bids are non-unique, the round is repeated
- No communication is allowed between opponents during rounds

## 🛠️ Technology Stack

This project is built using:
- React (with JSX)
- Firebase (for database and authentication)
- Tailwind CSS (for styling)
- Vite (as the build tool)
- Shadcn UI components

## 📁 Project Structure

```
└── k3tikvats-diners_and_uba_games/
    ├── README.md
    ├── components.json
    ├── eslint.config.js
    ├── firebaseConfig.js
    ├── index.html
    ├── jsconfig.json
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vercel.json
    ├── vite.config.js
    ├── public/
    └── src/
        ├── App.css
        ├── App.jsx
        ├── firebaseDB.js
        ├── index.css
        ├── main.jsx
        ├── assets/
        │   └── images/
        ├── components/
        │   ├── DinersFinalScreen.jsx
        │   ├── DinersScoreScreen.jsx
        │   ├── FinalScreen.jsx
        │   ├── GameDashboard.jsx
        │   ├── Login.jsx
        │   ├── MainScreen.jsx
        │   ├── QueueScreen.jsx
        │   ├── UbaFinalScreen.jsx
        │   ├── UbaFrequencyScreen.jsx
        │   ├── UbaScoreScreen.jsx
        │   └── ui/
        │       ├── card.tsx
        │       ├── navigation-menu.tsx
        │       └── table.tsx
        └── lib/
            ├── finalScore.js
            ├── firebase.js
            ├── roundScores.js
            └── utils.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account (for database functionality)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/k3tikvats-diners_and_uba_games.git
cd k3tikvats-diners_and_uba_games
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure Firebase:
   - Create a Firebase project
   - Update the `firebaseConfig.js` file with your Firebase credentials

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 🌐 Deployment

This project is configured for deployment on Vercel. The `vercel.json` file provides the necessary configuration.

To deploy to Vercel:
1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` from the project directory and follow the prompts

## 🔧 Game Components

### Diner's Game
- `DinersScoreScreen.jsx`: Displays scores after each round
- `DinersFinalScreen.jsx`: Shows final results after all rounds

### UBA Game
- `UbaFrequencyScreen.jsx`: Shows frequency of bids
- `UbaScoreScreen.jsx`: Displays scores after each round
- `UbaFinalScreen.jsx`: Shows final results after all rounds

### Shared Components
- `GameDashboard.jsx`: Main game interface
- `Login.jsx`: Authentication screen
- `MainScreen.jsx`: Game selection interface
- `QueueScreen.jsx`: Waiting lobby for players
- `FinalScreen.jsx`: Combined final results

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

Game rules based on the concepts provided by IGTS-DTU.

---






