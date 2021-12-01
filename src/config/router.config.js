
export const asyncRouterMap = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../pages/Dashboard/index.vue'),
    meta: {
      authRequired: true,
      head: {
        title: 'Dashboard',
        description: 'Dashboard'
      }
    }
  },
  {
    path: '/admin/login',
    name: 'login',
    component: () => import('../pages/Sys/Login.vue'),
    meta: { authRequired: false }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../pages/Sys/Profile/index.vue'),
    meta: {
      authRequired: true,
      head: {
        title: 'Hồ sơ',
        description: 'Hồ sơ'
      }
    }
  },
  {
    path: '/hub-start',
    name: 'hubstart',
    component: () => import('../pages/HubStart/index.vue'),
    meta: {
      authRequired: true,
      head: {
        title: 'Nhận vận đơn tại Hub đầu',
        description: 'Nhận vận đơn tại Hub đầu'
      }
    }
  },
  {
    path: '/hub-end',
    name: 'hubend',
    component: () => import('../pages/HubEnd/index.vue'),
    meta: {
      authRequired: true,
      head: {
        title: 'Nhận AWB tại Hub cuối',
        description: 'Nhận AWB tại Hub cuối'
      }
    }
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../pages/Order/index.vue'),
    meta: {
      authRequired: true,
      head: {
        title: 'Tra cứu thông tin vận đơn',
        description: 'Tra cứu thông tin vận đơn'
      }
    }
  },
  // {
  //   path: '/order/:id/detail',
  //   name: 'order_detail',
  //   component: () => import('../pages/Order/detail'),
  //   meta: {
  //     authRequired: true,
  //     head: {
  //       title: 'Thông tin chi tiết vận đơn',
  //       description: 'Thông tin chi tiết vận đơn'
  //     }
  //   }
  //
  // },
  {
    path: '/group-awb',
    name: 'groupawb',
    component: () => import('../pages/GroupAWB/index.vue'),
    meta: {
      authRequired: true,
      head: {
        title: 'Gộp vận đơn hàng không AWB tại Hub đầu',
        description: 'Gộp vận đơn hàng không AWB tại Hub đầu'
      }
    }
  },
  {
    path: '/awb-transfer',
    name: 'awbflight',
    component: () => import('../pages/AwbTransfer/index.vue'),
    meta: {
      authRequired: true,
      head: {
        title: 'Chuyển AWB ra tàu bay tại Hub đầu',
        description: 'Chuyển AWB ra tàu bay tại Hub đầu'
      }
    }
  },
  {
    path: '/bike-hub-end',
    name: 'bikehubend',
    component: () => import('../pages/BikeHubEnd/index.vue'),
    meta: {
      authRequired: true,
      head: {
        title: 'Đặt Bike giao hàng cho Đơn hàng tại Hub cuối',
        description: 'Đặt Bike giao hàng cho Đơn hàng tại Hub cuối'
      }
    }
  },
  {
    path: '/bike-hub-end-receipt',
    name: 'bikehubendreceipt',
    component: () => import('../pages/BikeHubEndReceipt/index.vue'),
    meta: {
      authRequired: true,
      head: {
        title: 'Giao hàng cho Bike tại Hub cuối',
        description: 'Giao hàng cho Bike tại Hub cuối'
      }
    }
  },
  {
    path: '/flight',
    name: 'flight',
    component: () => import('../pages/MMaster/Flight/index.vue'),
    meta: {
      authRequired: true,
      head: {
        title: 'Danh mục chuyến bay',
        description: 'Danh mục chuyến bay'
      }
    }
  },
  {
    path: '/area',
    name: 'area',
    component: () => import('../pages/MMaster/Area/index.vue'),
    meta: {
      authRequired: true,
      head: {
        title: 'Danh mục Địa bàn',
        description: 'Danh mục Địa bàn'
      }
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../pages/MMaster/User/index.vue'),
    meta: {
      authRequired: true,
      head: {
        title: 'Danh mục Người sử dụng',
        description: 'Danh mục Người sử dụng'
      }
    }
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/Home/index.vue'),
    meta: {
      authRequired: true,
      head: {
        title: 'Aizalog',
        description: 'Aizalog'
      }
    }
  },
  {
    path: '/admin',
    name: 'hubStart',
    component: () => import('../pages/HubStart/index.vue'),
    meta: {
      authRequired: true,
      head: {
        title: 'Nhận vận đơn tại Hub đầu',
        description: 'Nhận vận đơn tại Hub đầu'
      }
    }
  },
  {
    path: '/settings/global-list',
    name: 'settings_global_list',
    component: () => import('../pages/Sys/GlobalList/Index'),
    meta: {
      authRequired: true,
      permission: ['settings_general'],
      head: {
        title: 'Danh mục dùng chung',
        description: 'Danh mục dùng chung'
      }
    }
  },
  {
    path: '/settings/global-params',
    name: 'settings_global_params',
    component: () => import('../pages/Sys/GlobalParam'),
    meta: {
      authRequired: true,
      permission: [ 'settings_global_params' ],
      head: {
        title: 'Tham số hệ thống',
        description: 'Tham số hệ thống'
      }
    }
  },
  {
    path: '/hub',
    name: 'hub',
    component: () => import('../pages/MMaster/Hub/index'),
    meta: {
      authRequired: true,
      permission: [ 'hub' ],
      head: {
        title: 'Danh mục Hub',
        description: 'Danh mục Hub'
      }
    }
  },
  {
    path: '/hub/create',
    name: 'hub.create',
    component: () => import('../pages/MMaster/Hub/Create'),
    meta: {
      authRequired: true,
      permission: [ 'hub.create' ],
      head: {
        title: 'Thêm mới Hub',
        description: 'Thêm mới Hub'
      }
    }
  },
  {
    path: '/hub/:id/update',
    name: 'hub.update',
    component: () => import('../pages/MMaster/Hub/Update'),
    meta: {
      authRequired: true,
      permission: [ 'hub.update' ],
      head: {
        title: 'Cập nhật Hub',
        description: 'Cập nhật Hub'
      }
    }
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('../pages/MMaster/Product/index'),
    meta: {
      authRequired: true,
      permission: [ 'product' ],
      head: {
        title: 'Danh mục hàng hóa',
        description: 'Danh mục hàng hóa'
      }
    }
  },
  {
    path: '/product-offer',
    name: 'product_offer',
    component: () => import('../pages/MMaster/ProductOffer/index'),
    meta: {
      authRequired: true,
      permission: [ 'product_offer' ],
      head: {
        title: 'Giá vận đơn hàng không',
        description: 'Giá vận đơn hàng không'
      }
    }
  },
  {
    path: '/flight-schedule',
    name: 'flight_schedule',
    component: () => import('../pages/MMaster/FlightSchedule/index'),
    meta: {
      authRequired: true,
      permission: [ 'flight_schedule' ],
      head: {
        title: 'Lịch trình bay',
        description: 'Lịch trình bay'
      }
    }
  },
  {
    path: '/awb-last-airport',
    name: 'awb_last_airport',
    component: () => import('../pages/AWBLastAirport/index.vue'),
    meta: {
      authRequired: true,
      head: {
        title: 'Nhận AWB tại sân bay cuối',
        description: 'Nhận AWB tại sân bay cuối'
      }
    }
  },
  {
    path: '/order-back',
    name: 'order_back',
    component: () => import('../pages/OrderBack/index.vue'),
    meta: {
      authRequired: true,
      head: {
        title: 'Quản lý đơn hoàn',
        description: 'Quản lý đơn hoàn'
      }
    }
  },
  // Báo cáo doanh thu bán hàng
  {
    path: '/admin/report-sale-revenue',
    name: 'report_sale_revenue',
    component: () => import('../pages/SalesRevenue/index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Báo cáo doanh thu bán hàng',
        description: 'Báo cáo doanh thu bán hàng'
      }
    }
  },
  {
    path: '/admin/report-sale-revenue-supplier',
    name: 'report_sale_revenue_supplier',
    component: () => import('../pages/SalesRevenue/Detail/index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Báo cáo doanh thu nhà bán hàng',
        description: 'Báo cáo doanh thu nhà bán hàng'
      }
    }
  },
  {
    path: '/tracking/:orderId',
    name: 'tracking',
    component: () => import('../pages/Tracking/index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Theo dõi thông tin đơn hàng',
        description: 'Theo dõi thông tin đơn hàng'
      }
    }
  },

  // Tra cứu thông tin đơn hàng
  {
    path: '/admin/search-order',
    name: 'search_order',
    component: () => import('../pages/LookUpOrderInfomation/index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Tra cứu thông tin đơn hàng',
        description: 'Tra cứu thông tin đơn hàng'
      }
    }
  },
  {
    path: '/admin/order-detail/:id',
    name: 'order_detail',
    component: () => import('../pages/LookUpOrderInfomation/detail'),
    meta: {
      authRequired: true,
      head: {
        title: 'Chi tiết thông tin đơn hàng',
        description: 'Chi tiết thông tin đơn hàng'
      }
    }
  },
  // Thông tin viết hóa đơn
  {
    path: '/admin/report-invoice-writing',
    name: 'report_invoice_writing',
    component: () => import('../pages/Report/InvoiceWritingInformation/index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Thông tin viết hóa đơn',
        description: 'Thông tin viết hóa đơn'
      }
    }
  },

  // Báo cáo đặt đơn
  {
    path: '/admin/report-order-daily',
    name: 'report_order_daily',
    component: () => import('../pages/Report/Order/index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Báo cáo đơn đặt hàng ngày',
        description: 'Báo cáo đơn đặt hàng ngày'
      }
    }
  },

  // Tổng hợp theo ngày
  {
    path: '/admin/report-summary-by-day',
    name: 'report_summary_by_day',
    component: () => import('../pages/Report/TotalByDay/index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Tổng hợp theo ngày',
        description: 'Tổng hợp theo ngày'
      }
    }
  },

  // Tổng hợp theo tháng
  {
    path: '/admin/report-summary-by-month',
    name: 'report_summary_by_month',
    component: () => import('../pages/Report/TotalByMonth/index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Tổng hợp theo tháng',
        description: 'Tổng hợp theo tháng'
      }
    }
  },

  // Cấu hình
  {
    path: '/admin/config',
    name: 'config',
    component: () => import('../pages/Config/index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Cấu hình',
        description: 'Cấu hình'
      }
    }
  },

  // Quản lý kho hàng
  {
    path: '/warehouse-management',
    name: 'warehouse_management',
    component: () => import('../pages/WarehouseManagement/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Quản lý kho hàng',
        description: 'Quản lý kho hàng'
      }
    }
  },

  // Quản lý máy đọc mã vạch
  {
    path: '/barcode-readers-management',
    name: 'barcode_readers_management',
    component: () => import('../pages/BarcodeReadersManagement/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Quản lý danh sách máy đọc mã vạch',
        description: 'Quản lý danh sách máy đọc mã vạch'
      }
    }
  },

  // Quản lý Nhập xuất
  {
    path: '/import-export-management',
    name: 'import_export_management',
    component: () => import('../pages/ImportExportManagement/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Quản lý nhập xuất',
        description: 'Quản lý nhập xuất'
      }
    }
  }
]

export const constantRouterMap = [
  {
    path: '/admin/login',
    name: 'login',
    component: () => import('../pages/Sys/Login.vue'),
    meta: { authRequired: false }

  }
]
