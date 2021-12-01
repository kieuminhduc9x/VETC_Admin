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
    title: 'Mã',
    dataIndex: 'productId',
    scopedSlots: { customRender: 'productId' },
    align: 'left',
    ellipsis: true,
    width: 120

  },

  {
    title: 'Loại hàng hóa',
    dataIndex: 'productName',
    scopedSlots: { customRender: 'productName' },
    align: 'left',
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
