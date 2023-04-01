import { customAxios, customAxiosWithAuth } from './api'

export async function getAllOrders() {
    const axios = customAxios()
    try {
        const response = await axios.get('/orders')
        return response.data
    } catch(err) {
        console.log(err.message)
        return []
    }
}

export async function getOrder(id) {
    const axios = customAxios()
    try {
        const response = await axios.get(`/orders/${id}`)
        return response.data
    } catch(err) {
        console.log(err.message)
    }
}

export async function deleteOrder(id) {
    const axios = customAxios()
    try {
        await axios.delete(`/orders/${id}`)
    } catch(err) {
        console.log(err.message)
    }
}

export async function createOrder(order) {
    const axios = customAxiosWithAuth()
    try {
        const response = await axios.post('/orders', order)
        console.log('res', response)
        return response.data._id
    } catch(err) {
        console.log(err.message)
    }
}

export async function updateOrder(id, order) {
    const axios = customAxiosWithAuth()
    try {
        await axios.put(`/orders/${id}`, order)
    } catch(err) {
        console.log(err.message)
    }
}