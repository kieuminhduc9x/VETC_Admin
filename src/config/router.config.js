
export const asyncRouterMap = [
  {
    path: '/',
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
  // {
  //   path: '/',
  //   name: 'home',
  //   component: () => import('../pages/Home/index.vue'),
  //   meta: {
  //     authRequired: true,
  //     head: {
  //       title: 'Quản lý kho Nam Cường',
  //       description: 'Quản lý kho Nam Cường'
  //     }
  //   }
  // },
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
  },

  // Chi tiết phiếu xuất nhập kho
  {
    path: '/import-export-management/:id/detail',
    name: 'import_export_management.detail',
    component: () => import('../pages/ImportExportManagement/Detail'),
    meta: {
      authRequired: true,
      head: {
        title: 'Chi tiết phiếu nhập xuất',
        description: 'Chi tiết phiếu nhập xuất'
      }
    }
  },

  // Quản lý đơn đặt hàng
  {
    path: '/order-management',
    name: 'order_management',
    component: () => import('../pages/OrderManagement/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Quản lý đơn đặt hàng',
        description: 'Quản lý đơn đặt hàng'
      }
    }
  },

  // Chi tiết đơn đặt hàng
  {
    path: '/order-management/detail/:id',
    name: 'order_management.detail',
    component: () => import('../pages/OrderManagement/Detail'),
    meta: {
      authRequired: true,
      head: {
        title: 'Chi tiết đơn đặt hàng',
        description: 'Chi tiết đơn đặt hàng'
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
