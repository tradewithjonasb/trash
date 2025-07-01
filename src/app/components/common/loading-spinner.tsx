'use client'

import { cn } from '@/lib/utils'

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("animate-spin rounded-full h-5 w-5 border-b-2 border-primary", className)} />
  )
}