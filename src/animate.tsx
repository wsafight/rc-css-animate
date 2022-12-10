import React, {
  createElement,
  forwardRef,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { getPrefixCls } from './prefix-cls'
import { AnimateProps } from './types'

const Animate = (props: AnimateProps, ref: any) => {
  const {
    tag = 'div',
    clsPrefix = '',
    animateCls,
    style,
    initialVisible,
    onAnimationEnd,
    getVisibleWhenAnimateEnd,
    children
  } = props

  const [visible, setVisible] = useState<boolean>(initialVisible ?? true)

  if (!visible) {
    return null
  }

  if (!animateCls || typeof animateCls !== 'string') {
    return <>{children}</>
  }

  useEffect(() => {
    if (!getVisibleWhenAnimateEnd) {
      return
    }
    const visibleWhenAnimateEnd = getVisibleWhenAnimateEnd(animateCls)
    if (visibleWhenAnimateEnd && !visible) {
      setVisible(true)
    }
  }, [animateCls, visible, getVisibleWhenAnimateEnd])

  const handleAnimationEnd = useCallback(() => {
    if (!getVisibleWhenAnimateEnd) {
      onAnimationEnd?.()
      return
    }
    if (visible && !getVisibleWhenAnimateEnd(animateCls)) {
      setVisible(false)
    }
    onAnimationEnd?.()
  }, [getVisibleWhenAnimateEnd])


  let { className = '' } = props

  if (typeof className !== 'string') {
    className = ''
  }

  let animateClassName = animateCls

  const finalClsPrefix = clsPrefix || getPrefixCls()

  if (!finalClsPrefix || typeof finalClsPrefix !== 'string') {
    animateClassName = animateCls.split(' ').map(item => `${finalClsPrefix}${item}`).join(' ')
  }

  return createElement(
    tag,
    {
      ref,
      onAnimationEnd: handleAnimationEnd,
      className: className.concat(` ${animateClassName}`),
      style,
    },
    children
  )
}

export default forwardRef(Animate)