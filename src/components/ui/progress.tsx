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
  const barHeight = Number(height || 16);

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
      {/* Right end glow effect */}
      {progress > 0 && (
      <motion.div
          className="pointer-events-none absolute top-1/2"
          initial={{ opacity: 0 }}
          animate={{
            left: `calc(${progress}% - ${Number(barHeight) * 0.7}px)`,
            opacity: progress > 0 ? 1 : 0,
          }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
            transform: 'translateY(-50%)',
            width: Number(barHeight) * 2,
            height: Number(barHeight) * 2,
          zIndex: 2,
        }}
      >
        <div
          className="absolute top-1/2 left-1/2"
          style={{
              width: Number(barHeight) * 2,
              height: Number(barHeight) * 2,
            background: 'radial-gradient(circle, #fff17699 0%, #ff910055 60%, transparent 100%)',
            filter: 'blur(8px)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
          }}
        />
      </motion.div>
      )}
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress }
