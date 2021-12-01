<template>
  <blank-layout>
    <a-spin :spinning="loading" class="app-spinning">

    </a-spin>
    <div class="container">
      <div class="top">
        <div class="header">
          <a href="/">
            <img src="~@/assets/vna.png" class="logo" alt="logo">
            <br>
            <div class="title" >{{ $t('AppName') }}</div>
          </a>
        </div>
        <div class="desc">

        </div>
      </div>
      <div class="main" >
        <a-form-model
          id="formLogin"
          class="user-layout-login"
          ref="formLogin"
          :model="formLogin"
          :rules="rules"
        >
          <a-form-model-item prop="username" :label="$t('login.Username') ">
            <a-input
              size="large"
              type="text"
              :placeholder="$t('login.Username')"
              v-model="formLogin.username"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-model-item>

          <a-form-model-item :label="$t('login.Password') " prop="password">
            <a-input
              size="large"
              type="password"
              :placeholder="$t('login.Password')"
              v-model="formLogin.password"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-button
              size="large"
              @click="handleSubmit"
              :loading="loading"
              type="primary"
              style="margin-top:24px"
              block>{{ $t('login.Login') }}</a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
  </blank-layout>
</template>
<script>
import BlankLayout from '../layouts/BlankLayout'
import LogoSvg from '@/assets/login_logo.svg'
import { authMethods, commonMethods } from '@/store/helpers'
export default {
  components: {
    BlankLayout,
    LogoSvg
  },
  data () {
    return {
      loading: false,
      state: {
        time: 60,
        loginBtn: false
      },
      formLogin: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: this.$t('login.Please enter your username') }],
        password: [{ required: true, message: this.$t('login.Please enter your password') }]
      }
    }
  },
  mounted () {
  },
  methods: {
    ...authMethods,
    ...commonMethods,
    async handleSubmit (e) {
      this.$refs.formLogin.validate(async (valid) => {
        if (valid) {
          this.loading = true

          await this.logIn(this.formLogin)
            .then((res) => this.loginSuccess(res))
            .catch(err => {
              this.requestFailed(err)
            }).catch(err => {
              const msg = this.handleApiError(err)
              this.$notification.error({
                message: '',
                description: msg,
                duration: 5
              })
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },
    loginSuccess (res) {
      // this.updateSelectHub(true)
      this.updateSelectStore(true)
      // this.$router.push({ path: this.$route.query.directFrom || '/' })
      if (this.$auth.hasPrivilege('search_order') === true) {
        this.$router.push({ name: 'search_order' })
      } else {
        this.$router.push({ name: 'dashboard' })
      }
    },
    requestFailed (err) {
      this.$store.dispatch('auth/logoutLocal')
      this.$error({
        onOk () {
        },
        content: ((err.response || {}).data || {}).message || 'Đăng nhập thất bại'
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .login-page {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    }

    .user-layout-login {
        width: 370px;

        label {
            font-size: 14px;
        }

        .getCaptcha {
            display: block;
            width: 100%;

        }

        .forge-password {
            font-size: 14px;
        }

        button.login-button {
            padding: 0 15px;
            font-size: 14px;

            width: 100%;
        }

        .user-login-other {
            text-align: left;
            margin-top: 24px;
            line-height: 22px;

            .item-icon {
                font-size: 24px;
                color: rgba(0, 0, 0, 0.2);
                margin-left: 16px;
                vertical-align: middle;
                cursor: pointer;
                transition: color 0.3s;

                &:hover {
                    color: #1890ff;
                }
            }

            .register {
                float: right;
            }
        }
    }

    .left-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: #FFFFFF;

        .l-c-title {
            font-style: normal;
            font-weight: bold;
            font-size: 32px;
            line-height: 40px;
            /* identical to box height */

            text-align: center;

            color: #c52f40;

        }
    }

    .right-container {
        min-height: 100vh;
        background: #c52f40;

        .top-container {
            //background:   url(~@/assets/login_top_bg.svg) no-repeat;
            background-size: cover;
            height: 35vh
        }

        .middle-container {
            width: 100%;
            height: 30vh;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            .m-c-title {
                margin-top: 33px;
                font-style: normal;
                font-weight: bold;
                font-size: 30px;
                line-height: 42px;
                /* identical to box height, or 73% */

                text-align: center;

                color: #FFFFFF;
            }

        }

        .bottom-container {
            //background:   url(~@/assets/login_bottom_bg.svg) no-repeat;
            background-size: cover;
            height: 65vh
        }
    }
</style>
