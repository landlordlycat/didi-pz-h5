<template>
  <div>
    <van-nav-bar title="我的订单" />
    <van-tabs v-model:active="active" @click-tab="onClickTab">
      <van-tab title="全部" name="" />
      <van-tab title="待支付" name="1" />
      <van-tab title="待服务" name="2" />
      <van-tab title="已完成" name="3" />
      <van-tab title="已取消" name="4" />
    </van-tabs>
    <van-row @click="goDetail(item)" v-for="item in order" :key="item.out_trade_no" class="mt-2">
      <van-col span="5" class="text-center">
        <van-image radius="5" :src="item.serviceImg" width="50"></van-image>
      </van-col>
      <van-col span="14">
        {{ item.service_name }}
        <div class="text-gray-600">
          {{ item.hospital_name }}
        </div>
        <p class="text-gray-600">预约时间:{{ item.starttime }}</p>
      </van-col>
      <van-col :style="{ color: colorMap[item.trade_state] }" span="5">
        <div>{{ item.trade_state }}</div>
        <span><van-count-down v-if="item.trade_state === '待支付'" :time="item.timer" :style="{ color: '#ffa200' }" /></span>
      </van-col>
    </van-row>
    <span class="flex justify-center items-center text-gray-300 mt-2">没有更多了</span>
  </div>
</template>

<script setup lang="ts" generic="T">
const active = ref('')
const order = ref<any[]>([])
const api: any = inject('api')
const router = useRouter()

const colorMap: any = {
  待支付: '#ffa200',
  待服务: '#00a1d6',
  已完成: '#00b050',
  已取消: '#999999'
}
const getOrderList = async (state: any = '') => {
  const { data } = await api.orderList({ state })
  data.forEach((item: any) => {
    item.timer = item.order_start_time + 60 * 60 * 2 * 1000 - Date.now()
  })
  order.value = data
}
const onClickTab = (item: any) => {
  getOrderList(item.name)
}
const goDetail = (item: any) => {
  router.push({
    name: 'detail',
    query: {
      oid: item.out_trade_no
    }
  })
}

onMounted(() => {
  getOrderList()
})
</script>
