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
    title: 'Thiết bị',
    dataIndex: 'thietbi',
    scopedSlots: { customRender: 'thietbi' },
    align: 'left',
    ellipsis: true
  },
  {
    title: 'Số lượng thẻ',
    dataIndex: 'soluong',
    scopedSlots: { customRender: 'soluong' },
    align: 'right',
    ellipsis: true
  },
  {
    title: 'Người được giao',
    dataIndex: 'nguoiduocgiao',
    scopedSlots: { customRender: 'nguoiduocgiao' },
    align: 'left',
    ellipsis: true
  }

]
