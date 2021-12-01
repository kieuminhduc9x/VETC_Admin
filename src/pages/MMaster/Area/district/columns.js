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
    title: 'Mã Xã/Phường',
    dataIndex: 'precinctCode',
    scopedSlots: { customRender: 'precinctCode' },
    align: 'left',
    ellipsis: true

  },

  {
    title: 'Tên Xã/Phường',
    dataIndex: 'precinctName',
    scopedSlots: { customRender: 'precinctName' },
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
    title: 'Tỉnh/TP',
    dataIndex: 'provinceName',
    scopedSlots: { customRender: 'provinceName' },
    align: 'left',
    ellipsis: true

  }
]
