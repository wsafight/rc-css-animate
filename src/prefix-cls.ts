let prefixCls: string = ''

export const getPrefixCls = (): string => prefixCls

export const setPrefixCls = (cls: string) => {
  if (typeof cls !== 'string') {
    return
  }
  prefixCls = cls
}