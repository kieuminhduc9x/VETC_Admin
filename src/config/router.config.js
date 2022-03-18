
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
