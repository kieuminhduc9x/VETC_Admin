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
    title: 'Mã Phường xã',
    dataIndex: 'code',
    scopedSlots: { customRender: 'code' },
    align: 'left',
    ellipsis: true

  },

  {
    title: 'Tên Phường xã',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
    align: 'left',
    ellipsis: true

  },
  {
    title: 'Quận huyện',
    dataIndex: 'district',
    scopedSlots: { customRender: 'district' },
    align: 'left',
    ellipsis: true

  },
  {
    title: 'Tỉnh/TP',
    dataIndex: 'province',
    scopedSlots: { customRender: 'province' },
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
