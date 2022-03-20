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
    title: 'Số phiếu',
    dataIndex: 'sophieu',
    scopedSlots: { customRender: 'sophieu' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Ngày bắt đầu',
    dataIndex: 'ngaybatdau',
    scopedSlots: { customRender: 'ngaybatdau' },
    align: 'center',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Ngày kết thúc',
    dataIndex: 'ngayketthuc',
    scopedSlots: { customRender: 'ngayketthuc' },
    align: 'center',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Tên đơn vị',
    dataIndex: 'tendonvi',
    scopedSlots: { customRender: 'tendonvi' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Ngày lập BE',
    dataIndex: 'ngaylapbe',
    scopedSlots: { customRender: 'ngaylapbe' },
    align: 'center',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Loại vé',
    dataIndex: 'loaive',
    scopedSlots: { customRender: 'loaive' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'ngaytao',
    scopedSlots: { customRender: 'ngaytao' },
    align: 'center',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Người tạo',
    dataIndex: 'nguoitao',
    scopedSlots: { customRender: 'nguoitao' },
    align: 'left',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Tổng tiền',
    dataIndex: 'tongtien',
    scopedSlots: { customRender: 'tongtien' },
    align: 'right',
    ellipsis: true,
    width: 120
  },
  {
    title: 'Ghi chú',
    dataIndex: 'ghichu',
    scopedSlots: { customRender: 'ghichu' },
    align: 'left',
    ellipsis: true,
    width: 120
  }

]
