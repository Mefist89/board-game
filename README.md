# Board Game

An interactive educational board game built with React and TypeScript that combines traditional board game mechanics with educational content in mathematics, chemistry, biology, physics, geography, and computer science.

## 🎮 Game Overview

Board Game is an educational board game designed for students in grades 10-12. Players roll dice, move across a colorful game board, and answer questions from various academic subjects to advance. The game aims to make learning engaging and fun while reinforcing important academic concepts.

### 🎯 Goal of the Game
Reach the finish line by correctly answering questions from multiple academic subjects. Players must strategically move across the board, answering questions correctly to progress while managing their attempts to maximize their score.

### 🎲 Gameplay Mechanics
- **Movement**: Roll dice to determine how many spaces to move
- **Questions**: Answer questions from math, chemistry, biology, physics, geography, and computer science
- **Scoring**: Earn points based on attempts (1st: 100 points, 2nd: 50 points, 3rd: 25 points)
- **Progression**: Correct answers advance your position; incorrect answers may send you back

### 🕹️ Controls
- Click the "ROLL DICE" button to roll virtual dice
- Select answers from multiple-choice options
- Navigate between game screens using menu buttons

## 🛠️ Technology Stack

### Frontend Framework
- **React 19.1.1**: Component-based UI library for building interactive user interfaces
- **TypeScript**: Strongly-typed JavaScript for improved code quality and maintainability
- **Vite**: Fast build tool and development server

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **CSS Modules**: Scoped styling for components

### Icons & UI Components
- **Lucide React**: Beautiful, accessible icons for React applications

### Development Tools
- **ESLint**: Code linting and quality assurance
- **TypeScript ESLint**: TypeScript-specific linting rules
- **PostCSS**: CSS processing toolchain

### State Management
- **React Context API**: Global state management for game state and user data

## 📋 System Requirements

### Development Environment
- **Node.js**: Version 18.x or higher
- **npm** or **yarn**: Package manager
- **Git**: Version control system

### Browser Support
- Modern browsers with ES6+ support (Chrome, Firefox, Safari, Edge)

### Recommended System Specifications
- **RAM**: 4GB minimum, 8GB+ recommended
- **Storage**: 50MB available space
- **CPU**: Modern processor with good JavaScript performance

## 🚀 Getting Started

### Installation

1. **Clone the repository** (if available):
```bash
git clone <repository-url>
cd math-board-game
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm run dev
```

4. **Open your browser** and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

This will create a `dist` folder with optimized files ready for deployment.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## 🎨 Game Features

### Multi-Language Support
- **Russian (Русский)**: Native support for Russian-speaking students
- **Romanian (Română)**: Native support for Romanian-speaking students

### Educational Content
- **Mathematics**: Trigonometry, calculus, algebra, and more
- **Chemistry**: Chemical formulas, reactions, and properties
- **Biology**: Cell biology, genetics, and organism systems
- **Physics**: Mechanics, thermodynamics, and electromagnetism
- **Geography**: World geography, physical geography, and maps
- **Computer Science**: Programming concepts, networking, and hardware

### Visual Game Board
- Colorful 55-square game board with a labyrinth-style path
- Visual player token that moves based on dice rolls
- START and FINISH markers for clear game progression

### Adaptive Learning
- Question difficulty varies across subjects
- Multiple attempts allowed with decreasing point values
- Game history tracking to monitor progress

## 🎮 How to Play

1. **Start the Game**: Click "PLAY" from the main menu
2. **Roll Dice**: Click the "ROLL DICE" button to move your token
3. **Answer Questions**: After moving, you'll be presented with a multiple-choice question
4. **Earn Points**: Answer correctly to advance and earn points
5. **Reach the Finish**: First player to reach the final square wins

### Scoring System
- **1st attempt**: 100 points for correct answer
- **2nd attempt**: 50 points for correct answer
- **3rd attempt**: 25 points for correct answer
- Incorrect answers after 3 attempts result in no advancement

## 🖼️ Game Screenshots

The game includes several screens:
- **Menu Screen**: Start, How to Play, Creator, and Language options
- **Game Board**: Visual representation of the board with player token
- **Question Screen**: Multiple-choice questions from various subjects
- **Score Panel**: Real-time display of score, rolls, and attempts
- **Results Screen**: Final score and game completion statistics

## 🔧 Development

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── DiceRoll.tsx      # Dice rolling functionality
│   ├── GameBoard.tsx     # Visual game board
│   ├── Question.tsx      # Question display and interaction
│   ├── ScorePanel.tsx    # Score tracking display
│   └── UserInfoForm.tsx  # User information collection
├── context/              # React Context for state management
│   └── GameContext.tsx   # Global game state and logic
├── pages/                # Main game screens
│   ├── CreatorPage.tsx   # Creator information
│   ├── GamePage.tsx      # Main gameplay screen
│   ├── HowToPlayPage.tsx # Instructions page
│   ├── MenuPage.tsx      # Main menu
│   └── ResultsPage.tsx   # Game results screen
├── utils/                # Utility functions
│   └── googleSheetsAPI.ts # Google Sheets integration
├── questions.json        # Question database
└── App.tsx               # Main application component
```

### Customization
The game can be easily customized by:
- Adding new questions to `src/questions.json`
- Modifying the game board path in `src/components/GameBoard.tsx`
- Adjusting the scoring system in `src/context/GameContext.tsx`
- Adding new languages to the translation system

## 📊 Educational Impact

This game was specifically created to help students in grades 10-12 learn and reinforce concepts in:
- Mathematics (trigonometry, calculus, algebra)
- Chemistry (chemical formulas, reactions, properties)
- Biology (cell biology, genetics, systems)
- Physics (mechanics, thermodynamics, electromagnetism)
- Geography (world geography, physical features)
- Computer Science (programming, networking, hardware)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Known Issues

- Mobile responsiveness may need further optimization for smaller screens
- Game history tracking could be enhanced with more detailed analytics

## 🚧 Future Enhancements

- Multiplayer functionality
- More question categories and subjects
- Enhanced statistics and progress tracking
- Additional difficulty levels
- Sound effects and animations
- Leaderboard system
- Customizable game boards
