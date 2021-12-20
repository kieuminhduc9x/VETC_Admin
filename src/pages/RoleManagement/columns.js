export default [
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: { customRender: 'rowIndex' },
    align: 'center',
    width: 50
  },
  {
    title: 'Mã kho',
    dataIndex: 'code',
    scopedSlots: { customRender: 'code' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Tên kho',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
    align: 'left',
    ellipsis: true,
    width: 200
  },
  {
    title: 'Tỉnh/TP',
    dataIndex: 'provinceName',
    scopedSlots: { customRender: 'provinceName' },
    align: 'left',
    ellipsis: true,
    width: 150

  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    scopedSlots: { customRender: 'address' },
    align: 'left',
    ellipsis: true,
    width: 250
  },

  {
    title: 'Người quản lý',
    dataIndex: 'managerName',
    scopedSlots: { customRender: 'managerName' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Điện thoại',
    dataIndex: 'phone',
    scopedSlots: { customRender: 'phone' },
    align: 'right',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Kho cấp trên',
    dataIndex: 'parentWarehouseName',
    scopedSlots: { customRender: 'parentWarehouseName' },
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
