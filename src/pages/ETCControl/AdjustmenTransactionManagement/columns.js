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
    width: 120
  },
  {
    title: 'Số GD nội bộ',
    dataIndex: 'sogdnoibo',
    scopedSlots: { customRender: 'sogdnoibo' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Mã giao dịch',
    dataIndex: 'magiaodich',
    scopedSlots: { customRender: 'magiaodich' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Ngày đối soát',
    dataIndex: 'ngaydoisoat',
    scopedSlots: { customRender: 'ngaydoisoat' },
    align: 'center',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Giá vé trước ĐC',
    dataIndex: 'giavetruoc',
    scopedSlots: { customRender: 'giavetruoc' },
    align: 'right',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Giá vé sau ĐC',
    dataIndex: 'giavesau',
    scopedSlots: { customRender: 'giavesau' },
    align: 'right',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Trạng thái trước ĐC',
    dataIndex: 'trangthaitruoc',
    scopedSlots: { customRender: 'trangthaitruoc' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Trạng thái sau ĐC',
    dataIndex: 'trangthaisau',
    scopedSlots: { customRender: 'trangthaisau' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Ghi chú',
    dataIndex: 'ghichu',
    scopedSlots: { customRender: 'ghichu' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Người ĐC',
    dataIndex: 'nguoi',
    scopedSlots: { customRender: 'nguoi' },
    align: 'left',
    ellipsis: true,
    width: 120
  }

]
