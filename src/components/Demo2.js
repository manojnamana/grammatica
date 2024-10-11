import React, { useState } from 'react';
import Soundfont from 'soundfont-player';
import './App.css';

const circleColors = [
  '#ce2525',  // Red
  '#FD5F32',  // Orange
  '#F9D96A',  // Yellow
  '#1D6C3F',  // Green
  '#2BBCFD',  // Sky Blue
  '#1D47F3',  // Indigo
  '#6188E3',  // Violet
];

const chordCircles = [

  {
    name: '1 Major Scale',
    chords: [
      { name: 'C', notes: ['C4',] },
      { name: 'G', notes: ['G4',] },
      { name: 'D', notes: ['D4',] },
      { name: 'A', notes: ['A4', ] },
      { name: 'E', notes: ['E4', ] },
      { name: 'B', notes: ['B4', ] },
      { name: 'F#', notes: ['F#4', ] },
      { name: 'Db', notes: ['Db4',] },
      { name: 'Ab', notes: ['Ab4',] },
      { name: 'Eb', notes: ['Eb4',] },
      { name: 'Bb', notes: ['Bb4',] },
      { name: 'F', notes: ['F4',] },
      
    ]
  },

  {
    name: '2 Major Scale',
    chords: [
      { name: 'Dm', notes: ['D4', ] },
      { name: 'Am', notes: ['A4', ] },
      { name: 'Em', notes: ['E4', ] },
      { name: 'Bm', notes: ['B4', ] },
      { name: 'F#m', notes: ['F#4', ] },
      { name: 'C#m', notes: ['C#5', ] },
      { name: 'G#m', notes: ['G#4',] },
      { name: 'Ebm', notes: ['Eb4', ] },
      { name: 'Bbm', notes: ['Bb4',] },
      { name: 'Fm', notes: ['F4', ] },
      { name: 'Cm', notes: ['C5', ] },
      { name: 'Gm', notes: ['G4', ] }, 
    ]
  },

  {
    name: '3 Major Scale',
    chords: [
      { name: 'Em', notes: ['E4',] },
      { name: 'Bm', notes: ['B4', ] },
      { name: 'F#m', notes: ['F#4',] },
      { name: 'C#m', notes: ['C#5',] },
      { name: 'G#m', notes: ['G#4', ] },
      { name: 'D#m', notes: ['D#5',] },
      { name: 'A#m', notes: ['A#4',] },
      { name: 'Fm', notes: ['F4',] },
      { name: 'Cm', notes: ['C5', ] },
      { name: 'Gm', notes: ['G4',] },
      { name: 'Dm', notes: ['D5', ] },
      { name: 'Am', notes: ['A4',] },
    ]
  },
  
  {
    name: '4 Major Scale',
    chords: [
      { name: 'F', notes: ['F4', ] },
      { name: 'C', notes: ['C5', ] },
      { name: 'G', notes: ['G4',] },
      { name: 'D', notes: ['D5', ] },
      { name: 'A', notes: ['A4',] },
      { name: 'E', notes: ['E5',] },
      { name: 'B', notes: ['B4', ] },
      { name: 'Gb', notes: ['Gb4', ] },
      { name: 'Db', notes: ['Db5',] },
      { name: 'Ab', notes: ['Ab4', ] },
      { name: 'Eb', notes: ['Eb5', ] },
      { name: 'Bb', notes: ['Bb4',] },


    ]
  },

  {
    name: '5 Major Scale',
    chords: [
      { name: 'G', notes: ['G4',] },
      { name: 'D', notes: ['D5', ] },
      { name: 'A', notes: ['A4',] },
      { name: 'E', notes: ['E5', ] },
      { name: 'B', notes: ['B4', ] },
      { name: 'F#', notes: ['F#5', ] },
      { name: 'C#', notes: ['C#5',] },
      { name: 'Ab', notes: ['Ab4', ] },
      { name: 'Eb', notes: ['Eb5', ] },
      { name: 'Bb', notes: ['Bb4',] },
      { name: 'F', notes: ['F5',] },
      { name: 'C', notes: ['C5',] },
    ]
  },

  {
    name: '6 Major Scale',
    chords: [
      { name: 'Am', notes: ['A4',] },
      { name: 'Em', notes: ['E5',] },
      { name: 'Bm', notes: ['B4', ] },
      { name: 'F#m', notes: ['F#5', ] },
      { name: 'C#m', notes: ['C#5', ] },
      { name: 'G#m', notes: ['G#5',] },
      { name: 'D#m', notes: ['D#5',] },
      { name: 'Bbm', notes: ['Bb4',] },
      { name: 'Fm', notes: ['F5', ] },
      { name: 'Cm', notes: ['C5',] },
      { name: 'Gm', notes: ['G5', ] },
      { name: 'Dm', notes: ['D5', ] },

    ]
  },

  {
    name: '7 Major Scale',
    chords: [
      { name: 'Bdim', notes: ['B4', ] },
      { name: 'F#dim', notes: ['F#5', ] },
      { name: 'C#dim', notes: ['C#5',] },
      { name: 'G#dim', notes: ['G#5',] },
      { name: 'D#dim', notes: ['D#5', ] },
      { name: 'A#dim', notes: ['A#5', ] },
      { name: 'E#dim', notes: ['B5', ] },
      { name: 'Cdim', notes: ['C5',] },
      { name: 'Gdim', notes: ['G5', ] },
      { name: 'Ddim', notes: ['D5',] },
      { name: 'Adim', notes: ['A5', ] },
      { name: 'Edim', notes: ['E5', ] }
    ]
  },


  
];


const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to play a chord using soundfont-player
const playChord = async (notes) => {
  const player = await Soundfont.instrument(audioContext, 'acoustic_grand_piano');
  player.play(...notes, 0, { duration: 2 });
};

// Function to get SVG path for each pie slice (chord segment)
const getPathForArc = (startAngle, endAngle, innerRadius, outerRadius) => {
  const x1 = outerRadius * Math.cos(startAngle);
  const y1 = outerRadius * Math.sin(startAngle);
  const x2 = outerRadius * Math.cos(endAngle);
  const y2 = outerRadius * Math.sin(endAngle);
  const x3 = innerRadius * Math.cos(endAngle);
  const y3 = innerRadius * Math.sin(endAngle);
  const x4 = innerRadius * Math.cos(startAngle);
  const y4 = innerRadius * Math.sin(startAngle);

  return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2} 
         L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} z`;
};

// Function to get label position based on angle and radius
const getLabelPosition = (angle, radius) => {
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  return { x, y };
};

function App() {
  const [label, setShowLabel] = useState(false);
  const [clickedSegment, setClickedSegment] = useState(null);

  const outerRadius = 250;
  const innerRadiusStep = 30;
  const numSegments = 12;
  const anglePerSegment = (2 * Math.PI) / numSegments;

  return (
    <div className="text-center flex-col flex justify-center items-center">
      <h1 className='text-center text-black font-bold text-lg'>Grammatic Piano</h1>
      <svg style={{ maxHeight: 500, maxWidth: 500 }} viewBox="-300 -300 600 600">
        {chordCircles.map((circle, circleIndex) => {
          const innerRadius = outerRadius - (innerRadiusStep * (circleIndex + 1));
          const outerRadiusForCircle = outerRadius - (innerRadiusStep * circleIndex);
          const circleColor = circleColors[circleIndex % circleColors.length];

          return (
            <g key={circleIndex}>
              <circle
                cx="0"
                cy="0"
                r={innerRadius + (outerRadiusForCircle - innerRadius) / 2}
                fill="none"
                stroke="gray"
                strokeWidth="1"
              />
              {circle.chords.map((chord, index) => {
                const startAngle = index * anglePerSegment - Math.PI / 2;
                const endAngle = (index + 1) * anglePerSegment - Math.PI / 2;
                const midAngle = (startAngle + endAngle) / 2;
                const labelPos = getLabelPosition(midAngle, (innerRadius + outerRadiusForCircle) / 2);

                const isClicked = clickedSegment?.circleIndex === circleIndex && clickedSegment?.chordIndex === index;

                return (
                  <g key={`${circleIndex}-${index}`}>
                    <path
                      d={getPathForArc(startAngle, endAngle, innerRadius, outerRadiusForCircle)}
                      fill={isClicked ? "white" : circleColor}
                      stroke="black"
                      onClick={() => {
                        playChord(chord.notes);
                        setClickedSegment({ circleIndex, chordIndex: index });
                      }}
                    />
                    {label && (
                      <text
                        x={labelPos.x}
                        y={labelPos.y}
                        fill="black"
                        fontSize="12"
                        textAnchor="middle"
                        alignmentBaseline="middle"
                      >
                        {chord.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>

      <div style={{position: "fixed", bottom: 0}} className='bg-sky-500 w-full p-2'>
        {label ? (
          <button className='bg-white p-3 rounded-full text-slate-950 hover:bg-slate-800 hover:text-white' onClick={() => setShowLabel(false)}>Hide labels</button>
        ) : (
          <button className='bg-white p-3 rounded-full text-slate-950 hover:bg-slate-800 hover:text-white' onClick={() => setShowLabel(true)}>Show labels</button>
        )}
      </div>
    </div>
  );
}

export default App;
