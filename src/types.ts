import { ReactNode } from 'react';

export interface AnimateProps {
  tag: any
  clsPrefix?: string
  cls: string
  children: ReactNode | null
  initialVisible?: boolean
  onAnimationEnd?: () => void
  getVisibleWhenAnimateEnd?: (cls: string) => boolean
}