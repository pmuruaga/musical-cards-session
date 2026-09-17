import { motion } from 'framer-motion';

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  size: 2 + (i % 3),
  duration: 10 + (i % 8) * 2,
  delay: (i % 7) * 0.6,
  opacity: 0.15 + (i % 4) * 0.08,
}));

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(180,110,60,0.18)_0%,_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(90,60,40,0.25)_0%,_transparent_50%),linear-gradient(160deg,#120e0c_0%,#1a1410_40%,#0f0c0a_100%)]" />

      <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[#c4784a]/20 blur-[100px]" />
      <div className="absolute -right-16 top-10 h-64 w-64 rounded-full bg-[#a07040]/15 blur-[90px]" />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#6b4a3a]/20 blur-[110px]" />
      <motion.div
        className="absolute inset-x-0 top-[18%] h-px bg-gradient-to-r from-transparent via-[#d4a574]/20 to-transparent"
        animate={{ opacity: [0.2, 0.45, 0.2], scaleX: [0.85, 1, 0.85] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-[#f0d5b0]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.4],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
