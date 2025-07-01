'use client'

import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface ProgressMeterProps {
  value: number
  max?: number
  label?: string
  className?: string
  indicatorClassName?: string
}

export function ProgressMeter({
  value,
  max = 100,
  label,
  className,
  indicatorClassName
}: ProgressMeterProps) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex justify-between text-sm">
          <span>{label}</span>
          <span>{percentage.toFixed(0)}%</span>
        </div>
      )}
      <Progress
        value={percentage}
        className={cn("h-2", indicatorClassName)}
      />
    </div>
  )
}