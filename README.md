# Tic-Tac-Toe with Weighted Symbols

## Project Structure

### Core Architecture
```
project/
├── game/
│   ├── logic/            # Core game rules and operations
│   │   ├── winConditions.js
│   │   ├── gameRules.js
│   │   ├── boardOperations.js
│   │   └── symbolManagement.js
│   ├── state/            # Game state management
│   │   └── gameState.js
│   └── ui/               # User interface components
│       ├── popupManager.js
│       ├── dragDropManager.js
│       └── resetManager.js
├── script.js             # Main application entry point
└── styles/               # All CSS files
```

### Detailed Module Documentation

#### Game Logic Modules
1. **winConditions.js**
   - Exports:
     - `winConditions`: Array of all possible winning combinations
     - `symbolWeights`: Array of weights for symbols [1,1,2,2,3,3]

2. **gameRules.js**
   - Functions:
     - `checkWin(cells)`: Determines if current board has a winner
     - `checkDraw(cells)`: Checks if game is a draw

3. **boardOperations.js**
   - Functions:
     - `initializeBoard(cells)`: Resets all board cells

4. **symbolManagement.js**
   - Functions:
     - `initializeSymbols()`: Sets up all draggable symbols with weights

#### State Management
1. **gameState.js**
   - Functions:
     - `createInitialState(cells, messageElement)`: Returns initial game state object

#### UI Modules
1. **popupManager.js**
   - Functions:
     - `showPopup(message)`: Displays temporary notification

2. **dragDropManager.js**
   - Functions:
     - `setupDragAndDrop(board, draggableImages, gameState)`: Handles all drag-drop logic

3. **resetManager.js**
   - Functions:
     - `setupResetButton(resetButton, gameState)`: Configures game reset functionality

### Data Flow
1. **Initialization**:
   - `script.js` → Creates state → Initializes board and symbols

2. **Gameplay**:
   - UI events → `dragDropManager` → Updates state → Checks win/draw

3. **Reset**:
   - Click event → `resetManager` → Reinitializes all components

### Key Improvements
- **Modular Architecture**: Separated concerns into logical modules
- **Single Responsibility**: Each file handles one specific aspect
- **Better Organization**: Grouped related files into directories
- **Clearer Dependencies**: Explicit imports between modules
- **Easier Maintenance**: Isolated changes to specific areas
