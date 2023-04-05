import { customAxios, customAxiosWithAuth } from './api'

export async function getAllMenus() {
    const axios = customAxios()
    try {
        const response = await axios.get('/menus')
        return response.data
    } catch(err) {
        console.log(err.message)
        return []
    }
}

export async function getMenu(id) {
    const axios = customAxios()
    try {
        const response = await axios.get(`/menus/${id}`)
        return response.data
    } catch(err) {
        console.log(err.message)
    }
}

export async function deleteMenu(id) {
    const axios = customAxios()
    try {
        await axios.delete(`/menus/${id}`)
    } catch(err) {
        console.log(err.message)
    }
}

export async function createMenu(menu) {
    const axios = customAxiosWithAuth()
    try {
        const response = await axios.post('/menus', menu)
        console.log('res', response)
        return response.data._id
    } catch(err) {
        console.log(err.message)
    }
}

export async function updateMenu(id, menu) {
    const axios = customAxiosWithAuth()
    try {
        await axios.put(`/menus/${id}`, menu)
    } catch(err) {
        console.log(err.message)
    }
}