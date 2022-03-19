<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view/>
      <!--      <select-store />-->
    </div>
  </a-config-provider>
</template>

<script>
import viVN from 'ant-design-vue/lib/locale-provider/vi_VN'
// import SelectStore from '@/components/SelectStoreModal'
export default {
  components: {
    // SelectStore
  },
  data () {
    return {
      locale: viVN
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters['auth/loggedIn']()
    }
  }
}
</script>
