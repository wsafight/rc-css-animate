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
    const { getVisibleWhenAnimateEnd, cls } = props
    const { visible } = state
    if (!getVisibleWhenAnimateEnd) {
      return null
    }
    const visibleWhenAnimateEnd = getVisibleWhenAnimateEnd(cls)
    if (!visibleWhenAnimateEnd) {
      return null
    }
    if (visible) {
      return null
    }
    return { visible: true }
  }

  handleAnimationEnd = () => {
    const { getVisibleWhenAnimateEnd, onAnimationEnd, cls } = this.props
    const { visible } = this.state
    if (!getVisibleWhenAnimateEnd) {
      onAnimationEnd?.()
      return
    }
    if (visible && !getVisibleWhenAnimateEnd(cls)) {
      this.setState({ visible: false })
    }
    onAnimationEnd?.()
  }

  render(): React.ReactNode {
    const {
      tag = 'div',
      cls,
      children,
      clsPrefix,
      forwardedRef
    } = this.props

    console.log('wsa-test')

    if (!cls || typeof cls !== 'string') {
      return <>{children}</>
    }

    const { visible } = this.state
    if (!visible) {
      return null
    }

    const className = cls.split(' ').map(cls => `${clsPrefix || getPrefixCls()}${cls}`).join(' ')

    return createElement(
      tag,
      {
        ref: forwardedRef,
        onAnimationEnd: this.handleAnimationEnd,
        className,
      },
      children
    )
  }
}

export default forwardRef((props: AnimateProps, ref: any) => {
  return <CompatibleAnimate forwardedRef={ref} {...props} />
})