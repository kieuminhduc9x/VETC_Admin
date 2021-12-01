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
    title: 'Mã Hub',
    dataIndex: 'hubId',
    scopedSlots: { customRender: 'hubId' },
    align: 'left',
    ellipsis: true,
    width: 120

  },
  {
    title: 'Tên Hub',
    dataIndex: 'hubName',
    scopedSlots: { customRender: 'hubName' },
    align: 'left',
    ellipsis: true,
    width: 120

  },

  {
    title: 'Tỉnh/TP',
    dataIndex: 'provinceName',
    scopedSlots: { customRender: 'provinceName' },
    align: 'left',
    ellipsis: true

  },
  {
    title: 'Quận/Huyện',
    dataIndex: 'districtName',
    scopedSlots: { customRender: 'districtName' },
    align: 'left',
    ellipsis: true

  },
  {
    title: 'Xã/Phường',
    dataIndex: 'precinctName',
    scopedSlots: { customRender: 'precinctName' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Địa chỉ chi tiết',
    dataIndex: 'address',
    scopedSlots: { customRender: 'address' },
    align: 'left',
    ellipsis: true
  },
  {
    title: 'Điện thoại',
    dataIndex: 'phone',
    scopedSlots: { customRender: 'phone' },
    align: 'left',
    ellipsis: true
  },
  {
    slots: { title: 'actionTitle' },
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 120,
    align: 'center'
  }
]
