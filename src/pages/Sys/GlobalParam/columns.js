export default [

  {
    slots: { title: 'code' },
    dataIndex: 'code',
    scopedSlots: { customRender: 'code' },
    align: 'left',
    ellipsis: true,
    width: 300

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
    width: 250,
    ellipsis: true
  },
  {
    slots: { title: 'value' },
    dataIndex: 'value',
    scopedSlots: { customRender: 'value' },
    align: 'left',
    ellipsis: true,
    width: 200

  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
    align: 'left',
    ellipsis: true,
    width: 200
  },
  {
    slots: { title: 'actionTitle' },
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 80,
    align: 'center'
  }
]
