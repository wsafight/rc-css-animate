import React, {
  createElement,
  forwardRef,
  Component,
} from 'react'
import { getPrefixCls } from './prefix-cls'
import { AnimateProps } from './types'

interface AnimatePropsWithRef extends AnimateProps {
  forwardedRef: any
}

interface AnimateState {
  visible: boolean
}

class CompatibleAnimate extends Component<AnimatePropsWithRef, AnimateState> {

  constructor(props: AnimatePropsWithRef) {
    super(props)
    const { initialVisible } = props
    this.state = { visible: initialVisible ?? true }
  }

  static getDerivedStateFromProps(props: AnimateProps, state: AnimateState) {
    const { getVisibleWhenAnimateEnd, animateCls } = props
    const { visible } = state
    if (!getVisibleWhenAnimateEnd) {
      return null
    }
    const visibleWhenAnimateEnd = getVisibleWhenAnimateEnd(animateCls)
    if (!visibleWhenAnimateEnd) {
      return null
    }
    if (visible) {
      return null
    }
    return { visible: true }
  }

  handleAnimationEnd = () => {
    const { getVisibleWhenAnimateEnd, onAnimationEnd, animateCls } = this.props
    const { visible } = this.state
    if (!getVisibleWhenAnimateEnd) {
      onAnimationEnd?.()
      return
    }
    if (visible && !getVisibleWhenAnimateEnd(animateCls)) {
      this.setState({ visible: false })
    }
    onAnimationEnd?.()
  }

  render(): React.ReactNode {
    const {
      tag = 'div',
      animateCls = '',
      children,
      clsPrefix,
      forwardedRef,
      style,
    } = this.props

    if (!animateCls || typeof animateCls !== 'string') {
      return <>{children}</>
    }

    const { visible } = this.state

    if (!visible) {
      return null
    }

    let { className = '' } = this.props

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
        ref: forwardedRef,
        onAnimationEnd: this.handleAnimationEnd,
        className: className.concat(` ${animateClassName}`),
        style,
      },
      children
    )
  }
}

export default forwardRef((props: AnimateProps, ref: any) => {
  return <CompatibleAnimate forwardedRef={ref} {...props} />
})