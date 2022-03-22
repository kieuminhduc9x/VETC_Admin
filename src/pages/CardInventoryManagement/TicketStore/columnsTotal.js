export default [
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: { customRender: 'rowIndex' },
    align: 'center',
    ellipsis: true,
    width: 80
  },
  {
    title: 'Loại vé',
    dataIndex: 'loaive',
    scopedSlots: { customRender: 'loaive' },
    align: 'left',
    ellipsis: true
  },
  {
    title: 'Trạm vào',
    dataIndex: 'tramvao',
    scopedSlots: { customRender: 'tramvao' },
    align: 'left',
    ellipsis: true
  },
  {
    title: 'Mệnh giá',
    dataIndex: 'menhgia',
    scopedSlots: { customRender: 'menhgia' },
    align: 'right',
    ellipsis: true
  },
  {
    title: 'Ký hiệu',
    dataIndex: 'kyhieu',
    scopedSlots: { customRender: 'kyhieu' },
    align: 'left',
    ellipsis: true
  },
  {
    title: 'Số lượng tồn',
    dataIndex: 'soluongton',
    scopedSlots: { customRender: 'soluongton' },
    align: 'right',
    ellipsis: true
  },
  {
    title: 'Nhân viên',
    dataIndex: 'nhanvien',
    scopedSlots: { customRender: 'nhanvien' },
    align: 'left',
    ellipsis: true
  }

]
