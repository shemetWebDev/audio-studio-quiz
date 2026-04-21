export type FormData = {
  wantsToJoin: 'yes' | ''

  email: string
  telegram: string

  waveformUnderstanding: 'yes' | 'partially' | 'no' | ''
  waveformComment: string

  taskConfidence: 'easy' | 'mixed' | 'learning' | ''
  taskComment: string

  daw: 'Ableton' | 'Logic Pro' | 'FL Studio' | ''

  tracksAssess: 'yes' | 'partially' | 'no' | ''
  tracksComment: string

  canRecreate: 'yes' | 'partially' | 'no' | ''
  projectComment: string

}

export const defaultFormData: FormData = {
  wantsToJoin: '',
  email: '',
  telegram: '',
  waveformUnderstanding: '',
  waveformComment: '',
  taskConfidence: '',
  taskComment: '',
  daw: '',
  tracksAssess: '',
  tracksComment: '',
  canRecreate: '',
  projectComment: '',
}

export const TOTAL_STEPS = 7
