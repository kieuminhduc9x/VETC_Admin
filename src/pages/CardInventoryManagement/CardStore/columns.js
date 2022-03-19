export default [
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: { customRender: 'rowIndex' },
    align: 'center',
    ellipsis: true,
    width: 80
  },
  {
    title: 'Trạm',
    dataIndex: 'tram',
    scopedSlots: { customRender: 'tram' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Thiết bị',
    dataIndex: 'thietbi',
    scopedSlots: { customRender: 'thietbi' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Số lượng thẻ',
    dataIndex: 'soluongthe',
    scopedSlots: { customRender: 'soluongthe' },
    align: 'right',
    ellipsis: true,
    width: 120
  }

]
