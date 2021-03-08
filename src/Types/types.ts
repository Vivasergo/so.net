import { Action } from "redux"
import { ThunkAction } from "redux-thunk"
import { AppStateType } from "../Redux/redux-store"

export type ContactsType = {
    github: Nullable<string>
    vk: Nullable<string>
    facebook: Nullable<string>
    instagram: Nullable<string>
    twitter: Nullable<string>
    website: Nullable<string>
    youtube: Nullable<string>
    mainLink: Nullable<string>
}
export type PhotosType = {
    small: Nullable<string>
    large: Nullable<string>
}
export type ProfileType = {
    userId: number
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos?: PhotosType
}

export type UserType = {
    name: string
    id: number
    // uniqueUrlName: Nullable<string>
    photos: PhotosType
    status: Nullable<string>
    followed: boolean
}

export type AppErrorType = {
    response: { status: string }
    message: string
}
export type AuthData = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: boolean
}

export type Nullable<T> = null | T //Generic

export type InferringActionType<T> = T extends { [key: string]: infer U }
    ? U
    : never

export type ThunkType<AT extends Action, R=Promise<void>> = ThunkAction<R, AppStateType, unknown, AT>
