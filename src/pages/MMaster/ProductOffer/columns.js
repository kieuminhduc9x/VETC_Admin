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
    title: 'Khung thời gian',
    dataIndex: 'fromTime',
    scopedSlots: { customRender: 'fromTime' },
    align: 'center',
    ellipsis: true

  },
  {
    title: 'Trọng lượng đầu tiên (Kg)',
    dataIndex: 'firstWeight',
    scopedSlots: { customRender: 'firstWeight' },
    align: 'right',
    ellipsis: true

  },
  {
    title: 'Giá block đầu tiên (VNĐ)',
    dataIndex: 'firstPrice',
    scopedSlots: { customRender: 'firstPrice' },
    align: 'right',
    ellipsis: true

  },
  {
    title: 'Giá mỗi kg tiếp theo (VNĐ)',
    dataIndex: 'nextPrice',
    scopedSlots: { customRender: 'nextPrice' },
    align: 'right',
    ellipsis: true

  },
  {
    title: 'Ngày hiệu lực',
    dataIndex: 'startDate',
    scopedSlots: { customRender: 'startDate' },
    align: 'center',
    ellipsis: true

  },
  {
    title: 'Ngày hết hiệu lực',
    dataIndex: 'endDate',
    scopedSlots: { customRender: 'endDate' },
    align: 'center',
    ellipsis: true

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
