import React, {
  createElement,
  forwardRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { ReactNode } from 'react';

interface AnimateProps {
  tag: any
  clsPrefix?: string
  cls: string
  children: ReactNode | null
  initialVisible?: boolean
  onAnimationEnd?: () => void
  getVisibleWhenAnimateEnd?: (cls: string) => boolean
}

const Animate = (props: AnimateProps, ref: any) => {

  const {
    tag,
    clsPrefix = '', 
    cls,
    initialVisible,
    onAnimationEnd,
    getVisibleWhenAnimateEnd,
    children
  } = props;

  const [visible, setVisible ] = useState<boolean>(initialVisible ?? true)

  if (!cls || typeof cls !== 'string') {
    return <>{children}</>;
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


  if (!visible) {
    return <></>
  }

  return createElement(
    tag,
    {
      ref,
      onAnimationEnd: handleAnimationEnd,
      className,
    },
    children
  );
}

const RAnimate = forwardRef(Animate)

export {
  RAnimate
}

export default RAnimate