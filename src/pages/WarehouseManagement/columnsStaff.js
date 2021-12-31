export default [
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: { customRender: 'rowIndex' },
    align: 'center',
    width: 50
  },
  {
    title: 'User Name',
    dataIndex: 'userName',
    scopedSlots: { customRender: 'userName' },
    align: 'left',
    ellipsis: true,
    width: 200
  },
  {
    slots: { title: 'actionTitle' },
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 80,
    align: 'center'
  }
]
