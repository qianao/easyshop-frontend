import http from './public'

export const _updateCart = (id,data) => {http.fetchPut('/shoppingCart/'+id,data)}
