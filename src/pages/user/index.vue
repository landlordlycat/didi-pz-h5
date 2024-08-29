<template>
  <div>
    <section class="bg-gray-200 m-auto w-[90%] mt-2 rounded-md flex items-center justify-center shadow-md">
      <div class="flex flex-col items-center justify-center w-full my-8 space-y-2">
        <van-image :src="userInfo?.avatar" round width="100"></van-image>
        <p class="text-lg font-bold">{{ userInfo?.name }}</p>
      </div>
    </section>
    <div>
      <van-cell title="我的订单" icon="shop-o">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <span>全部</span>
        </template>
      </van-cell>
      <div class="flex items-center justify-evenly bg-gray-200 rounded-md w-[90%] mt-2 mb-4 m-auto py-5">
        <div class="flex items-center justify-center flex-col" @click="handleGoOrder(1)">
          <van-image src="/images/od_10.png" width="40"></van-image>
          <div>待支付</div>
        </div>
        <div class="flex items-center justify-center flex-col" @click="handleGoOrder(2)">
          <van-image src="/images/od_20.png" width="40"></van-image>
          <div>待服务</div>
        </div>
        <div class="flex items-center justify-center flex-col" @click="handleGoOrder(3)">
          <van-image src="/images/od_30.png" width="40"></van-image>
          <div>已完成</div>
        </div>
        <div class="flex items-center justify-center flex-col" @click="handleGoOrder(4)">
          <van-image src="/images/od_40.png" width="40"></van-image>
          <div>已取消</div>
        </div>
      </div>
    </div>
    <div>
      <div>
        <van-cell is-link>
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <van-image src="/images/ic_clients.png" width="20"></van-image>
            <span class="custom-title">服务对象管理</span>
          </template>
        </van-cell>
        <van-cell is-link>
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <van-image src="/images/ic_share.png" width="20"></van-image>
            <span class="custom-title">分享转发</span>
          </template>
        </van-cell>
      </div>
    </div>
    <div class="mt-5 w-[90%] m-auto">
      <van-button type="danger" size="large" @click="handleExit"> 退出登录</van-button>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import { State } from '@/states'
import { getItem, removeItem } from '@/utils/localStorage'
import { showConfirmDialog } from 'vant/es'

import 'vant/es/dialog/style'
const userInfo = ref()
const router = useRouter()
onMounted(() => {
  const res = getItem(State.H5_USER_INFO)
  userInfo.value = res
})

const handleGoOrder = (num: number) => {
  router.push({
    path: '/order',
    query: {
      active: String(num)
    }
  })
}
const handleExit = () => {
  showConfirmDialog({
    title: '提示',
    message: '是否确认退出登陆'
  })
    .then(() => {
      // on confirm
      removeItem(State.H5_USER_INFO)
      removeItem(State.H5_TOKEN)
      router.replace('/login')
    })
    .catch(() => {
      // on cancel
    })
}
</script>
