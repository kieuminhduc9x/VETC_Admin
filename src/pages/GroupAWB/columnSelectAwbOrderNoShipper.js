export default [
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: {
      customRender: 'rowIndex'
    },
    align: 'center',
    ellipsis: true,
    width: 50
  },
  {
    title: 'Mã vận đơn',
    dataIndex: 'orderId',
    scopedSlots: { customRender: 'orderId' },
    align: 'right',
    ellipsis: true,
    width: 90

  },
  {
    title: 'Ngày đặt',
    dataIndex: 'orderDate',
    scopedSlots: { customRender: 'orderDate' },
    align: 'center',
    width: 120,
    ellipsis: true
  },
  {
    title: 'Người đặt',
    dataIndex: 'senderName',
    scopedSlots: { customRender: 'senderName' },
    align: 'left',
    width: 120,
    ellipsis: true
  },
  {
    title: 'Từ Tỉnh/TP',
    dataIndex: 'fromProvinceName',
    scopedSlots: { customRender: 'fromProvinceName' },
    align: 'left',
    width: 120,
    ellipsis: true

  },
  {
    title: 'Đến Tỉnh/TP',
    dataIndex: 'toProvinceName',
    scopedSlots: { customRender: 'toProvinceName' },
    align: 'left',
    width: 120,
    ellipsis: true

  },
  {
    title: 'Chuyến bay',
    dataIndex: 'flightCode',
    scopedSlots: { customRender: 'flightCode' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Khối lượng (Kg)',
    dataIndex: 'weight',
    scopedSlots: { customRender: 'weight' },
    align: 'right',
    ellipsis: true,
    width: 90
  },
  {
    title: 'Loại hàng hóa',
    dataIndex: 'productTypeName',
    scopedSlots: { customRender: 'productTypeName' },
    align: 'left',
    width: 120,
    ellipsis: true

  },
  {
    slots: { title: 'actionTitle' },
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 120,
    align: 'center'
  }
]
