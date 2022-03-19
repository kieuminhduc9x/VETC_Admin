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
    title: 'Thao tác',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    align: 'center',
    ellipsis: true,
    width: 80
  },
  {
    title: 'Trạm',
    dataIndex: 'tram',
    scopedSlots: { customRender: 'tram' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Số phiếu',
    dataIndex: 'sophieu',
    scopedSlots: { customRender: 'sophieu' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Số chứng từ',
    dataIndex: 'sochungtu',
    scopedSlots: { customRender: 'sochungtu' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Ngày lập',
    dataIndex: 'ngaylap',
    scopedSlots: { customRender: 'ngaylap' },
    align: 'center',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Người lập',
    dataIndex: 'nguoilap',
    scopedSlots: { customRender: 'nguoilap' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Người nhận',
    dataIndex: 'nguoinhan',
    scopedSlots: { customRender: 'nguoinhan' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Nhập từ',
    dataIndex: 'nhaptu',
    scopedSlots: { customRender: 'nhaptu' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Ca',
    dataIndex: 'ca',
    scopedSlots: { customRender: 'ca' },
    align: 'center',
    ellipsis: true,
    width: 80
  },
  {
    title: 'Phương thức',
    dataIndex: 'phuongthuc',
    scopedSlots: { customRender: 'phuongthuc' },
    align: 'left',
    ellipsis: true,
    width: 200
  },
  {
    title: 'Ghi chú',
    dataIndex: 'ghichu',
    scopedSlots: { customRender: 'ghichu' },
    align: 'left',
    ellipsis: true,
    width: 150
  }

]
