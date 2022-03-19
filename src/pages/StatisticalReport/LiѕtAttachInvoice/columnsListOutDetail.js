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
    title: 'Loại xe',
    dataIndex: 'loaixe',
    scopedSlots: { customRender: 'loaixe' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Thiết bị',
    dataIndex: 'thietbi',
    scopedSlots: { customRender: 'thietbi' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Trạm vào',
    dataIndex: 'tramvao',
    scopedSlots: { customRender: 'tramvao' },
    align: 'right',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Giá vé',
    dataIndex: 'giave',
    scopedSlots: { customRender: 'giave' },
    align: 'right',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Số lượng có thẻ',
    dataIndex: 'soluongcothe',
    scopedSlots: { customRender: 'soluongcothe' },
    align: 'right',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Số lượng không thẻ',
    dataIndex: 'soluongkhongthe',
    scopedSlots: { customRender: 'soluongkhongthe' },
    align: 'right',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Tổng tiền mặt',
    dataIndex: 'tongtien',
    scopedSlots: { customRender: 'tongtien' },
    align: 'right',
    ellipsis: true,
    width: 120
  }

]
