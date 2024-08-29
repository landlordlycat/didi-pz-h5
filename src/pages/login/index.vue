<template>
  <header class="text-center">
    <span class="font-bold text-3xl block my-5">用户登录</span>
  </header>
  <main>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="formModel.userName" name="userName" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="formModel.passWord" type="password" name="passWord" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
      </van-cell-group>
      <div class="m-4">
        <van-button round block type="primary" native-type="submit"> 登录 </van-button>
      </div>
    </van-form>
  </main>
</template>

<script setup lang="ts" generic="T">
// import 'vant/es/toast/style'
import 'vant/es/notify/style'
import { State } from '@/states'
import { setItem } from '@/utils/localStorage'
import { showNotify } from 'vant/es'
const router = useRouter()
const formModel = reactive({
  userName: '',
  passWord: ''
})
const api: any = inject('api')

const onSubmit = async (values: typeof formModel) => {
  const res = await api.login(values)
  if (res.code === 10000) {
    showNotify({ type: 'success', message: '登录成功', duration: 1000 })
    setItem(State.H5_TOKEN, res.data.token)
    setItem(State.H5_USER_INFO, res.data.userInfo)
    router.replace('/')
  } else {
    showNotify({ type: 'danger', message: '登录失败' })
  }
}
</script>
