export default [
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
    ellipsis: true,
    width: 120

  },
  {
    title: 'Đến Tỉnh/TP',
    dataIndex: 'toProvince',
    scopedSlots: { customRender: 'toProvince' },
    align: 'left',
    ellipsis: true,
    width: 120

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
    title: 'Tổng khối lượng',
    dataIndex: 'sumWeight',
    scopedSlots: { customRender: 'sumWeight' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Tổng số đơn hàng',
    dataIndex: 'countOrder',
    scopedSlots: { customRender: 'countOrder' },
    align: 'center',
    ellipsis: true,
    width: 120

  }
]
