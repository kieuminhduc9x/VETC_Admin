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
    width: 120,
    ellipsis: true
  },
  {
    title: 'Người đặt',
    dataIndex: 'senderName',
    scopedSlots: { customRender: 'senderName' },
    align: 'left',
    ellipsis: true
  },
  {
    title: 'Từ Tỉnh/TP',
    dataIndex: 'fromProvince',
    scopedSlots: { customRender: 'fromProvince' },
    align: 'left',
    ellipsis: true

  },
  {
    title: 'Đến Tỉnh/TP',
    dataIndex: 'toProvince',
    scopedSlots: { customRender: 'toProvince' },
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
    title: 'Khối lượng (Kg)',
    dataIndex: 'weight',
    scopedSlots: { customRender: 'weight' },
    align: 'right',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Loại hàng hóa',
    dataIndex: 'productName',
    scopedSlots: { customRender: 'productName' },
    align: 'left',
    ellipsis: true

  },
  {
    title: 'Thông tin Bike giao',
    dataIndex: 'shipperName',
    scopedSlots: { customRender: 'shipperName' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    slots: { title: 'actionTitle' },
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 120,
    align: 'center'
  }
]
