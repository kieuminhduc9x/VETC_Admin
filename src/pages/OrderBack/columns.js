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
    dataIndex: 'createDate',
    scopedSlots: { customRender: 'createDate' },
    align: 'center',
    width: 150,
    ellipsis: true
  },
  {
    title: 'Người đặt',
    dataIndex: 'senderName',
    scopedSlots: { customRender: 'senderName' },
    align: 'center',
    width: 150,
    ellipsis: true
  },
  {
    title: 'Từ Tỉnh/TP',
    dataIndex: 'fromProvinceName',
    scopedSlots: { customRender: 'fromProvinceName' },
    align: 'left',
    ellipsis: true

  },
  {
    title: 'Đến Tỉnh/TP',
    dataIndex: 'toProvinceName',
    scopedSlots: { customRender: 'toProvinceName' },
    align: 'left',
    ellipsis: true

  },
  {
    title: 'Mô tả',
    dataIndex: 'productDesc',
    scopedSlots: { customRender: 'productDesc' },
    align: 'center',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Lý do hủy',
    dataIndex: 'reasonBack',
    scopedSlots: { customRender: 'reasonBack' },
    align: 'right',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Trạng thái',
    dataIndex: 'shippingStatusName',
    scopedSlots: { customRender: 'shippingStatusName' },
    align: 'left',
    ellipsis: true

  },
  {
    slots: { title: 'actionTitle' },
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 150,
    align: 'center'
  }
]
