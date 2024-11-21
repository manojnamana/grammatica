// @ts-nocheck

import React from 'react';
import { Box } from '@mui/material';

// type Circle = {
//   segments: number; // Number of segments in the circle
//   colors: string[]; // Array of colors for each segment
// };

// interface ConcentricCirclesProps {
//   chordCircles: Circle[]; // Array of circles with their segments and colors
//   outerRadius: number; // Outer radius of the largest circle
//   innerRadiusStep: number; // Thickness of each circle
// }

const ConcentricCircles = ({
  chordCircles,
  outerRadius,
  innerRadiusStep,
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: `${outerRadius * 2}px`,
        height: `${outerRadius * 2}px`,
        margin: 'auto',
      }}
    >
      {chordCircles.map((circle, circleIndex) => {
        const innerRadius = outerRadius - innerRadiusStep * (circleIndex + 1);
        const outerRadiusForCircle = outerRadius - innerRadiusStep * circleIndex;

        return Array.from({ length: circle.segments }).map((_, segmentIndex) => {
          const startAngle = (360 / circle.segments) * segmentIndex;
          const endAngle = (360 / circle.segments) * (segmentIndex + 1);
          const fillColor =
            circle.colors[segmentIndex % circle.colors.length];

          return (
            <Box
              key={`${circleIndex}-${segmentIndex}`}
              sx={{
                position: 'absolute',
                width: `${outerRadiusForCircle * 2}px`,
                height: `${outerRadiusForCircle * 2}px`,
                backgroundColor: fillColor,
                borderRadius: '50%',
                clipPath: `polygon(
                  50% 50%,
                  ${50 + 50 * Math.cos((startAngle * Math.PI) / 180)}% 
                  ${50 + 50 * Math.sin((startAngle * Math.PI) / 180)}%,
                  ${50 + 50 * Math.cos((endAngle * Math.PI) / 180)}% 
                  ${50 + 50 * Math.sin((endAngle * Math.PI) / 180)}%
                )`,
                transform: `translate(-50%, -50%) rotate(${startAngle}deg)`,
                top: '50%',
                left: '50%',
                zIndex: chordCircles.length - circleIndex,
              }}
            />
          );
        });
      })}
    </Box>
  );
};

export default ConcentricCircles;
