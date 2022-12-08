import React, {
  createElement,
  forwardRef,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { AnimateProps } from './types'

const Animate = (props: AnimateProps, ref: any) => {

  const {
    tag = 'div',
    clsPrefix = '',
    cls,
    initialVisible,
    onAnimationEnd,
    getVisibleWhenAnimateEnd,
    children
  } = props

  const [visible, setVisible] = useState<boolean>(initialVisible ?? true)

  if (!visible) {
    return null
  }

  if (!cls || typeof cls !== 'string') {
    return <>{children} </>
  }

  const className = cls.split(' ').map(cls => `${clsPrefix}${cls}`).join(' ')

  useEffect(() => {
    if (!getVisibleWhenAnimateEnd) {
      return
    }
    const visibleWhenAnimateEnd = getVisibleWhenAnimateEnd(cls)
    if (visibleWhenAnimateEnd && !visible) {
      setVisible(true)
    }
  }, [cls, visible, getVisibleWhenAnimateEnd])

  const handleAnimationEnd = useCallback(() => {
    if (!getVisibleWhenAnimateEnd) {
      onAnimationEnd?.()
      return
    }
    if (visible && !getVisibleWhenAnimateEnd(cls)) {
      setVisible(false)
    }
    onAnimationEnd?.()
  }, [getVisibleWhenAnimateEnd])

  return createElement(
    tag,
    {
      ref,
      onAnimationEnd: handleAnimationEnd,
      className,
    },
    children
  )
}

export default forwardRef(Animate)