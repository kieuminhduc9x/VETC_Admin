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
    title: 'Tên đăng nhập',
    dataIndex: 'userName',
    scopedSlots: { customRender: 'userName' },
    align: 'left',
    ellipsis: true,
    width: 300

  },

  {
    title: 'Tên đầy đủ',
    dataIndex: 'fullName',
    scopedSlots: { customRender: 'fullName' },
    align: 'left',
    ellipsis: true

  },
  {
    title: 'Email',
    dataIndex: 'email',
    scopedSlots: { customRender: 'email' },
    align: 'left',
    ellipsis: true,
    width: 250
  },
  {
    title: 'Điện thoại',
    dataIndex: 'phone',
    scopedSlots: { customRender: 'phone' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    slots: { title: 'actionTitle' },
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 120,
    align: 'center'
  }
]
