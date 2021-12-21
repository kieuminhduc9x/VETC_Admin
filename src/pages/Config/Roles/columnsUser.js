export default [
  {
    slots: { title: 'actionTitle' },
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 50,
    align: 'center'
  },
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: { customRender: 'rowIndex' },
    align: 'center',
    width: 50
  },
  {
    title: 'Tài khoản',
    dataIndex: 'userName',
    scopedSlots: { customRender: 'userName' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Họ tên',
    dataIndex: 'fullName',
    scopedSlots: { customRender: 'fullName' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Email',
    dataIndex: 'email',
    scopedSlots: { customRender: 'email' },
    align: 'left',
    ellipsis: true,
    width: 200
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    scopedSlots: { customRender: 'phone' },
    align: 'right',
    ellipsis: true,
    width: 120
  }
]
