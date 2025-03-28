# Tic-Tac-Toe with Weighted Symbols - Repository Context

## Project Overview
- **Game Type**: Advanced Tic-Tac-Toe with weighted symbols
- **Key Features**:
  - Drag-and-drop gameplay
  - Weighted symbols (values 1-3 for each player)
  - Responsive design
  - Popup notification system
  - State management
  - Modern UI styling

## Technical Stack
- **Frontend**: 
  - HTML5, CSS3, JavaScript (ES Modules)
  - Vite build tool
- **Architecture**: Modular component-based design

## Project Structure
```
├── assets/
│   └── images/              # Symbol images (X/O)
├── game/                    # Core game logic
│   ├── logic/               # Game rules and operations
│   │   ├── winConditions.js
│   │   ├── gameRules.js
│   │   ├── boardOperations.js
│   │   └── symbolManagement.js
│   ├── state/               # Game state handlers
│   │   └── gameState.js
│   └── ui/                  # Interface components
│       ├── popupManager.js
│       ├── dragDropManager.js
│       └── resetManager.js
├── styles/                  # CSS modules
│   ├── base.css
│   ├── symbols.css
│   ├── board.css
│   ├── buttons.css
│   └── popups.css
├── utils/                   # Utility functions
│   └── consoleToPopup.js
├── index.html               # Main entry point
├── script.js                # Application bootstrap
├── style.css                # Global styles
├── vite.config.js           # Build configuration
└── config.js                # Game configuration
```

## Core Components Documentation

### 🎮 Game Logic
1. **symbolManagement.js**
   - Manages symbol weighting system (1-3 values)
   - Handles symbol initialization and state tracking

2. **winConditions.js**
   - Defines 8 possible win conditions
   - Contains symbol weights array [1,1,2,2,3,3]

3. **gameRules.js**
   - `checkWin()`: Weighted win detection
   - `checkDraw()`: Board state evaluation

4. **boardOperations.js**
   - Handles board initialization/reset
   - Manages cell state tracking

### 🖥️ UI Components
1. **dragDropManager.js**
   - Implements drag-and-drop for symbols
   - Handles drop validation

2. **popupManager.js**
   - Notification system with animations
   - Supports multiple concurrent popups

3. **resetManager.js**
   - Full game reset capability
   - Maintains symbol weighting

### ♟️ Game State
- **gameState.js**
  - Tracks:
    - Current player turn
    - Move history
    - Win/draw state
    - Active symbols
  - Provides state reset functionality

## Key Implementation Details

### 🧩 Modular Architecture
- Strict separation of concerns:
  - Logic (game rules)
  - State (game data)
  - UI (presentation layer)

### ♿ Accessibility Features
- Visual feedback for all actions
- Responsive design down to 600px width
- Clear state indicators

### 🔄 Data Flow
1. **Initialization**:
   - `script.js` → Creates state → Loads components

2. **Gameplay**:
   - UI events → State updates → Rule checks

3. **Reset**:
   - Preserves symbol weights
   - Fully reinitializes board

## Configuration
- **Symbols**: Configured in HTML (data-weight attributes)
- **Styles**: Split into logical CSS modules
- **Build**: Vite with ES Module support

## Technical Constraints
- **Browser Support**: Modern browsers (ES6+)
- **Performance**: Optimized for 60fps animations
- **State**: Pure JavaScript management

## Design Principles
- **Single Responsibility**: Each file handles one aspect
- **Reusability**: Components are independently usable
- **Testability**: Isolated logical units

## External Dependencies
- **Build Tool**: Vite v5
- **Polyfills**: None (modern JS only)
- **Assets**: SVG symbol images

## Maintenance Notes
- CSS uses BEM-like naming convention
- JS uses ES Module imports/exports
- State mutations are centralized
