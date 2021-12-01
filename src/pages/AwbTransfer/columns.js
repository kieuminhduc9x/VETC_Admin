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
    title: 'Mã AWB',
    dataIndex: 'awbCode',
    scopedSlots: { customRender: 'awbCode' },
    align: 'left',
    ellipsis: true,
    width: 120

  },
  {
    title: 'Ngày đặt',
    dataIndex: 'orderMergeDate',
    scopedSlots: { customRender: 'orderMergeDate' },
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
    title: 'Mã chuyến bay',
    dataIndex: 'flightCode',
    scopedSlots: { customRender: 'flightCode' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Giờ khởi hành',
    dataIndex: 'takeOffTime',
    scopedSlots: { customRender: 'takeOffTime' },
    align: 'center',
    width: 150,
    ellipsis: true
  },
  {
    title: 'Tổng khối lượng (Kg)',
    dataIndex: 'sumWeight',
    scopedSlots: { customRender: 'sumWeight' },
    align: 'right',
    ellipsis: true,
    width: 170
  },
  {
    title: 'Tổng số đơn hàng',
    dataIndex: 'countOrder',
    scopedSlots: { customRender: 'countOrder' },
    align: 'right',
    width: 170,
    ellipsis: true

  },
  {
    title: 'Trạng thái',
    dataIndex: 'statusName',
    scopedSlots: { customRender: 'statusName' },
    align: 'center',
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
