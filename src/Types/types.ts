export type ContactsType = {
  github: string | null;
  vk: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  website: string | null;
  youtube: string | null;
  mainLink: string | null;
};
export type PhotosType = {
  small: string | null;
  large: string | null;
};
export type ProfileType = {
  userId: number;
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
  photos?: PhotosType;
};

export type UserType = {
  name: string;
  id: number;
  uniqueUrlName: string | null;
  photos: PhotosType;
  status: string | null;
  followed: boolean;
};

export type AppErrorType = {
  response: { status: string };
  message: string;
};
export type AuthData = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: boolean;
}
