export default [
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: { customRender: 'rowIndex' },
    align: 'center',
    width: 50
  },
  {
    title: 'IMEI',
    dataIndex: 'imei',
    scopedSlots: { customRender: 'imei' },
    align: 'right',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    scopedSlots: { customRender: 'phone' },
    align: 'right',
    ellipsis: true,
    width: 120
  }
]
