
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
