export default [
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: { customRender: 'rowIndex' },
    align: 'center',
    width: 50
  },
  {
    title: 'Mã đơn hàng',
    dataIndex: 'orderCode',
    scopedSlots: { customRender: 'orderCode' },
    align: 'left',
    ellipsis: true,
    width: 200
  },
  {
    title: 'Trạng thái đơn hàng',
    dataIndex: 'orderStatus',
    scopedSlots: { customRender: 'orderStatus' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Hình thức giao hàng',
    dataIndex: 'deliveryMethod',
    scopedSlots: { customRender: 'deliveryMethod' },
    align: 'left',
    ellipsis: true,
    width: 150

  },
  {
    title: 'Ngày khởi tạo đơn hàng',
    dataIndex: 'signDate',
    scopedSlots: { customRender: 'signDate' },
    align: 'center',
    ellipsis: true,
    width: 120
  },

  {
    title: 'Ngày giao hàng thực tế',
    dataIndex: 'deliveryDate',
    scopedSlots: { customRender: 'deliveryDate' },
    align: 'center',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Ngày hoàn trả (nếu có)',
    dataIndex: 'endDate',
    scopedSlots: { customRender: 'endDate' },
    align: 'center',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Danh mục hàng hóa',
    dataIndex: 'safeLoad',
    scopedSlots: { customRender: 'safeLoad' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    scopedSlots: { customRender: 'quantity' },
    align: 'right',
    ellipsis: true,
    width: 150

  },
  {
    title: 'Giá bán hàng hóa',
    dataIndex: 'productPrice',
    scopedSlots: { customRender: 'productPrice' },
    align: 'right',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Doanh thu bán hàng qua Sàn ',
    dataIndex: 'productPrice2',
    scopedSlots: { customRender: 'productPrice2' },
    align: 'right',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Phí dịch vụ',
    align: 'center',
    children: [
      {
        title: 'Mức phí cố định',
        dataIndex: 'feeFix',
        scopedSlots: { customRender: 'feeFix' },
        align: 'right',
        ellipsis: true,
        width: 150
      },
      {
        title: 'Thành tiền',
        dataIndex: 'price',
        scopedSlots: { customRender: 'price' },
        align: 'right',
        ellipsis: true,
        width: 150
      },
      {
        title: 'Phí phát sinh khác (do NBH)',
        dataIndex: 'price2',
        scopedSlots: { customRender: 'price2' },
        align: 'right',
        ellipsis: true,
        width: 150
      },
      {
        title: 'Tổng Phí dịch vụ',
        dataIndex: 'price22',
        scopedSlots: { customRender: 'price22' },
        align: 'right',
        ellipsis: true,
        width: 150
      }
    ]
  },
  {
    title: 'Phải trả Nhà Bán Hàng',
    dataIndex: 'feeFix2',
    scopedSlots: { customRender: 'feeFix2' },
    align: 'right',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
    scopedSlots: { customRender: 'note' },
    align: 'left',
    ellipsis: true,
    width: 200
  }
]
