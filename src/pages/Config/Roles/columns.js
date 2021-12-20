export default [
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: { customRender: 'rowIndex' },
    align: 'center',
    width: 50
  },
  {
    title: 'Mã vai trò',
    dataIndex: 'code',
    scopedSlots: { customRender: 'code' },
    align: 'left',
    ellipsis: true,
    width: 200
  },
  {
    title: 'Tên vai trò',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
    align: 'left',
    ellipsis: true,
    width: 250
  },
  {
    title: 'Người tạo',
    dataIndex: 'createBy',
    scopedSlots: { customRender: 'createBy' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createAt',
    scopedSlots: { customRender: 'createAt' },
    align: 'center',
    ellipsis: true,
    width: 120
  },
  {
    slots: { title: 'actionTitle' },
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 80,
    align: 'center'
  }
]
