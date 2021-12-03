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
    title: 'Mã kho',
    dataIndex: 'warehouseName',
    scopedSlots: { customRender: 'warehouseName' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Mã đơn hàng',
    dataIndex: 'voucherCode',
    scopedSlots: { customRender: 'voucherCode' },
    align: 'left',
    ellipsis: true,
    width: 200
  },
  {
    title: 'Ngày giao dịch',
    dataIndex: 'importAt',
    scopedSlots: { customRender: 'importAt' },
    align: 'center',
    ellipsis: true,
    width: 150

  },
  {
    title: 'Kho chuyển đến',
    dataIndex: 'preOrderNo',
    scopedSlots: { customRender: 'preOrderNo' },
    align: 'left',
    ellipsis: true,
    width: 250
  },
  {
    title: 'Tổng số kiện',
    dataIndex: 'total',
    scopedSlots: { customRender: 'total' },
    align: 'left',
    ellipsis: true,
    width: 150
  }
]
