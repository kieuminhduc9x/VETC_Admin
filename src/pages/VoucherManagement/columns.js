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
    title: 'Mã phiếu',
    dataIndex: 'voucherCode',
    scopedSlots: { customRender: 'voucherCode' },
    align: 'left',
    ellipsis: true,
    width: 200
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
    title: 'Mã đơn hàng',
    dataIndex: 'preOrderNo',
    scopedSlots: { customRender: 'preOrderNo' },
    align: 'left',
    ellipsis: true,
    width: 250
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
    title: 'Trạng thái đơn hàng',
    dataIndex: 'statusName',
    scopedSlots: { customRender: 'statusName' },
    align: 'left',
    ellipsis: true,
    width: 150
  }
]
