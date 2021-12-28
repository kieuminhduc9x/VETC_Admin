
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
  },

  // Cấu hình
  {
    path: '/config',
    name: 'config',
    component: () => import('../pages/Config/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Cấu hình',
        description: 'Cấu hình'
      }
    }
  },
  {
    path: '/config/account',
    name: 'config.account',
    component: () => import('../pages/Config/Account/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Quản lý tài khoản',
        description: 'Quản lý tài khoản'
      }
    }
  },
  // Thêm mới tài khoản
  {
    path: '/config/account/create',
    name: 'config.account.create',
    component: () => import('../pages/Config/Account/Create'),
    meta: {
      authRequired: true,
      head: {
        title: 'Thêm mới tài khoản',
        description: 'Thêm mới tài khoản'
      }
    }
  },

  // Cập nhật tài khoản
  {
    path: '/config/account/update/:id',
    name: 'config.account.update',
    component: () => import('../pages/Config/Account/Update'),
    meta: {
      authRequired: true,
      head: {
        title: 'Cập nhật tài khoản',
        description: 'Cập nhật tài khoản'
      }
    }
  },

  // quản lý nhóm tài khoản
  {
    path: '/config/roles',
    name: 'config.roles',
    component: () => import('../pages/Config/Roles/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Quản lý nhóm tài khoản',
        description: 'Quản lý nhóm tài khoản'
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
