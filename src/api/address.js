// import http from '../tools/http/http'
// export const _getUserInfo = (errMsg) => http.GET('/api/auth/userInfo', {}, errMsg)
//
// export const _delAddrById = () => {http.DELETE('/userAddr/5',"sfa")}
//
// export const _getAllAddr = (param) =>http.GET('/userAddr',{ params : param },"as")

import http from './public'

export const _delAddrById = (id) => {http.fetchDelete('/userAddr/'+id)}

export const _setDefautAddrById = (param) => http.fetchGet('/userAddr/setDefault',{params : param})

export const _getAddrById =  (param) => http.fetchGet('/userAddr',{params : param})

export const _getById =  (param) => http.fetchGet('/userAddr/'+param)

export const _updateAddrById =  (id,data) => http.fetchPut('/userAddr/'+id,data)
