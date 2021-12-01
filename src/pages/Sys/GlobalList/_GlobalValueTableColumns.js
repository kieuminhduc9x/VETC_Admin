export default [
  {
    slots: { title: 'actionTitle' },
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 80,
    align: 'center'
  },
  {
    title: 'Giá trị',
    dataIndex: 'value',
    scopedSlots: { customRender: 'value' },
    align: 'center',
    width: 70,
    ellipsis: true
  },
  {
    title: 'Tên',
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
    title: 'Ngày hiệu lực',
    dataIndex: 'staDate',
    scopedSlots: { customRender: 'staDate' },
    width: 120,
    align: 'center'
  },
  {
    title: 'Ngày hết hiệu lực',
    dataIndex: 'endDate',
    scopedSlots: { customRender: 'endDate' },
    width: 130,
    align: 'center'
  },
  {
    title: 'Thứ tự',
    dataIndex: 'displayOrder',
    scopedSlots: { customRender: 'displayOrder' },
    align: 'center',
    width: 70,
    ellipsis: true
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
    align: 'left',
    width: 150,
    ellipsis: true
  }
  /*
  {
    title: 'Người tạo',
    dataIndex: 'createUser',
    scopedSlots: { customRender: 'createUser' },
    align: 'left',
    width: 150,
    ellipsis: true
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createDatetime',
    scopedSlots: { customRender: 'createDatetime' },
    align: 'center',
    width: 150,
    ellipsis: true
  },
  {
    title: 'Người cập nhật',
    dataIndex: 'updateUser',
    scopedSlots: { customRender: 'updateUser' },
    align: 'left',
    width: 150,
    ellipsis: true
  },
  {
    title: 'Ngày cập nhật',
    dataIndex: 'updateDatetime',
    scopedSlots: { customRender: 'updateDatetime' },
    align: 'center',
    width: 150,
    ellipsis: true
  },
  */
]
