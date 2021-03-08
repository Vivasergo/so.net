import { ProfileType, AuthData, UserType, Nullable, PhotosType } from './../Types/types'
import Axios from 'axios'

const instance = Axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': '166676e4-122d-492a-9e83-9e4ac780a77c',
    },
})

export const usersAPI = {
    getUsers(countItems = 50, page = 1) {
        return instance.get<UsersAPIType>(`users?count=${countItems}&page=${page}`)
    },
}

export const followAPI = {
    unfollow(userId: number) {
        return instance.delete<ResponseType<{}>>(`follow/${userId}`)
    },

    follow(userId: number) {
        return instance.post<ResponseType<{}>>(`follow/${userId}`)
    },
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
    },

    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
    },

    updateStatus(status: string) {
        return instance.put<ResponseType<{}>>(`profile/status`, { status })
    },

    updateProfile(profile: ProfileType) {
        return instance.put<ResponseType<{}>>(`profile`, profile)
    },

    uploadNewAvatar(file: File) {
        let formData = new FormData()
        formData.append('image', file)

        return instance.put<ResponseType<PhotosObjType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },
}

export const authAPI = {
    me() {
        return instance.get<ResponseType<MeDataType>>('auth/me').then((resp) => resp.data)
    },
    login(userData: AuthData) {
        return instance.post<ResponseType<LoginDataType>>('auth/login', userData)
    },
    logout() {
        return instance.delete<LogoutType>('auth/login')
    },
}

export const captchaAPI = {
    getCaptcha() {
        return instance.get<CaptchaAPIType>('security/get-captcha-url')
    },
}

//
type CaptchaAPIType = {
    url: string
}
type ResponseType<T> = {
    resultCode: number
    messages: Array<string>
    data: T
}
type MeDataType = {
    id: number
    email: string
    login: string
}
type LoginDataType = {
    userId: number
}
type PhotosObjType = {
    photos: PhotosType
}
type LogoutType = {
    resultCode: number
}
type UsersAPIType = {
    items: Array<UserType>
    totalCount: number
    error: Nullable<string>
}