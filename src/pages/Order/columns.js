export default [
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: {
      customRender: 'rowIndex'
    },
    align: 'center',
    ellipsis: true,
    width: 80
  },
  {
    title: 'Mã vận đơn',
    dataIndex: 'orderId',
    scopedSlots: { customRender: 'orderId' },
    align: 'right',
    ellipsis: true,
    width: 120

  },
  {
    title: 'Ngày đặt',
    dataIndex: 'orderDate',
    scopedSlots: { customRender: 'orderDate' },
    align: 'center',
    width: 150,
    ellipsis: true
  },
  {
    title: 'Nơi gửi',
    dataIndex: 'sendAddress',
    scopedSlots: { customRender: 'sendAddress' },
    align: 'left',
    ellipsis: true

  },
  {
    title: 'Nơi Nhận',
    dataIndex: 'receiveAddress',
    scopedSlots: { customRender: 'receiveAddress' },
    align: 'left',
    ellipsis: true

  },
  {
    title: 'Khung giờ bay',
    dataIndex: 'flightTimeFrame',
    scopedSlots: { customRender: 'flightTimeFrame' },
    align: 'center',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Khối lượng',
    dataIndex: 'weight',
    scopedSlots: { customRender: 'weight' },
    align: 'right',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Mô tả',
    dataIndex: 'productDesc',
    scopedSlots: { customRender: 'productDesc' },
    align: 'left',
    ellipsis: true

  },
  {
    title: 'Bước vận chuyển',
    dataIndex: 'shippingStatusName',
    scopedSlots: { customRender: 'shippingStatusName' },
    align: 'left',
    ellipsis: true

  },
  {
    slots: { title: 'actionTitle' },
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 50,
    align: 'center'
  }
]
