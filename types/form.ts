export type FormData = {
  wantsToJoin: 'yes' | ''
  aboutSelf: string

  fullName: string
  email: string
  telegram: string
  location: string

  taskConfidence: 'easy' | 'mixed' | 'learning' | ''
  taskComment: string

  daw: 'Ableton' | 'Logic Pro' | 'FL Studio' | ''

  tracksAssess: 'yes' | 'partially' | 'no' | ''
  tracksComment: string

  canRecreate: 'yes' | 'partially' | 'no' | ''
  projectComment: string

  portfolioLinks: string
}

export const defaultFormData: FormData = {
  wantsToJoin: '',
  aboutSelf: '',
  fullName: '',
  email: '',
  telegram: '',
  location: '',
  taskConfidence: '',
  taskComment: '',
  daw: '',
  tracksAssess: '',
  tracksComment: '',
  canRecreate: '',
  projectComment: '',
  portfolioLinks: '',
}

export const TOTAL_STEPS = 7
