import Vue from 'vue'
export default function (columns) {
  const draggingMap = {}
  columns.forEach(col => {
    draggingMap[col.dataIndex] = col.width
  })
  const draggingState = Vue.observable(draggingMap)
  return function (h, props, children) {
    let thDom = null
    const { key, ...restProps } = props
    // console.log(children)
    const col = columns.find(col => {
      const k = col.dataIndex || col.key
      return k === key
    })
    if (col === undefined || !col.width) {
      return <th {...restProps}>{children}</th>
    }
    const onDrag = (x, y) => {
      draggingState[key] = 0
      col.width = Math.max(x, 1)
    }

    const onDragstop = () => {
      draggingState[key] = thDom.getBoundingClientRect().width
    }
    return (
      <th v-ant-ref={r => (thDom = r)} width={col.width} class="resize-table-th">
        {children}
        <vue-draggable-resizable
          key={col.key}
          class="table-draggable-handle"
          w={10}
          x={draggingState[key] || col.width}
          z={1}
          axis="x"
          draggable={true}
          resizable={false}
          onDragging={onDrag}
          onDragstop={onDragstop}
        ></vue-draggable-resizable>
      </th>
    )
  }
}
