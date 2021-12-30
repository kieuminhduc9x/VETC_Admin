export default [

  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: { customRender: 'rowIndex' },
    align: 'center',
    width: 50
  },
  {
    title: 'Shoppe PO Id',
    dataIndex: 'shopeePoId',
    scopedSlots: { customRender: 'shopeePoId' },
    align: 'right',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Mã kiện hàng',
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
