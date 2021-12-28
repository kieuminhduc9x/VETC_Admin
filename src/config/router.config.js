
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
        title: 'Danh mục kho',
        description: 'Danh mục kho'
      }
    }
  },

  // Quản lý máy đọc mã vạch
  {
    path: '/scan-device-management',
    name: 'scan_device_management',
    component: () => import('../pages/ScanDeviceManagement/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Quản lý máy quét mã vạch',
        description: 'Quản lý máy quét mã vạch'
      }
    }
  },

  // Quản lý Nhập xuất
  {
    path: '/voucher-management',
    name: 'voucher_management',
    component: () => import('../pages/VoucherManagement/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Nhập xuất hàng',
        description: 'Nhập xuất hàng'
      }
    }
  },

  // Chi tiết phiếu xuất nhập kho
  {
    path: '/voucher-management/:id/detail',
    name: 'voucher_management.detail',
    component: () => import('../pages/VoucherManagement/Detail'),
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
    path: '/pre-order-management',
    name: 'pre_order_management',
    component: () => import('../pages/PreOrderManagement/Index'),
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
    path: '/pre-order-management/detail/:id',
    name: 'pre_order_management.detail',
    component: () => import('../pages/PreOrderManagement/Detail'),
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
    path: '/config/user-management',
    name: 'user_management',
    component: () => import('../pages/Config/User/Index'),
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
    path: '/config/user-management/create',
    name: 'user_management.create',
    component: () => import('../pages/Config/User/Create'),
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
    path: '/config/user-management/update/:id',
    name: 'user_management.update',
    component: () => import('../pages/Config/User/Update'),
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
    path: '/config/role-management',
    name: 'role_management',
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
