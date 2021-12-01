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
    title: 'Khung giờ bay',
    dataIndex: 'flightTime',
    scopedSlots: { customRender: 'flightTime' },
    align: 'center',
    ellipsis: true,
    width: 200
  },

  {
    title: 'Ngày hiệu lực',
    dataIndex: 'startDate',
    scopedSlots: { customRender: 'startDate' },
    align: 'center',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Ngày hết hiệu lực',
    dataIndex: 'endDate',
    scopedSlots: { customRender: 'endDate' },
    align: 'center',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Tải tối đa (Kg)',
    dataIndex: 'safeLoad',
    scopedSlots: { customRender: 'safeLoad' },
    align: 'right',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
    align: 'center',
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
