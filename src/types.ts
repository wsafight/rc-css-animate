import { CSSProperties, ReactNode } from 'react'

export interface AnimateProps {
  tag: any
  clsPrefix?: string
  className?: string
  animateCls: string
  style?: CSSProperties | undefined
  children: ReactNode | null
  initialVisible?: boolean
  onAnimationEnd?: () => void
  getVisibleWhenAnimateEnd?: (cls: string) => boolean
}