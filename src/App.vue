<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view/>
      <!--      <select-hub/>-->
      <select-store />
    </div>
  </a-config-provider>
</template>

<script>
import viVN from 'ant-design-vue/lib/locale-provider/vi_VN'
import SelectHub from '@/components/SelectHubModal'
import SelectStore from '@/components/SelectStoreModal'
export default {
  components: {
    SelectHub,
    SelectStore
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
