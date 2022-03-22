export default [
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: { customRender: 'rowIndex' },
    align: 'center',
    ellipsis: true,
    width: 100
  },
  {
    title: 'Thao tác',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    align: 'center',
    ellipsis: true,
    width: 80
  },
  {
    title: 'Lộ trình',
    dataIndex: 'lotrinh',
    scopedSlots: { customRender: 'lotrinh' },
    align: 'left',
    ellipsis: true
  },
  {
    title: 'Loại vé',
    dataIndex: 'loaive',
    scopedSlots: { customRender: 'loaive' },
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
    align: 'right',
    ellipsis: true
  },
  {
    title: 'Từ serial',
    dataIndex: 'tuserial',
    scopedSlots: { customRender: 'tuserial' },
    align: 'right',
    ellipsis: true
  },
  {
    title: 'Đến serial',
    dataIndex: 'denserial',
    scopedSlots: { customRender: 'denserial' },
    align: 'right',
    ellipsis: true
  },
  {
    title: 'Số lượng',
    dataIndex: 'soluong',
    scopedSlots: { customRender: 'soluong' },
    align: 'right',
    ellipsis: true
  }

]
