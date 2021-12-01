export default [
  {
    slots: { title: 'code' },
    dataIndex: 'code',
    scopedSlots: { customRender: 'code' },
    align: 'left',
    ellipsis: true,
    width: 250

  },
  {
    slots: { title: 'name' },
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
    align: 'left',
    width: 250,
    ellipsis: true
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    scopedSlots: { customRender: 'description' },
    align: 'left',
    ellipsis: true
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    slots: { title: 'actionTitle' },
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 80,
    align: 'center'
  }
]
