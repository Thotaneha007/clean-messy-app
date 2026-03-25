import React from 'react';
import { motion } from 'framer-motion';

const Shape = ({ type, size, delay, x, duration, color }) => {
  let content = null;

  // Render different engaging, soft SVGs based on type
  if (type === 'star') {
    content = (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} opacity="0.6">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    );
  } else if (type === 'moon') {
    content = (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} opacity="0.6">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    );
  } else {
    content = (
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, #ffffff, ${color})`,
        opacity: 0.5, boxShadow: `0 0 15px ${color}`
      }} />
    );
  }

  return (
    <motion.div
      style={{
        position: 'absolute', bottom: -150, left: `${x}%`,
        pointerEvents: 'none', zIndex: 0,
        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
      }}
      animate={{
        y: ['0vh', '-120vh'],
        x: ['0px', '40px', '-40px', '0px'],
        rotate: [0, 90, 180, 360]
      }}
      transition={{
        y: { duration: duration, repeat: Infinity, ease: "linear", delay: delay },
        x: { duration: duration * 0.7, repeat: Infinity, ease: "easeInOut", delay: delay },
        rotate: { duration: duration * 1.5, repeat: Infinity, ease: "linear" }
      }}
    >
      {content}
    </motion.div>
  );
};

export default function FloatingBubbles() {
  const shapes = [
    { type: 'star', size: 45, delay: 0, x: 5, duration: 25, color: '#fcd34d' },
    { type: 'moon', size: 60, delay: 5, x: 15, duration: 32, color: '#a78bfa' },
    { type: 'circle', size: 70, delay: 2, x: 28, duration: 28, color: '#6ee7b7' },
    { type: 'star', size: 35, delay: 10, x: 38, duration: 20, color: '#93c5fd' },
    { type: 'moon', size: 50, delay: 7, x: 48, duration: 35, color: '#fbcfe8' },
    { type: 'circle', size: 90, delay: 12, x: 62, duration: 40, color: '#fde047' },
    { type: 'star', size: 55, delay: 4, x: 75, duration: 22, color: '#fda4af' },
    { type: 'circle', size: 40, delay: 8, x: 85, duration: 29, color: '#818cf8' },
    { type: 'star', size: 30, delay: 1, x: 92, duration: 24, color: '#fbbf24' },
    { type: 'moon', size: 45, delay: 14, x: 10, duration: 33, color: '#c084fc' },
    { type: 'circle', size: 65, delay: 3, x: 55, duration: 27, color: '#e879f9' },
    { type: 'star', size: 40, delay: 6, x: 70, duration: 21, color: '#60a5fa' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
      {shapes.map((s, i) => (
        <Shape key={i} {...s} />
      ))}
    </div>
  );
}
