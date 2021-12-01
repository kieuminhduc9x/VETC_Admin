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
      style="width: 270px;"
      @click="() => {collapsed = !collapsed; showSidebar()}"><i
        aria-label="icon: left"
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
      <!--      <a-menu-item key="5" v-if="hasPermission('order')">-->
      <!--        <router-link :to="{ name: 'order' }">-->
      <!--          <a-icon type="database"/>-->
      <!--          <span>Tra cứu thông tin vận đơn</span>-->
      <!--        </router-link>-->
      <!--      </a-menu-item>-->
      <!--      <a-menu-item key="3" v-if="hasPermission('hubstart')">-->
      <!--        <router-link :to="{ name: 'hubstart' }">-->
      <!--          <a-icon type="check-circle"/>-->
      <!--          <span>Nhận vận đơn tại Hub đầu</span>-->
      <!--        </router-link>-->
      <!--      </a-menu-item>-->
      <!--      <a-menu-item key="6" v-if="hasPermission('groupawb')">-->
      <!--        <router-link :to="{ name: 'groupawb' }">-->
      <!--          <a-icon type="codepen"/>-->
      <!--          <span>Gộp AWB tại Hub đầu</span>-->
      <!--        </router-link>-->
      <!--      </a-menu-item>-->
      <!--      <a-menu-item key="7" v-if="hasPermission('awbflight')">-->
      <!--        <router-link :to="{ name: 'awbflight' }">-->
      <!--          <a-icon type="rocket"/>-->
      <!--          <span>Chuyển AWB tại sân bay đầu</span>-->
      <!--        </router-link>-->
      <!--      </a-menu-item>-->
      <!--      <a-menu-item key="4_11" v-if="hasPermission('awb_last_airport')">-->
      <!--        <router-link :to="{ name: 'awb_last_airport' }">-->
      <!--          <a-icon type="file-protect"/>-->
      <!--          <span>Nhận AWB tại sân bay cuối</span>-->
      <!--        </router-link>-->
      <!--      </a-menu-item>-->
      <!--      <a-menu-item key="4" v-if="hasPermission('hubend')">-->
      <!--        <router-link :to="{ name: 'hubend' }">-->
      <!--          <a-icon type="file-protect"/>-->
      <!--          <span>Nhận AWB tại Hub cuối</span>-->
      <!--        </router-link>-->
      <!--      </a-menu-item>-->
      <!--      <a-menu-item key="8" v-if="hasPermission('bikehubend')">-->
      <!--        <router-link :to="{ name: 'bikehubend' }">-->
      <!--          <a-icon type="mobile"/>-->
      <!--          <span>Đặt Bike tại Hub cuối</span>-->
      <!--        </router-link>-->
      <!--      </a-menu-item>-->
      <!--      <a-menu-item key="9" v-if="hasPermission('bikehubendreceipt')">-->
      <!--        <router-link :to="{ name: 'bikehubendreceipt' }">-->
      <!--          <a-icon type="file-done"/>-->
      <!--          <span>Giao Bike tại Hub cuối</span>-->
      <!--        </router-link>-->
      <!--      </a-menu-item>-->
      <!--      <a-menu-item key="19" v-if="hasPermission('order_back')">-->
      <!--        <router-link :to="{ name: 'order_back' }">-->
      <!--          <a-icon type="file-done"/>-->
      <!--          <span>Quản lý đơn hoàn</span>-->
      <!--        </router-link>-->
      <!--      </a-menu-item>-->
      <!--      <a-menu-item key="11" v-if="hasPermission('flight')">-->
      <!--        <router-link :to="{ name: 'flight' }">-->
      <!--          <a-icon type="calendar"/>-->
      <!--          <span>Danh mục chuyến bay</span>-->
      <!--        </router-link>-->
      <!--      </a-menu-item>-->
      <!--      <a-menu-item key="12" v-if="hasPermission('area')">-->
      <!--        <router-link :to="{ name: 'area' }">-->
      <!--          <a-icon type="audit"/>-->
      <!--          <span>Danh mục Địa bàn</span>-->
      <!--        </router-link>-->
      <!--      </a-menu-item>-->
      <!--      <a-menu-item key="13" v-if="hasPermission('user')">-->
      <!--        <router-link :to="{ name: 'user' }">-->
      <!--          <a-icon type="team"/>-->
      <!--          <span>Danh mục Người sử dụng</span>-->
      <!--        </router-link>-->
      <!--      </a-menu-item>-->
      <!--      <a-menu-item key="14" v-if="hasPermission('hub')">-->
      <!--        <router-link :to="{ name: 'hub' }">-->
      <!--          <a-icon type="home"/>-->
      <!--          <span>Danh mục Hub</span>-->
      <!--        </router-link>-->
      <!--      </a-menu-item>-->
      <!--      <a-menu-item key="15" v-if="hasPermission('product')">-->
      <!--        <router-link :to="{ name: 'product' }">-->
      <!--          <a-icon type="code-sandbox"/>-->
      <!--          <span>Danh mục hàng hóa</span>-->
      <!--        </router-link>-->
      <!--      </a-menu-item>-->
      <!--      <a-menu-item key="16" v-if="hasPermission('product_offer')">-->
      <!--        <router-link :to="{ name: 'product_offer' }">-->
      <!--          <a-icon type="dollar"/>-->
      <!--          <span>Giá vận đơn hàng không</span>-->
      <!--        </router-link>-->
      <!--      </a-menu-item>-->
      <!--      <a-menu-item key="17" v-if="hasPermission('flight_schedule')">-->
      <!--        <router-link :to="{ name: 'flight_schedule' }">-->
      <!--          <a-icon type="profile"/>-->
      <!--          <span>Lịch trình bay</span>-->
      <!--        </router-link>-->
      <!--      </a-menu-item>-->
      <a-sub-menu
        key="20"
        v-if="$auth.hasAnyPrivilege(['SEARCH_ORDER']) === true">
        <a slot="title"><a-icon class="icon-menu" type="database" /><span class="title-menu">Quản lý đơn hàng</span></a>
        <a-menu-item key="20_1" v-if="$auth.hasPrivilege('SEARCH_ORDER') === true">
          <router-link :to="{ name: 'search_order' }">
            <span>Tất cả đơn hàng</span>
          </router-link>
        </a-menu-item>
        <!--        <a-menu-item key="20_2" >-->
        <!--          <router-link :to="{ name: '' }">-->
        <!--            <span>Đã hủy</span>-->
        <!--          </router-link>-->
        <!--        </a-menu-item>-->
      </a-sub-menu>
      <a-sub-menu
        key="18"
        v-if="$auth.hasAnyPrivilege(['REPORT_SALE_REVENUE','REPORT_SALE_REVENUE_SUPPLIER','REPORT_INVOICE_WRITING','REPORT_ORDER_DAILY','REPORT_SUMMARY_BY_DAY','REPORT_SUMMARY_BY_MONTH']) === true">
        <a slot="title"><a-icon class="icon-menu" type="mail" /><span class="title-menu">BÁO CÁO</span></a>
        <a-menu-item key="18_1" v-if="$auth.hasPrivilege('REPORT_SALE_REVENUE') === true">
          <router-link :to="{ name: 'report_sale_revenue' }">
            <span>Doanh thu bán hàng</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="18_2" v-if="$auth.hasPrivilege('REPORT_SALE_REVENUE_SUPPLIER') === true">
          <router-link :to="{ name: 'report_sale_revenue_supplier' }">
            <span>Doanh thu nhà bán hàng</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="18_3" v-if="$auth.hasPrivilege('REPORT_INVOICE_WRITING') === true">
          <router-link :to="{ name: 'report_invoice_writing' }">
            <span>Thông tin viết hóa đơn</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="18_4" v-if="$auth.hasPrivilege('REPORT_ORDER_DAILY') === true">
          <router-link :to="{ name: 'report_order_daily' }">
            <span>Đơn đặt hằng ngày</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="18_5" v-if="$auth.hasPrivilege('REPORT_SUMMARY_BY_DAY') === true">
          <router-link :to="{ name: 'report_summary_by_day' }">
            <span>Tổng hợp theo ngày</span>
          </router-link>
        </a-menu-item>
        <a-menu-item
          key="18_6"
          v-if="$auth.hasPrivilege('REPORT_SUMMARY_BY_MONTH') === true">
          <router-link
            :to="{ name: 'report_summary_by_month' }">
            <span>Tổng hợp theo tháng</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="21" >
        <router-link :to="{ name: 'warehouse_management' }" class="title-menu">
          <a-icon type="appstore"></a-icon>
          <span>Quản lý danh mục kho</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="22" >
        <router-link :to="{ name: 'barcode_readers_management' }" class="title-menu">
          <a-icon type="barcode"></a-icon>
          <span>Máy đọc mã vạch</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="23" >
        <router-link :to="{ name: 'import_export_management' }" class="title-menu">
          <a-icon type="export"></a-icon>
          <span>Quản lý nhập xuất</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SideBar',
  data () {
    return {
      collapsed: false
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
        case 'dashboard':
          idx = '1'
          break
        case 'role':
        case 'role.user':
          idx = '2'
          break
        case 'hubstart':
          idx = '3'
          break
        case 'hubend':
          idx = '4'
          break
        case 'order':
        case 'order_detail':
          idx = '5'
          break
        case 'groupawb':
          idx = '6'
          break
        case 'awbflight':
          idx = '7'
          break
        case 'bikehubend':
          idx = '8'
          break
        case 'bikehubendreceipt':
          idx = '9'
          break
        case 'priceflight':
          idx = '10'
          break
        case 'flight':
          idx = '11'
          break
        case 'area':
          idx = '12'
          break
        case 'user':
          idx = '13'
          break
        case 'hub':
        case 'hub.create':
        case 'hub.update':
          idx = '14'
          break
        case 'product':
          idx = '15'
          break
        case 'product_offer':
          idx = '16'
          break
        case 'flight_schedule':
          idx = '17'
          break
        case 'awb_last_airport':
          idx = '4_11'
          break
        case 'order_back':
          idx = '19'
          break
        case 'report_sale_revenue':
          idx = '18_1'
          break
        case 'report_sale_revenue_supplier':
          idx = '18_2'
          break
        case 'report_invoice_writing':
          idx = '18_3'
          break
        case 'report_order_daily':
          idx = '18_4'
          break
        case 'report_summary_by_day':
          idx = '18_5'
          break
        case 'report_summary_by_month':
          idx = '18_6'
          break
        case 'search_order':
          idx = '20_1'
          break
        case 'warehouse_management':
          idx = '21'
          break
        case 'barcode_readers_management':
          idx = '22'
          break
        case 'import_export_management':
          idx = '23'
          break
      }

      return idx
    },
    openKeys: function () {
      let k = '0'
      switch (this.$router.currentRoute.name) {
        case 'dashboard':
          k = '1'
          break
        case 'report_sale_revenue':
        case 'report_sale_revenue_supplier':
        case 'report_invoice_writing':
        case 'report_order_daily':
        case 'report_summary_by_day':
        case 'report_summary_by_month':
          k = '18'
          break
        case 'search_order':
          k = '20'
          break
        case 'warehouse_management':
          k = '21'
          break
        case 'barcode_readers_management':
          k = '22'
          break
        case 'import_export_management':
          k = '23'
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
.icon-menu {
  font-size: 24px!important;
}
</style>
