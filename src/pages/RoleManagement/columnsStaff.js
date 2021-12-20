export default [
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: { customRender: 'rowIndex' },
    align: 'center',
    width: 50
  },
  {
    title: 'User Name',
    dataIndex: 'userName',
    scopedSlots: { customRender: 'userName' },
    align: 'left',
    ellipsis: true,
    width: 80
  },
  {
    title: 'Họ và tên',
    dataIndex: 'fullName',
    scopedSlots: { customRender: 'fullName' },
    align: 'left',
    ellipsis: true,
    width: 200
  }
]
