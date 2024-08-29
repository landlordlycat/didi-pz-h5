import request from '@/utils/request'

enum H5 {
  LOGIN = '/login',
  HOME = '/Index/index',
  COMPANION = '/h5/companion',
  CREATEORDER = '/createOrder',
  ORDER_LIST = '/order/list',
  ORDER_DETAIL = '/order/detail'
}

type LoginParamsType = {
  userName: string
  passWord: string
}

export default {
  login(data: LoginParamsType) {
    return request.post(H5.LOGIN, data)
  },
  home() {
    return request.get(H5.HOME)
  },
  h5Companion() {
    return request.get(H5.COMPANION)
  },
  createOrder(data: any) {
    return request.post(H5.CREATEORDER, data)
  },
  orderList(params: any) {
    return request.get(H5.ORDER_LIST, { params })
  },
  orderDetail(params: any) {
    return request.get(H5.ORDER_DETAIL, { params })
  }
}
