export default [
  {
    title: 'Mã GD',
    dataIndex: 'code',
    scopedSlots: { customRender: 'code' },
    align: 'center',
    ellipsis: true,
    width: 100
  },
  {
    title: 'Etag/UID',
    dataIndex: 'uid',
    scopedSlots: { customRender: 'uid' },
    align: 'left',
    ellipsis: true,
    width: 200
  },
  {
    title: 'Giờ vào',
    dataIndex: 'timein',
    scopedSlots: { customRender: 'timein' },
    align: 'center',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Giờ ra',
    dataIndex: 'timeout',
    scopedSlots: { customRender: 'timeout' },
    align: 'center',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Trạm vào',
    dataIndex: 'tramvao',
    scopedSlots: { customRender: 'tramvao' },
    align: 'left',
    ellipsis: true,
    width: 120
  },

  {
    title: 'Làn vào',
    dataIndex: 'lanvao',
    scopedSlots: { customRender: 'lanvao' },
    align: 'left',
    ellipsis: true,
    width: 80
  },
  {
    title: 'Trạm ra',
    dataIndex: 'tramra',
    scopedSlots: { customRender: 'tramra' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Làn ra',
    dataIndex: 'lanra',
    scopedSlots: { customRender: 'lanra' },
    align: 'left',
    ellipsis: true,
    width: 80
  },
  {
    title: 'Biển số vào',
    dataIndex: 'bsvao',
    scopedSlots: { customRender: 'bsvao' },
    align: 'left',
    ellipsis: true,
    width: 100
  },
  {
    title: 'Biển số ra',
    dataIndex: 'bsra',
    scopedSlots: { customRender: 'bsra' },
    align: 'left',
    ellipsis: true,
    width: 100
  },
  {
    title: 'Giá tiền',
    dataIndex: 'gia',
    scopedSlots: { customRender: 'gia' },
    align: 'right',
    ellipsis: true,
    width: 100
  }
]
