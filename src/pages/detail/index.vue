<template>
  <div class="h-full">
    <van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft" />
    <StatusBar :item="state" />
    <div class="bg-gray-200 p-5">
      <div v-if="orderDetailList?.trade_state === '待支付'">
        <span class="text-gray-800 font-mono text-xl">订单待支付，请及时付款！</span>

        <div class="flex items-center space-x-1 text-gray-500/80">
          <span>请在</span>
          <van-count-down :time="time">
            <template #default="timeData">
              <span class="text-red-800">{{ timeData.hours < 10 ? '0' + timeData.hours : timeData.hours }}</span>
              <span class="colon">:</span>
              <span class="text-red-800">{{ timeData.minutes < 10 ? '0' + timeData.minutes : timeData.minutes }}</span>
              <span class="colon">:</span>
              <span class="text-red-800">{{ timeData.seconds < 10 ? '0' + timeData.seconds : timeData.seconds }}</span>
            </template>
          </van-count-down>
          <span>内完成支付,超时订单自动取消</span>
        </div>
        <div class="text-center mt-2">
          <van-button type="success" @click="onClickPay" size="large" style="width: 300px">立即支付({{ orderDetailList?.price }}元)</van-button>
        </div>
      </div>
      <div v-if="orderDetailList?.trade_state === '带待服务'">
        <span class="text-gray-800 font-mono text-xl">正在为您安排服务专员...</span>

        <div class="flex items-center space-x-1 text-gray-500/80">
          <span>请保持手机通畅，稍后将有服务专员与您联系</span>
        </div>
      </div>
      <div v-if="orderDetailList?.trade_state === '已完成'">
        <span class="text-gray-800 font-mono text-xl">服务已完成</span>

        <div class="flex items-center space-x-1 text-gray-500/80">
          <span>感谢您的使用，如有问题请联系客服</span>
        </div>
      </div>
      <div v-if="orderDetailList?.trade_state === '已取消'">
        <span class="text-gray-800 font-mono text-xl">订单已取消</span>

        <div class="flex items-center space-x-1 text-gray-500/80">
          <span>期待下次为您服务，如需帮助可咨询客服</span>
        </div>
      </div>
    </div>
    <van-cell-group title="预约信息">
      <van-cell title="预约服务" :value="orderDetailList?.service_name"></van-cell>
      <van-cell title="就诊医院" :value="orderDetailList?.hospital_name"></van-cell>
      <van-cell title="期望就诊时间" :value="orderDetailList?.starttime"> </van-cell>
      <van-cell title="就诊人" :value="orderDetailList?.client?.name"></van-cell>
      <van-cell title="就诊人电话" :value="orderDetailList?.client?.mobile"></van-cell>
      <van-cell title="接送地址" :value="orderDetailList?.receiveAddress"></van-cell>
      <van-cell title="其他需求" :value="orderDetailList?.demand"></van-cell>
    </van-cell-group>
    <span class="border-b border-gray-300 h-1"></span>
    <van-cell-group title="订单信息">
      <van-cell title="就诊人电话" :value="orderDetailList?.tel"></van-cell>
      <van-cell title="下单时间" :value="orderDetailList?.starttime">
        <template #right-icon></template>
      </van-cell>
      <van-cell title="应付金额" :value="orderDetailList?.price"></van-cell>
    </van-cell-group>
    <van-dialog v-model:show="payDialog" :showConfirmButton="false">
      <van-icon name="cross" size="30" class="absolute left-3 top-8" @click="closeCode"></van-icon>
      <div class="text-center space-y-2">
        <div class="m-auto mb-3 text-3xl">微信支付</div>
        <van-image :src="payUrl" width="150" />
        <p class="h-10 text-center">请使用本人微信扫描二维码</p>
      </div>
    </van-dialog>
  </div>
</template>

<script setup lang="ts" generic="T">
import StatusBar from '@/components/StatusBar.vue'
import QRCode from 'qrcode'
const router = useRouter()
const route = useRoute()
const payDialog = ref(false)
const api: any = inject('api')
const payUrl = ref('')
const orderDetailList = ref()

const time = computed(() => {
  return orderDetailList.value.order_start_time + 60 * 60 * 2 * 1000 - Date.now()
})
const stateMap = {
  待支付: 10,
  待服务: 20,
  已完成: 30,
  已取消: 40
}

const state = computed(() => {
  // return stateMap[orderDetailList.value.trade_state] || 40
  return 40
})

const onClickPay = async () => {
  const res = await QRCode.toDataURL(orderDetailList.value.code_url)
  payDialog.value = true
  payUrl.value = res
}
const onClickLeft = () => {
  router.back()
}
const closeCode = () => {
  router.push('/order')
}
onMounted(async () => {
  const res = await api.orderDetail({
    oid: route.query.oid
  })
  orderDetailList.value = res.data
})
</script>
