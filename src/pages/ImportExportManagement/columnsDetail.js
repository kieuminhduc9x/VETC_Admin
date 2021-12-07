export default [

  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: { customRender: 'rowIndex' },
    align: 'center',
    width: 50
  },
  {
    title: 'IMEI thiết bị',
    dataIndex: 'imeiScanDevice',
    scopedSlots: { customRender: 'imeiScanDevice' },
    align: 'right',
    ellipsis: true,
    width: 250
  },
  {
    title: 'Số thùng',
    dataIndex: 'cartonNo',
    scopedSlots: { customRender: 'cartonNo' },
    align: 'left',
    ellipsis: true
    // width: 200
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createAt',
    scopedSlots: { customRender: 'createAt' },
    align: 'center',
    ellipsis: true,
    width: 150

  }
]
