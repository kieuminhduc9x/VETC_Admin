export default [
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: { customRender: 'rowIndex' },
    align: 'center',
    width: 50
  },
  {
    title: 'Mã phiếu xuất nhập',
    dataIndex: 'voucherCode',
    scopedSlots: { customRender: 'voucherCode' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Ngày nhập',
    dataIndex: 'importAt',
    scopedSlots: { customRender: 'importAt' },
    align: 'center',
    ellipsis: true,
    width: 150

  },
  {
    title: 'Ngày xuất',
    dataIndex: 'exportAt',
    scopedSlots: { customRender: 'exportAt' },
    align: 'center',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Trạng thái ',
    dataIndex: 'statusName',
    scopedSlots: { customRender: 'statusName' },
    align: 'left',
    ellipsis: true,
    width: 120
  }
]
