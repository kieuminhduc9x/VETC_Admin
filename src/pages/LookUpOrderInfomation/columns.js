export default [
  {
    slots: { title: 'actionTitle' },
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 50,
    align: 'center'
  },
  {
    title: 'Mã ĐH',
    dataIndex: 'orderId',
    scopedSlots: { customRender: 'orderId' },
    align: 'center',
    ellipsis: true,
    width: 70

  },
  {
    title: 'Mã VNA Mall',
    dataIndex: 'vnaMallOrderNumber',
    scopedSlots: { customRender: 'vnaMallOrderNumber' },
    align: 'left',
    width: 130,
    ellipsis: true

  },
  {
    title: 'Nơi gửi',
    dataIndex: 'sendAddress',
    scopedSlots: { customRender: 'sendAddress' },
    align: 'left',
    width: 250,
    ellipsis: true

  },
  {
    title: 'Nơi Nhận',
    dataIndex: 'receiveAddress',
    scopedSlots: { customRender: 'receiveAddress' },
    align: 'left',
    width: 250,
    ellipsis: true

  },
  {
    title: 'Tên người nhận',
    dataIndex: 'receiverName',
    scopedSlots: { customRender: 'receiverName' },
    align: 'left',
    width: 120,
    ellipsis: true

  },
  {
    title: 'SĐT nhận',
    dataIndex: 'receiverPhone',
    scopedSlots: { customRender: 'receiverPhone' },
    align: 'right',
    width: 100,
    ellipsis: true

  },
  {
    title: 'Trạng thái đơn hàng',
    dataIndex: 'orderStatusName',
    scopedSlots: { customRender: 'orderStatusName' },
    align: 'left',
    width: 150,
    ellipsis: true

  },
  {
    title: 'Đối tác vận chuyển',
    dataIndex: 'transportCompanyName',
    scopedSlots: { customRender: 'transportCompanyName' },
    align: 'left',
    ellipsis: true,
    width: 100
  },
  {
    title: 'Thông tin vận chuyển',
    dataIndex: 'shipperInfo',
    scopedSlots: { customRender: 'shipperInfo' },
    align: 'left',
    ellipsis: true,
    width: 250
  },
  {
    title: 'Ngày giao hàng',
    dataIndex: 'timeSend',
    scopedSlots: { customRender: 'timeSend' },
    align: 'center',
    ellipsis: true,
    width: 180
  },
  {
    title: 'Nhà bán hàng',
    dataIndex: 'hrvSupplierName',
    scopedSlots: { customRender: 'hrvSupplierName' },
    align: 'left',
    ellipsis: true,
    width: 180
  }
]
