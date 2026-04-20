export type FormData = {
  wantsToJoin: 'yes' | 'curious' | ''
  daw: 'Ableton' | 'Logic Pro' | 'FL Studio' | ''
  canRecreate: 'yes' | 'partially' | 'no' | ''
  fullName: string
  email: string
  telegram: string
  location: string
}

export const defaultFormData: FormData = {
  wantsToJoin: '',
  daw: '',
  canRecreate: '',
  fullName: '',
  email: '',
  telegram: '',
  location: '',
}

export const TOTAL_STEPS = 6
