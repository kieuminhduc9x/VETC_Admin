export default [
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: { customRender: 'rowIndex' },
    align: 'center',
    width: 50
  },
  {
    title: 'Tên file',
    dataIndex: 'fileName',
    scopedSlots: { customRender: 'fileName' },
    align: 'left',
    ellipsis: true,
    width: 250
  }
]
