export default [

  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: { customRender: 'rowIndex' },
    align: 'center',
    width: 50
  },
  {
    title: 'Tên tài liệu',
    dataIndex: 'fileName',
    scopedSlots: { customRender: 'fileName' },
    align: 'left',
    ellipsis: true
  }
]
