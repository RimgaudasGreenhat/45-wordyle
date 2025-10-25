import { useEffect } from 'react';
import '../components/Keyboard.css';

const KEYBOARD_ROWS = [
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L'],
    ['Enter','Z','X','C','V','B','N','M','Backspace'],
];

function Keyboard({ isGameOver, keyboardStates, onKeyPress }) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!isGameOver) {
                const key = event.key;

                if (key === 'Enter' || key === 'Backspace' || /^[a-z]$/.test(key)){
                
                event.preventDefault();
                onKeyPress(key.toUpperCase());
                }
            }
        };
    
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    })
    const handleClick = (key) => {
        if (!isGameOver) {
            onKeyPress(key.toUpperCase());
        }  
    };
    return (
        <div className="keyboard">
            {KEYBOARD_ROWS.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className="keyboard-row">
                        {row.map((key) => {
                         const state = key.length === 1 ? keyboardStates[key.toLowerCase()] : ''  

                            return(
                                <button key={key} onClick={() => handleClick(key)} className={`keyboard-key ${key === 'Backspace' || key === 'Enter' ? 'keyboard-key-wide' : '' }${state}`}>
                                {key === 'Backspace' ? '⌫' : key}
                            </button>
                            )
                            
                        })}
                    </div>
                )
            })}
        </div>
      );
}

export default Keyboard;