'use client'

import { MotionDiv } from '../animations/motion-div'

interface SectionHeadingProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export function SectionHeading({ title, description, action }: SectionHeadingProps) {
  return (
    <MotionDiv 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </MotionDiv>
  )
}