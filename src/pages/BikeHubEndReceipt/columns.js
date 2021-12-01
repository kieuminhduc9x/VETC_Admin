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
    align: 'left',
    ellipsis: true,
    width: 120

  },
  {
    title: 'Ngày đặt',
    dataIndex: 'orderDate',
    scopedSlots: { customRender: 'orderDate' },
    align: 'left',
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
    title: 'Chuyến bay',
    dataIndex: 'flightCode',
    scopedSlots: { customRender: 'flightCode' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Khối lượng',
    dataIndex: 'weight',
    scopedSlots: { customRender: 'weight' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Loại hàng hóa',
    dataIndex: 'productTypeName',
    scopedSlots: { customRender: 'productTypeName' },
    align: 'left',
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
    title: 'Thông tin Bike giao',
    dataIndex: 'shipperName',
    scopedSlots: { customRender: 'shipperName' },
    align: 'left',
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
