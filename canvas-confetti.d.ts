// types/canvas-confetti.d.ts
declare module 'canvas-confetti' {
  interface ConfettiOptions {
    particleCount?: number;
    angle?: number;
    spread?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    colors?: string[];
    scalar?: number;
    zIndex?: number;
  }

  export default function confetti(options?: ConfettiOptions): void;
}