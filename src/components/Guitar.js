import React, { useEffect, useState } from 'react';
import Soundfont from 'soundfont-player';
import Guitar from 'react-guitar';

const tuning = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']; // Standard guitar tuning
const frets = 14; // Limit to 14 frets

const GuitarComponent = () => {
  const [player, setPlayer] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [gainNode, setGainNode] = useState(null); // Gain node for volume control
  const [selectedNote, setSelectedNote] = useState(null); // Track selected note

  useEffect(() => {
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    const gain = ac.createGain(); // Create gain node
    gain.gain.value = 10; // Set initial gain (volume) to 10
    gain.connect(ac.destination); // Connect gain node to audio context destination

    setAudioContext(ac);
    setGainNode(gain);

    // Load the guitar sound
    Soundfont.instrument(ac, 'acoustic_guitar_nylon').then((guitar) => {
      setPlayer(guitar);
    });

    return () => ac.close(); // Clean up audio context when component unmounts
  }, []);

  const playNote = (note) => {
    if (player && audioContext) {
      setSelectedNote(note); // Update selected note to display on the UI
      player.play(note, audioContext.currentTime, {
        gain: gainNode.gain.value, // Use gain node's current value
      });
    }
  };

  return (
    <div className="my-10 bottom-16 w-10/12 md:w-1/2">
      <div className="max-w-full">
        {/* Guitar component with label support */}
        <Guitar
          strings={tuning} // Example tuning for the guitar
          onChange={(note) => playNote(note)} // Play the note when hovered
          onPlay={playNote} // Not used but kept for compatibility
          renderFingerings={true} // Render finger labels on the guitar
          renderNotes={true} // Show notes on the guitar fretboard
          getFretHandPosition={(pos) => ({
            onMouseEnter: () => playNote(pos.note),
          })} // Play note on hover
        />
      </div>

      {/* Show selected note */}
      {selectedNote && (
        <div className="text-xl mt-4">
          {/* Playing: <span className="font-bold">{selectedNote}</span> */}
          ⠀
        </div>
      )}
    </div>
  );
};

export default GuitarComponent;
