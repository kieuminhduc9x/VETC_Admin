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
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Tổng khối lượng (Kg)',
    dataIndex: 'sumWeight',
    scopedSlots: { customRender: 'sumWeight' },
    align: 'right',
    ellipsis: true,
    width: 180
  },
  {
    title: 'Tổng số đơn hàng',
    dataIndex: 'countOrder',
    scopedSlots: { customRender: 'countOrder' },
    align: 'right',
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
