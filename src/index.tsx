import React, {
  createElement,
  forwardRef,
  useState,
  useEffect,
  useCallback,
} from 'react';

interface AnimateProps {
  tag: any
  clsPrefix?: string
  cls: string
  children?: React.ReactNode
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
    getVisibleWhenAnimateEnd
  } = props;

  const [visible, setVisible ] = useState<boolean>(initialVisible ?? true)

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
    return null
  }

  return createElement(
    tag,
    {
      ref,
      onAnimationEnd: handleAnimationEnd,
      className,
    },
    props.children
  );
}

const RAnimat = forwardRef(Animate)

export {
  RAnimat
}

export default RAnimat