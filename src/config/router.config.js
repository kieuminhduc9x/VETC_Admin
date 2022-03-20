
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

  // Quản lý Hậu kiểm
  {
    path: '/hau-kiem',
    name: 'hau_kiem',
    component: () => import('../pages/HauKiem/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Hậu Kiểm',
        description: 'Hậu Kiểm'
      }
    }
  },

  // Quản lý giám sát
  {
    path: '/giam-sat',
    name: 'giam_sat',
    component: () => import('../pages/Giamsat/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Giám sát',
        description: 'Giám sát'
      }
    }
  },

  // Quản lý tài khoản
  {
    path: '/account',
    name: 'account',
    component: () => import('../pages/SystemAdmin/Account/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Tài khoản',
        description: 'Tài khoản'
      }
    }
  },

  // Quản lý Phân quyền
  {
    path: '/permission',
    name: 'permission',
    component: () => import('../pages/SystemAdmin/Permission/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Phân quyền',
        description: 'Phân quyền'
      }
    }
  },

  // Quản lý danh mục
  {
    path: '/category',
    name: 'category',
    component: () => import('../pages/SystemAdmin/Category/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Danh mục',
        description: 'Danh mục'
      }
    }
  },

  // Tra cứu mã HDDT
  {
    path: '/code-lookup-HDDT',
    name: 'code_lookup_HDDT',
    component: () => import('../pages/SystemAdmin/CodeLookupHDDT/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Tra cứu mã HDDT',
        description: 'Tra cứu mã HDDT'
      }
    }
  },

  // Lập phiếu xuất kho
  {
    path: '/inventory-deliver-voucher',
    name: 'inventory_deliver_voucher',
    component: () => import('../pages/CardInventoryManagement/InventoryDeliverVoucher/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Lập phiếu nhập kho',
        description: 'Lập phiếu nhập kho'
      }
    }
  },

  // Lập phiếu xuất kho
  {
    path: '/inventory-receiving-voucher',
    name: 'inventory_receiving_voucher',
    component: () => import('../pages/CardInventoryManagement/InventoryReceivingVoucher/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Lập phiếu xuất kho',
        description: 'Lập phiếu xuất kho'
      }
    }
  },

  // Quản lý phiếu nhập kho
  {
    path: '/deliver-voucher-management',
    name: 'deliver_voucher_management',
    component: () => import('../pages/CardInventoryManagement/DeliverVoucherManagement/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Quản lý phiếu xuất kho',
        description: 'Quản lý phiếu xuất kho'
      }
    }
  },

  // Quản lý phiếu nhập kho
  {
    path: '/receiving-voucher-management',
    name: 'receiving_voucher_management',
    component: () => import('../pages/CardInventoryManagement/ReceivingVoucherManagement/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Quản lý phiếu nhập kho',
        description: 'Quản lý phiếu nhập kho'
      }
    }
  },

  // Hủy thẻ
  {
    path: '/cancel-card',
    name: 'cancel_card',
    component: () => import('../pages/CardInventoryManagement/CancelCard/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Hủy thẻ',
        description: 'Hủy thẻ'
      }
    }
  },

  // Kho thẻ
  {
    path: '/card-store',
    name: 'card_store',
    component: () => import('../pages/CardInventoryManagement/CardStore/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Kho thẻ',
        description: 'Kho thẻ'
      }
    }
  },

  // Tính tồn kho thẻ
  {
    path: '/card-inventory-calculator',
    name: 'card_inventory_calculator',
    component: () => import('../pages/CardInventoryManagement/CardInventoryCalculator/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Tính tồn kho thẻ',
        description: 'Tính tồn kho thẻ'
      }
    }
  },

  // Lập bảng kê
  {
    path: '/list-attach-invoice',
    name: 'list_attach_invoice',
    component: () => import('../pages/CardInventoryManagement/LiѕtAttachInvoice/Index'),
    meta: {
      authRequired: true,
      head: {
        title: ' Lập bảng kê',
        description: ' Lập bảng kê'
      }
    }
  },

  // Xử lý chênh lệch
  {
    path: '/disparity-handling',
    name: 'disparity_handling',
    component: () => import('../pages/CardInventoryManagement/DisparityHandling/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Xử lý chênh lệch',
        description: 'Xử lý chênh lệch'
      }
    }
  },
  // Phiếu nhập vé
  {
    path: '/ticket-import-voucher',
    name: 'ticket_import_voucher',
    component: () => import('../pages/CardInventoryManagement/TicketImportVoucher/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Phiếu nhập vé',
        description: 'Phiếu nhập vé'
      }
    }
  },

  // Lập phiếu xuất vé
  {
    path: '/inventory-receiving-voucher',
    name: 'inventory_receiving_voucher',
    component: () => import('../pages/CardInventoryManagement/InventoryReceivingVoucher/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Lập phiếu xuất kho',
        description: 'Lập phiếu xuất kho'
      }
    }
  },

  // ĐỐI SOÁT ETC
  // Import đối soát ETC
  {
    path: '/import-counter-transaction',
    name: 'import_counter_transaction',
    component: () => import('../pages/ETCControl/ImportCounterTransaction/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Import đối soát ETC',
        description: 'Import đối soát ETC'
      }
    }
  },

  // Import file
  {
    path: '/import-counter-transaction/import',
    name: 'import_counter_transaction_import',
    component: () => import('../pages/ETCControl/ImportCounterTransaction/Import'),
    meta: {
      authRequired: true,
      head: {
        title: 'Import đối soát ETC',
        description: 'Import đối soát ETC'
      }
    }
  },

  // Tạo giao dịch ETC
  {
    path: '/create-transaction-ETC',
    name: 'create_transaction',
    component: () => import('../pages/ETCControl/CreateTransactionETC/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Tạo giao dịch ETC',
        description: 'Tạo giao dịch ETC'
      }
    }
  },

  // Điều chỉnh giao dịch đã đối soát
  {
    path: '/adjustmen-transaction-management',
    name: 'adjustmen_transaction_management',
    component: () => import('../pages/ETCControl/AdjustmenTransactionManagement/Index'),
    meta: {
      authRequired: true,
      head: {
        title: 'Điều chỉnh giao dịch đã đối soát',
        description: 'Điều chỉnh giao dịch đã đối soát'
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
