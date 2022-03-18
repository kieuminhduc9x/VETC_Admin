export default [
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: { customRender: 'rowIndex' },
    align: 'center',
    ellipsis: true,
    width: 100
  },
  {
    title: 'Tên nhân viên',
    dataIndex: 'fullname',
    scopedSlots: { customRender: 'fullname' },
    align: 'left',
    ellipsis: true,
    width: 200
  },
  {
    title: 'Mã thẻ',
    dataIndex: 'code',
    scopedSlots: { customRender: 'code' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Tài khoản',
    dataIndex: 'account',
    scopedSlots: { customRender: 'account' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'birthday',
    scopedSlots: { customRender: 'birthday' },
    align: 'center',
    ellipsis: true,
    width: 120
  },

  {
    title: 'Chức vụ',
    dataIndex: 'position',
    scopedSlots: { customRender: 'position' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
    align: 'left',
    ellipsis: true,
    width: 120
  }
]
