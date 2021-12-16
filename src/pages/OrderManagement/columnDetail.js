export default [
  {
    slots: { title: 'actionTitle' },
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    align: 'center',
    width: 50
  },
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: { customRender: 'rowIndex' },
    align: 'center',
    width: 50
  },
  {
    title: 'Mã phiếu xuất nhập',
    dataIndex: 'code',
    scopedSlots: { customRender: 'code' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Ngày nhập',
    dataIndex: 'importDate',
    scopedSlots: { customRender: 'importDate' },
    align: 'center',
    ellipsis: true,
    width: 150

  },
  {
    title: 'Ngày xuất',
    dataIndex: 'exportDate',
    scopedSlots: { customRender: 'exportDate' },
    align: 'center',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Trạng thái ',
    dataIndex: 'statusName',
    scopedSlots: { customRender: 'statusName' },
    align: 'left',
    ellipsis: true,
    width: 120
  }
]
