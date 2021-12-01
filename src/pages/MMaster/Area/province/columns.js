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
    title: 'Mã Quận/Huyện',
    dataIndex: 'districtCode',
    scopedSlots: { customRender: 'districtCode' },
    align: 'left',
    ellipsis: true

  },

  {
    title: 'Tên Quận/Huyện',
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
