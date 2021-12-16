export default [
  {
    slots: { title: 'actionTitle' },
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    align: 'center',
    width: 50
  },
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: { customRender: 'rowIndex' },
    align: 'center',
    width: 50
  },
  {
    title: 'Mã đơn tổng',
    dataIndex: 'code',
    scopedSlots: { customRender: 'code' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Mã đơn đặt hàng',
    dataIndex: 'orderCode',
    scopedSlots: { customRender: 'orderCode' },
    align: 'left',
    ellipsis: true,
    width: 200
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createAt',
    scopedSlots: { customRender: 'createAt' },
    align: 'center',
    ellipsis: true,
    width: 150

  },
  {
    title: 'Ngày hoàn thành',
    dataIndex: 'completeDate',
    scopedSlots: { customRender: 'completeDate' },
    align: 'left',
    ellipsis: true,
    width: 250
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
