import { create } from 'zustand'

export const useSystem = create<SystemStore>((set, get) => ({
  isLoading: false,
  viewImage: null,
  toast: {
    open: false,
    message: 'Default message',
  },
  setToast: (toast) => set({toast}),
  showLoading: () => set({isLoading: true}),
  hideLoading: () => set({isLoading: false}),
}))


interface SystemStore  {
  isLoading: boolean,
  toast: {
    open: boolean,
    message: string,
  },
  setToast: (toast:{
    open: boolean,
    message: string,
  }) => void,
  showLoading: () => void,
  hideLoading: () => void
}