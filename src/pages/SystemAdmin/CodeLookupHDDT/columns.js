export default [
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: { customRender: 'rowIndex' },
    align: 'center',
    ellipsis: true,
    width: 80
  },
  {
    title: 'Thời gian',
    dataIndex: 'thoigian',
    scopedSlots: { customRender: 'thoigian' },
    align: 'center',
    ellipsis: true,
    width: 120
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
    title: 'Trạm ra',
    dataIndex: 'tramra',
    scopedSlots: { customRender: 'tramra' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Biển số',
    dataIndex: 'bienso',
    scopedSlots: { customRender: 'bienso' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Mã tra cứu HDDT',
    dataIndex: 'matracuu',
    scopedSlots: { customRender: 'matracuu' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Loại vé',
    dataIndex: 'loaive',
    scopedSlots: { customRender: 'loaive' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Thu phí viên',
    dataIndex: 'thuphivien',
    scopedSlots: { customRender: 'thuphivien' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Thao tác',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    align: 'center',
    ellipsis: true,
    width: 80
  }

]
