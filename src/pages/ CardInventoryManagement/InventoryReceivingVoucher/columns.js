export default [
  {
    title: 'Loại xe',
    dataIndex: 'carType',
    scopedSlots: { customRender: 'carType' },
    align: 'left',
    ellipsis: true,
    width: 100
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    scopedSlots: { customRender: 'description' },
    align: 'left',
    ellipsis: true
  },
  {
    title: 'Hành động',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    align: 'center',
    ellipsis: true,
    width: 80
  }

]
