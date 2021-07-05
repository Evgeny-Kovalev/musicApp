import { urlFromObj } from "../../helpers"

const baseUrl = 'http://localhost:3001/api'

export const usersAPI = {
    async getUsers(user) {
        const res = await fetch(baseUrl + '/user', {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
        const data = await res.json()
        return [res, data]
    },

    async getUserById(authUser, userId) {
        const res = await fetch(baseUrl + `/user/${userId}`, {
            headers: {
                'Authorization': 'Bearer ' + authUser.token
            }
        })
        const data = await res.json()
        return [res, data]
    },

    async updateUser(authUser, user, formData) {
        const res = await fetch(baseUrl + `/user/${user._id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + authUser.token
            },
            body: formData,
        })
        const data = await res.json()
        return [res, data]
    },
    
    async addNewUser(authUser, formData) {
        const res = await fetch(baseUrl + '/user', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + authUser.token
            },
            body: formData,
        })
        const data = await res.json()
        return [res, data]
    },

    async removeUser(authUser, user) {
        const res = await fetch(baseUrl + '/user/' + user._id, {
            method: 'DELETE',
            headers: {
                Authorization: "Bearer " + authUser.token
            }
        })
        const data = await res.json()
        return [res, data]
    },
    
    async getUserMusic(user) {
        const res = await fetch(baseUrl + '/user/music/', {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
        const data = await res.json()
        return [res, data]
    },
    
    async getUserLikedMusic(user) {
        const res = await fetch(baseUrl + '/user/music/liked', {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
        const data = await res.json()
        return [res, data]
    },

    async addSongToUserMusic(user, song) {
        const res = await fetch(baseUrl + `/user/music/${song._id}`, {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
        const data = await res.json()
        return [res, data]
    },


    async removeSongFromUserMusic(user, song) {
        const res = await fetch(baseUrl + `/user/music/${song._id}`, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
        const data = await res.json()
        return [res, data]
    },

    async getUserPlaylists(user) {
        const res = await fetch(baseUrl + '/user/playlists/', {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
        const data = await res.json()
        return [res, data]
    },

    async createNewUserPlaylist(user, playlist) {
        const res = await fetch(baseUrl + '/user/playlists', {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + user.token
            },
            body: playlist,
        })
        const data = await res.json()
        return [res, data]
    },


    async addPlaylistToMy(user, playlist) {
        const res = await fetch(baseUrl + `/user/playlists/${playlist._id}`, {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
        const data = await res.json()
        return [res, data]
    },

    async removePlaylistFromMy(user, playlist) {
        const res = await fetch(baseUrl + `/user/playlists/${playlist._id}`, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
        const data = await res.json()
        return [res, data]
    },

    async addSongToPlaylist(user, playlistId, song) {
        const res = await fetch(baseUrl + `/playlists/${playlistId}/music/${song._id}`, {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
        const data = await res.json()
        return [res, data]
    },
    
    async removeSongFromPlaylist(user, playlistId, song) {
        const res = await fetch(baseUrl + `/playlists/${playlistId}/music/${song._id}`, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
        const data = await res.json()
        return [res, data]
    }

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
    },

    async authMe(token) {
        const res = await fetch(baseUrl + '/auth/me', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        const data = await res.json()
        return [res, data]
    }
}

export const musicAPI = {
    async getMusic(user, options) {
        const url = urlFromObj({
            url: baseUrl + '/music/',
            search: options?.songName,
            limit: options?.limit,
            orderBy: options?.orderBy,
            order: options?.order 
        })
 
        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json()
        return [res, data]
    },

    async updateSong(user, song, formData) {
        const res = await fetch(baseUrl + `/music/${song._id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + user.token
            },
            body: formData,
        })
        const data = await res.json()
        return [res, data]
    },

    async getSongById(songId) {
        const res = await fetch(baseUrl + `/music/${songId}`)
        const data = await res.json()
        return [res, data]
    },

    async addNewMusic(user, formData) {
        const res = await fetch(baseUrl + '/music/', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + user.token
            },
            body: formData,
        })
        const data = await res.json()
        return [res, data]
    },
    async removeSong(user, song) {
        const res = await fetch(baseUrl + '/music/' + song._id, {
            method: 'DELETE',
            headers: {
                Authorization: "Bearer " + user.token
            }
        })
        const data = await res.json()
        return [res, data]
    },

    async likeSong(user, song) {
        const res = await fetch(baseUrl + `/music/${song._id}/like`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + user.token
            },
        })
        const data = await res.json()
        return [res, data]
    },

    async unlikeSong(user, song) {
        const res = await fetch(baseUrl + `/music/${song._id}/like`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + user.token
            },
        })
        const data = await res.json()
        return [res, data]
    },

    async getSongCommentsById(songId) {
        const res = await fetch(baseUrl + `/music/${songId}/comments`)
        const data = await res.json()
        return [res, data]
    },
    
    async addCommentToSongById(user, songId, comment) {
        const res = await fetch(baseUrl + `/music/${songId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify({ text: comment })
        })
        const data = await res.json()
        return [res, data]
        
    },

    async editSong(user, song, songData) {
        const res = await fetch(baseUrl + `/music/${song._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify({ songData })
        })
        const data = await res.json()
        return [res, data]
    },

    async addPlayToSong(song) {
        const res = await fetch(baseUrl + `/music/${song._id}/plays`, {
            method: 'POST',
        })
        const data = await res.json()
        return [res, data]
    }

}

export const playlistAPI = {
    async getPlaylistById(playlistId) {
        const res = await fetch(baseUrl + `/playlists/${playlistId}`)
        const data = await res.json()
        return [res, data]
    },

    async getPopularPlaylists() {
        const res = await fetch(baseUrl + '/playlists')
        const data = await res.json()
        return [res, data]
    },

    async editMyPlaylist(user, playlist, newData) {
        const res = await fetch(baseUrl + `/playlists/${playlist._id}`, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + user.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({playlist: newData})
        })
        const data = await res.json()
        return [res, data]
    }
}

export const rolesAPI = {
    async getRoles(user) {
        const res = await fetch(baseUrl + '/roles/users', {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        })
        const data = await res.json()
        return [res, data]
    },
    async removeRoleFromUser(authUser, role, user) {
        const res = await fetch(baseUrl + `/roles/users`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + authUser.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                role: {
                    _id: role._id,
                    value: role.value
                },
                user
            })
        })
        const data = await res.json()
        return [res, data]
    },
    async addRoleToUser(authUser, role, user) {
        const res = await fetch(baseUrl + `/roles/users`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + authUser.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                role: {
                    _id: role._id,
                    value: role.value
                },
                user
            })
        })
        const data = await res.json()
        return [res, data]
    },
}

