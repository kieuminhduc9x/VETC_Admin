export default [
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: { customRender: 'rowIndex' },
    align: 'center',
    width: 50
  },
  {
    title: 'Nhà bán hàng',
    dataIndex: 'shopCode',
    scopedSlots: { customRender: 'shopCode' },
    align: 'left',
    ellipsis: true,
    width: 200
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
    title: 'Mã hàng hóa',
    dataIndex: 'goodsCode',
    scopedSlots: { customRender: 'goodsCode' },
    align: 'left',
    ellipsis: true,
    width: 200
  },
  {
    title: 'Loại hàng hóa',
    dataIndex: 'goodsType',
    scopedSlots: { customRender: 'goodsType' },
    align: 'left',
    ellipsis: true,
    width: 200
  },
  {
    title: 'Tên hàng hóa',
    dataIndex: 'goodsName',
    scopedSlots: { customRender: 'goodsName' },
    align: 'left',
    ellipsis: true,
    width: 200
  },
  {
    title: 'Số lượng ',
    dataIndex: 'quantity',
    scopedSlots: { customRender: 'quantity' },
    align: 'left',
    ellipsis: true,
    width: 200
  },
  {
    title: 'Đơn vị',
    dataIndex: 'unit',
    scopedSlots: { customRender: 'unit' },
    align: 'left',
    ellipsis: true,
    width: 200
  },
  {
    title: 'Đơn giá bán',
    dataIndex: 'price',
    scopedSlots: { customRender: 'price' },
    align: 'left',
    ellipsis: true,
    width: 200
  },
  {
    title: 'Thuế GTGT',
    dataIndex: 'vat',
    scopedSlots: { customRender: 'vat' },
    align: 'left',
    ellipsis: true,
    width: 200
  },
  {
    title: 'Doanh thu Bán hàng qua sàn VNA Mall',
    align: 'center',
    children: [
      {
        title: 'Gồm thuế GTGT',
        dataIndex: 'feeFix',
        scopedSlots: { customRender: 'feeFix' },
        align: 'right',
        ellipsis: true,
        width: 150
      },
      {
        title: 'Doanh thu không thuế GTGT',
        dataIndex: 'price',
        scopedSlots: { customRender: 'price' },
        align: 'right',
        ellipsis: true,
        width: 150
      },
      {
        title: 'Thuế GTGT',
        dataIndex: 'price2',
        scopedSlots: { customRender: 'price2' },
        align: 'right',
        ellipsis: true,
        width: 150
      }
    ]
  },
  {
    title: 'Chi phí thúc đẩy bán',
    dataIndex: 'note',
    scopedSlots: { customRender: 'note' },
    align: 'right',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Chi phí phát sinh khác',
    align: 'center',
    children: [
      {
        title: 'Do NBH',
        dataIndex: 'feeFix',
        scopedSlots: { customRender: 'feeFix' },
        align: 'right',
        ellipsis: true,
        width: 150
      },
      {
        title: 'Do Sàn',
        dataIndex: 'price',
        scopedSlots: { customRender: 'price' },
        align: 'right',
        ellipsis: true,
        width: 150
      }
    ]
  },
  {
    title: 'Doanh thu dịch vụ TMĐT từ Nhà bán hàng ',
    align: 'center',
    children: [
      {
        title: 'Mức Phí dịch vụ thu NBH',
        dataIndex: 'feeFix',
        scopedSlots: { customRender: 'feeFix' },
        align: 'right',
        ellipsis: true,
        width: 200
      },
      {
        title: 'Doanh thu sàn',
        dataIndex: 'price',
        scopedSlots: { customRender: 'price' },
        align: 'right',
        ellipsis: true,
        width: 200
      }
    ]
  },

  {
    title: 'Chi phí bán phải trả VNA',
    dataIndex: 'note',
    scopedSlots: { customRender: 'note' },
    align: 'right ',
    ellipsis: true,
    width: 200
  },
  {
    title: 'Phải trả lại Nhà bán hàng (sau chiết khấu)',
    dataIndex: 'note',
    scopedSlots: { customRender: 'note' },
    align: 'right',
    ellipsis: true,
    width: 200
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
