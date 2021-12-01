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
    dataIndex: 'warehouseCode',
    scopedSlots: { customRender: 'warehouseCode' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Tên kho',
    dataIndex: 'warehouseName',
    scopedSlots: { customRender: 'warehouseName' },
    align: 'left',
    ellipsis: true,
    width: 200
  },
  {
    title: 'Tỉnh/TP',
    dataIndex: 'province',
    scopedSlots: { customRender: 'province' },
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
    title: 'Số thuê bao',
    dataIndex: 'phone',
    scopedSlots: { customRender: 'phone' },
    align: 'right',
    ellipsis: true,
    width: 150
  },
  {
    title: 'IMEI máy',
    dataIndex: 'imei',
    scopedSlots: { customRender: 'imei' },
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
