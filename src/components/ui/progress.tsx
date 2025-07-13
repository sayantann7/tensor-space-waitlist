import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    value: number,
    color?: string,
    height?: string | number,
    flow?: boolean
  }
>(({ className, value, color, height, flow, ...props }, ref) => {
  // Clamp value between 0 and 100
  const progress = Math.max(0, Math.min(100, value || 0));
  // Bar height
  const barHeight = height || 16;
  // Indicator width (for the circle)
  const indicatorSize = barHeight * 2.2;
  // Calculate left position for the circle
  const circleLeft = `calc(${progress}% - ${indicatorSize / 2}px)`;

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative w-full overflow-visible rounded-full bg-white shadow-lg",
        className
      )}
      style={{ height: barHeight, minHeight: barHeight, boxShadow: '0 2px 12px 0 #0002' }}
      {...props}
    >
      {/* Track */}
      <div className="absolute top-0 left-0 w-full h-full rounded-full bg-white" style={{ boxShadow: '0 2px 12px 0 #0001' }} />
      {/* Progress Tail */}
      <motion.div
        className="absolute top-0 left-0 h-full rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: color || 'linear-gradient(90deg, #ff9100 0%, #fff176 100%)',
          boxShadow: '0 0 16px 6px #ff910088',
          height: barHeight,
          borderRadius: barHeight,
        }}
      />
      {/* Glowing Circle at the leading edge */}
      <motion.div
        className="absolute top-1/2"
        initial={{ left: 0, opacity: 0 }}
        animate={{ left: circleLeft, opacity: progress > 0 ? 1 : 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          transform: `translateY(-50%)`,
          width: indicatorSize,
          height: indicatorSize,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        {/* Glow */}
        <div
          className="absolute top-1/2 left-1/2"
          style={{
            width: indicatorSize * 1.2,
            height: indicatorSize * 1.2,
            background: 'radial-gradient(circle, #fff17699 0%, #ff910055 60%, transparent 100%)',
            filter: 'blur(8px)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
          }}
        />
        {/* Main circle */}
        <div
          className="absolute top-1/2 left-1/2"
          style={{
            width: indicatorSize * 0.7,
            height: indicatorSize * 0.7,
            background: 'linear-gradient(120deg, #ff9100 0%, #fff176 100%)',
            boxShadow: '0 0 16px 4px #ff9100cc',
            borderRadius: '50%',
            border: '2px solid #fff',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
          }}
        />
      </motion.div>
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress }
