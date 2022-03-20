<template>
  <a-layout-sider
    collapsible
    v-model="collapsed"
    @collapse="showSidebar"
    width="270"
    collapsedWidth="40"
    style="max-width: 300px !important;padding-top: 5px"
  >
    <!-- <div class="logo">
      <img src="@/assets/viettel_logo.jpg" alt="Viettel">
    </div> -->
    <div
      class="ant-layout-sider-trigger sider--top cl-sider--top"
      style="width: 40px;"
      @click="() => {collapsed = !collapsed; showSidebar()}"><i
        aria-label="icon: right"
        class="anticon anticon-left"
        id="icon-siderbar">
        <svg
          viewBox="64 64 896 896"
          data-icon="left"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="false"
          focusable="false"
          class="">
          <path
            d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
        </svg>
      </i></div>
    <a-menu
      mode="inline"
      class="ant-menu_1"
      :defaultSelectedKeys="[currentKey]"
      :selected-keys="[currentKey]"
      :default-open-keys="[openKeys]"
      :style="{ height: '100%', borderRight: 0, paddingTop: '0', }"
    >
      <a-sub-menu key="1">
        <a slot="title"><icon name="book" width="24px" height="24px" style="margin-right: 10px"></icon><span class="title-menu">Quản trị hệ thống</span></a>
        <a-menu-item key="1_1" >
          <router-link :to="{ name: 'account' }" class="title-menu">
            <span>Tài khoản</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="1_2" >
          <router-link :to="{ name: 'permission' }" class="title-menu">
            <span>Phân quyền</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="1_3" >
          <router-link :to="{ name: 'category' }" class="title-menu">
            <span>Danh mục</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="1_4" >
          <router-link :to="{ name: 'code_lookup_HDDT' }" class="title-menu">
            <span>Tra cứu mã HDDT</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="2" >
        <router-link :to="{ name: 'giam_sat' }" class="title-menu">
          <a-icon type="appstore" />
          <span>Giám sát</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="3" >
        <router-link :to="{ name: 'hau_kiem' }" class="title-menu">
          <a-icon type="project" />
          <span>Hậu kiểm</span>
        </router-link>
      </a-menu-item>
      <a-sub-menu key="4">
        <a slot="title"><icon name="book" width="24px" height="24px" style="margin-right: 10px"></icon><span class="title-menu">Kế toán</span></a>
        <a-menu-item key="4_1" >
          <router-link :to="{ name: 'inventory_deliver_voucher' }" class="title-sub-menu">
            <span>Phiếu nhập kho thẻ</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="4_2" >
          <router-link :to="{ name: 'inventory_receiving_voucher' }" class="title-sub-menu">
            <span>Phiếu xuất kho thẻ</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="4_3" >
          <router-link :to="{ name: 'deliver_voucher_management' }" class="title-sub-menu">
            <span>Quản lý phiếu nhập</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="4_4" >
          <router-link :to="{ name: 'receiving_voucher_management' }" class="title-sub-menu">
            <span>Quản lý phiếu xuất</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="4_5" >
          <router-link :to="{ name: 'cancel_card' }" class="title-sub-menu">
            <span>Hủy thẻ</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="4_6" >
          <router-link :to="{ name: 'card_store' }" class="title-sub-menu">
            <span>Kho thẻ</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="4_7" >
          <router-link :to="{ name: 'card_inventory_calculator' }" class="title-sub-menu">
            <span>Tính tồn kho thẻ</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="4_8" >
          <router-link :to="{ name: 'list_attach_invoice' }" class="title-sub-menu">
            <span>Lập bảng kê</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="4_9" >
          <router-link :to="{ name: 'disparity_handling' }" class="title-sub-menu">
            <span>Xử lý chênh lệch</span>
          </router-link>
        </a-menu-item>
        <!--        <a-menu-item key="4_10" >-->
        <!--          <router-link :to="{ name: 'ticket_import_voucher' }" class="title-sub-menu">-->
        <!--            <span>Phiếu nhập vé</span>-->
        <!--          </router-link>-->
        <!--        </a-menu-item>-->
        <!--        <a-menu-item key="4_11" >-->
        <!--          <router-link :to="{ name: '' }" class="title-menu">-->
        <!--            <span>Phiếu xuất vé</span>-->
        <!--          </router-link>-->
        <!--        </a-menu-item>-->
        <!--        <a-menu-item key="4_12" >-->
        <!--          <router-link :to="{ name: '' }" class="title-menu">-->
        <!--            <span>Quản lý phiếu nhập vé</span>-->
        <!--          </router-link>-->
        <!--        </a-menu-item>-->
        <!--        <a-menu-item key="4_13" >-->
        <!--          <router-link :to="{ name: '' }" class="title-menu">-->
        <!--            <span>Quản lý phiếu xuất vé</span>-->
        <!--          </router-link>-->
        <!--        </a-menu-item>-->
      </a-sub-menu>
      <a-sub-menu key="5">
        <a slot="title"><icon name="book" width="24px" height="24px" style="margin-right: 10px"></icon><span class="title-menu">Đối soát ETC</span></a>
        <a-menu-item key="5_1" >
          <router-link :to="{ name: 'import_counter_transaction' }" class="title-sub-menu">
            <span>Import đối soát giao dịch</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="5_2" >
          <router-link :to="{ name: 'create_transaction' }" class="title-sub-menu">
            <span>Tạo giao dịch ETC</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="5_3" >
          <router-link :to="{ name: 'adjustmen_transaction_management' }" class="title-sub-menu">
            <span>Điều chỉnh giao dịch đã đối soát</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="6">
        <a slot="title"><icon name="book" width="24px" height="24px" style="margin-right: 10px"></icon><span class="title-menu">Báo cáo thống kê</span></a>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SideBar',
  data () {
    return {
      collapsed: true
    }
  },
  computed: {
    ...mapGetters('permission', ['addRouters']),
    currentKey: function () {
      let idx = '0'
      let routeName = this.$router.currentRoute.name
      const fromSource = this.$route.query.from
      if (fromSource) {
        routeName = fromSource
      }
      switch (routeName) {
        case 'account':
          idx = '1_1'
          break
        case 'permission':
          idx = '1_2'
          break
        case 'category':
          idx = '1_3'
          break
        case 'code_lookup_HDDT':
          idx = '1_4'
          break
        case 'giam_sat':
          idx = '2'
          break
        case 'hau_kiem':
          idx = '3'
          break
        case 'inventory_deliver_voucher':
          idx = '4_1'
          break
        case 'inventory_receiving_voucher':
          idx = '4_2'
          break
        case 'deliver_voucher_management':
          idx = '4_3'
          break
        case 'receiving_voucher_management':
          idx = '4_4'
          break
        case 'cancel_card':
          idx = '4_5'
          break
        case 'card_store':
          idx = '4_6'
          break
        case 'card_inventory_calculator':
          idx = '4_7'
          break
        case 'list_attach_invoice':
          idx = '4_8'
          break
        case 'disparity_handling':
          idx = '4_9'
          break
        case 'ticket_import_voucher':
          idx = '4_10'
          break
        case 'import_counter_transaction':
        case 'import_counter_transaction_import':
          idx = '5_1'
          break
        case 'create_transaction':
          idx = '5_2'
          break
        case 'adjustmen_transaction_management':
          idx = '5_3'
          break
      }

      return idx
    },
    openKeys: function () {
      let k = '0'
      switch (this.$router.currentRoute.name) {
        case 'account':
        case 'permission':
        case 'category':
        case 'code_lookup_HDDT':
          k = '1'
          break
        case 'giam_sat':
          k = '2'
          break
        case 'hau_kiem':
          k = '3'
          break
        case 'inventory_deliver_voucher':
        case 'inventory_receiving_voucher':
        case 'receiving_voucher_management':
        case 'deliver_voucher_management':
        case 'cancel_card':
        case 'card_store':
        case 'card_inventory_calculator':
        case 'list_attach_invoice':
        case 'disparity_handling':
        case 'ticket_import_voucher':
          k = '4'
          break
        case 'import_counter_transaction':
        case 'import_counter_transaction_import':
        case 'create_transaction':
        case 'adjustmen_transaction_management':
          k = '5'
          break
        default:
          k = '0'
      }
      return k
    }
  },
  mounted () {
  },
  methods: {
    hasPermission (routeName) {
      /*
      if (!this.addRouters) return false
      const flag = this.addRouters.filter(item => item.name === permission)
      if (flag.length > 0) {
        return true
      }
      return true
      */
      return this.hasMenuPermission(routeName)
    },
    hasPermissions (routeNames) {
      const $this = this
      let ok = true
      routeNames.forEach(function (routeName) {
        if ($this.hasPermission(routeName) === false) {
          ok = false
        }
      })
      return ok
    },
    hasAnyPermissions (paths) {
      const $this = this
      let ok = false
      paths.forEach(function (path) {
        if ($this.hasPermission(path) === true) {
          ok = true
        }
      })
      return ok
    },
    showSidebar () {
      if (this.collapsed === true) {
        document.getElementsByClassName('sider--top')[0].style.width = '40px'
        document.getElementById('icon-siderbar').style.transform = 'rotate(180deg)'
      } else {
        document.getElementsByClassName('sider--top')[0].style.width = '270px'
        document.getElementById('icon-siderbar').style.transform = 'rotate(0deg)'
      }
    }
  }
}
</script>
<style>
.ant-layout-sider-children {
  overflow: hidden;
}

.sider--top {
  top: 0 !important;
  position: absolute !important;
}

.ant-menu_1 {
  margin-top: 40px !important;

}

.cl-sider--top {
  background-color: rgba(7, 129, 178, 0.16) !important;
}
.ant-menu-sub.ant-menu-inline .ant-menu-item-group-title {
  padding-left: 15px !important;
}
.ant-menu-sub.ant-menu-inline .ant-menu-item > a {
  height: auto !important;
  line-height: normal;
}
.title-menu{
  font-size: 16px!important;
  font-weight: 400!important;
}
.title-sub-menu{
  font-size: 14px!important;
  font-weight: 400!important;
}
.icon-menu {
  font-size: 24px!important;
}
</style>
