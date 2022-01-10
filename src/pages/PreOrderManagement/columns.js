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
    dataIndex: 'parentNo',
    scopedSlots: { customRender: 'parentNo' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Mã đơn đặt hàng',
    dataIndex: 'no',
    scopedSlots: { customRender: 'no' },
    align: 'left',
    ellipsis: true,
    width: 200
  },
  {
    title: 'Kho đích cuối',
    dataIndex: 'receiveAddress',
    scopedSlots: { customRender: 'receiveAddress' },
    align: 'left',
    ellipsis: true,
    width: 350
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
    dataIndex: 'completeAt',
    scopedSlots: { customRender: 'completeAt' },
    align: 'left',
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
