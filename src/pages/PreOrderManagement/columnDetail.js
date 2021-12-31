export default [
  // {
  //   slots: { title: 'actionTitle' },
  //   dataIndex: 'operation',
  //   scopedSlots: { customRender: 'operation' },
  //   align: 'center',
  //   width: 50
  // },
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: { customRender: 'rowIndex' },
    align: 'center',
    width: 50
  },
  {
    title: 'Shopee PO ID',
    dataIndex: 'shopeePoId',
    scopedSlots: { customRender: 'shopeePoId' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Mã kiện hàng',
    dataIndex: 'cartonNo',
    scopedSlots: { customRender: 'cartonNo' },
    align: 'left',
    ellipsis: true,
    width: 200

  },
  {
    title: 'Tên hàng',
    dataIndex: 'descOfGoods',
    scopedSlots: { customRender: 'descOfGoods' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Ngày giao hàng',
    dataIndex: 'dateOfReceived',
    scopedSlots: { customRender: 'dateOfReceived' },
    align: 'center',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Trạng thái ',
    dataIndex: 'statusName',
    scopedSlots: { customRender: 'statusName' },
    align: 'left',
    ellipsis: true,
    width: 120
  }
]
