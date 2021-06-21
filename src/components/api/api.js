const baseUrl = 'http://localhost:3001/api'

export const usersAPI = {

}

export const authAPI = {

    async login(email, password) {
        const res = await fetch(baseUrl + '/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json()
        return [res, data]
    },

    async signup(email, password, name) {
        const res = await fetch(baseUrl + '/auth/signup', {
            method: 'PUT',
            body: JSON.stringify({email, password, name}),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json()
        return [res, data]
    }
}