import React from 'react';
import * as Tone from 'tone';
import './App.css';

const circleColors = [
  '#FE462A',  // Red
  '#FD5F32',  // Orange
  '#F9D96A',  // Yellow
  '#1D6C3F',  // Green
  '#2BBCFD',  // Sky Blue
  '#1D47F3',  // Indigo
  '#6188E3',  // Violet
];

const chordCircles = [

  {
    name: 'C Major Scale',
    chords: [
      { name: 'C', notes: ['C4', 'E4', 'G4'] },
      { name: 'G', notes: ['G4', 'B4', 'D5'] },
      { name: 'D', notes: ['D4', 'F#4', 'A4'] },
      { name: 'A', notes: ['A4', 'C#5', 'E5'] },
      { name: 'E', notes: ['E4', 'G#4', 'B4'] },
      { name: 'B', notes: ['B4', 'D#5', 'F#5'] },
      { name: 'F#', notes: ['F#4', 'A#4', 'C#5'] },
      { name: 'Db', notes: ['Db4', 'F4', 'Ab4'] },
      { name: 'Ab', notes: ['Ab4', 'C5', 'Eb5'] },
      { name: 'Eb', notes: ['Eb4', 'G4', 'Bb4'] },
      { name: 'Bb', notes: ['Bb4', 'D5', 'F5'] },
      { name: 'F', notes: ['F4', 'A4', 'C5'] },
      
    ]
  },

  {
    name: 'G Major Scale',
    chords: [
      { name: 'Dm', notes: ['D4', 'F4', 'A4'] },
      { name: 'Am', notes: ['A4', 'C5', 'E5'] },
      { name: 'Em', notes: ['E4', 'G4', 'B4'] },
      { name: 'Bm', notes: ['B4', 'D5', 'F#5'] },
      { name: 'F#m', notes: ['F#4', 'A4', 'C#5'] },
      { name: 'C#m', notes: ['C#5', 'E5', 'G#5'] },
      { name: 'G#m', notes: ['G#4', 'B4', 'D#5'] },
      { name: 'Ebm', notes: ['Eb4', 'Gb4', 'Bb4'] },
      { name: 'Bbm', notes: ['Bb4', 'Db5', 'F5'] },
      { name: 'Fm', notes: ['F4', 'Ab4', 'C5'] },
      { name: 'Cm', notes: ['C5', 'Eb5', 'G5'] },
      { name: 'Gm', notes: ['G4', 'Bb4', 'D5'] }, 
    ]
  },

  {
    name: 'D Major Scale',
    chords: [
      { name: 'Em', notes: ['E4', 'G4', 'B4'] },
      { name: 'Bm', notes: ['B4', 'D5', 'F#5'] },
      { name: 'F#m', notes: ['F#4', 'A4', 'C#5'] },
      { name: 'C#m', notes: ['C#5', 'E5', 'G#5'] },
      { name: 'G#m', notes: ['G#4', 'B4', 'D#5'] },
      { name: 'D#m', notes: ['D#5', 'F#5', 'A#5'] },
      { name: 'A#m', notes: ['A#4', 'C#5', 'F5'] },
      { name: 'Fm', notes: ['F4', 'Ab4', 'C5'] },
      { name: 'Cm', notes: ['C5', 'Eb5', 'G5'] },
      { name: 'Gm', notes: ['G4', 'Bb4', 'D5'] },
      { name: 'Dm', notes: ['D5', 'F5', 'A5'] },
      { name: 'Am', notes: ['A4', 'C5', 'E5'] },
    ]
  },
  
  {
    name: 'A Major Scale',
    chords: [
      { name: 'F', notes: ['F4', 'A4', 'C5'] },
      { name: 'C', notes: ['C5', 'E5', 'G5'] },
      { name: 'G', notes: ['G4', 'B4', 'D5'] },
      { name: 'D', notes: ['D5', 'F#5', 'A5'] },
      { name: 'A', notes: ['A4', 'C#5', 'E5'] },
      { name: 'E', notes: ['E5', 'G#5', 'B5'] },
      { name: 'B', notes: ['B4', 'D#5', 'F#5'] },
      { name: 'Gb', notes: ['Gb4', 'Bb4', 'Db5'] },
      { name: 'Db', notes: ['Db5', 'F5', 'Ab5'] },
      { name: 'Ab', notes: ['Ab4', 'C5', 'Eb5'] },
      { name: 'Eb', notes: ['Eb5', 'G5', 'Bb5'] },
      { name: 'Bb', notes: ['Bb4', 'D5', 'F5'] },


    ]
  },

  {
    name: 'E Major Scale',
    chords: [
      { name: 'G', notes: ['G4', 'B4', 'D5'] },
      { name: 'D', notes: ['D5', 'F#5', 'A5'] },
      { name: 'A', notes: ['A4', 'C#5', 'E5'] },
      { name: 'E', notes: ['E5', 'G#5', 'B5'] },
      { name: 'B', notes: ['B4', 'D#5', 'F#5'] },
      { name: 'F#', notes: ['F#5', 'A#5', 'C#6'] },
      { name: 'C#', notes: ['C#5', 'F5', 'G#5'] },
      { name: 'Ab', notes: ['Ab4', 'C5', 'Eb5'] },
      { name: 'Eb', notes: ['Eb5', 'G5', 'Bb5'] },
      { name: 'Bb', notes: ['Bb4', 'D5', 'F5'] },
      { name: 'F', notes: ['F5', 'A5', 'C6'] },
      { name: 'C', notes: ['C5', 'E5', 'G5'] },
    ]
  },

  {
    name: 'B Major Scale',
    chords: [
      { name: 'Am', notes: ['A4', 'C5', 'E5'] },
      { name: 'Em', notes: ['E5', 'G5', 'B5'] },
      { name: 'Bm', notes: ['B4', 'D5', 'F#5'] },
      { name: 'F#m', notes: ['F#5', 'A5', 'C#6'] },
      { name: 'C#m', notes: ['C#5', 'E5', 'G#5'] },
      { name: 'G#m', notes: ['G#5', 'B5', 'D#6'] },
      { name: 'D#m', notes: ['D#5', 'F#5', 'A#5'] },
      { name: 'Bbm', notes: ['Bb4', 'Db5', 'F5'] },
      { name: 'Fm', notes: ['F5', 'Ab5', 'C6'] },
      { name: 'Cm', notes: ['C5', 'Eb5', 'G5'] },
      { name: 'Gm', notes: ['G5', 'Bb5', 'D6'] },
      { name: 'Dm', notes: ['D5', 'F5', 'A5'] },

    ]
  },

  {
    name: 'F# Major Scale',
    chords: [
      { name: 'Bdim', notes: ['B4', 'D5', 'F5'] },
      { name: 'F#dim', notes: ['F#5', 'A5', 'C6'] },
      { name: 'C#dim', notes: ['C#5', 'E5', 'G5'] },
      { name: 'G#dim', notes: ['G#5', 'B5', 'D6'] },
      { name: 'D#dim', notes: ['D#5', 'F#5', 'A5'] },
      { name: 'A#dim', notes: ['A#5', 'C#6', 'E6'] },
      { name: 'E#dim', notes: ['E#5', 'G#5', 'B5'] },
      { name: 'Cdim', notes: ['C5', 'Eb5', 'Gb5'] },
      { name: 'Gdim', notes: ['G5', 'Bb5', 'Db6'] },
      { name: 'Ddim', notes: ['D5', 'F5', 'Ab5'] },
      { name: 'Adim', notes: ['A5', 'C6', 'Eb6'] },
      { name: 'Edim', notes: ['E5', 'G5', 'Bb5'] }
    ]
  },


  
];


const playChord = (notes) => {
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  synth.triggerAttackRelease(notes, '8n');
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
  const outerRadius = 227;
  const innerRadiusStep = 28; // Distance between each circle
  const numSegments = 12;      // Fixed number of segments per circle
  const anglePerSegment = (2 * Math.PI) / numSegments;

  return (
    <div className="App">
      <h1 style={{textAlign:'center'}}>Grammatic Piano</h1>
      <svg style={{ maxHeight: 500, maxWidth: 500 }} viewBox="-300 -300 600 600">
        {/* Central Circle in the middle of the SVG */}
        <circle cx="0" cy="0" r="30" fill="white" stroke="black" />

        {chordCircles.map((circle, circleIndex) => {
          const innerRadius = outerRadius - (innerRadiusStep * (circleIndex + 1));
          const outerRadiusForCircle = outerRadius - (innerRadiusStep * circleIndex);
          const circleColor = circleColors[circleIndex % circleColors.length]; // Use one color for each circle

          return (
            <g key={circleIndex}>
              {/* Draw a central circle for each concentric circle */}
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

                // Get label position
                const labelPos = getLabelPosition(midAngle, (innerRadius + outerRadiusForCircle) / 2);

                return (
                  <g key={`${circleIndex}-${index}`}>
                    {/* Pie slice (chord segment) */}
                    <path
                      d={getPathForArc(startAngle, endAngle, innerRadius, outerRadiusForCircle)}
                      fill={circleColor}  // Apply the circle color to all segments in this circle
                      stroke="black"
                      onClick={() => playChord(chord.notes)}
                    />
                    {/* Chord label */}
                    <text
                      x={labelPos.x}
                      y={labelPos.y}
                      fill="black"
                      fontSize="12"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      className="chord-label"
                    >
                      {chord.name}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default App;