export const stepConfig = [
  { title: '帐户信息' },
  { title: '选择工作表' },
  { title: '基本信息' },
  { title: '同步周期' },
  { title: '同步模式' }
]

export const actionConfig = ({ cancel, goPrev, goAfter }) => ({
  0: { text1: '取消', text2: '下一步', click1: cancel, click2: goAfter },
  1: { text1: '上一步', text2: '下一步', click1: goPrev, click2: goAfter },
  2: { text1: '上一步', text2: '下一步', click1: goPrev, click2: goAfter },
  3: { text1: '上一步', text2: '下一步', click1: goPrev, click2: goAfter },
  4: { text1: '上一步', text2: '完成', click1: goPrev }
})

export const example = []