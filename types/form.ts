export type FormData = {
  // Step 1 — Контакты
  fullName:  string
  email:     string
  telegram:  string
  location:  string

  // Step 2 — Опыт
  hasRecreationExp: 'yes' | 'learning' | 'no' | ''
  recreationCount:  string
  recreationDetails: string
  experienceLinks:  string

  // Step 3 — DAW и жанры
  daw:         string
  dawYears:    string
  genres:      string[]
  otherGenres: string
  theoryLevel: 'basic' | 'intermediate' | 'advanced' | ''

  // Step 4 — Тестовое задание
  canRecreate:      'yes' | 'partially' | 'no' | ''
  recreateApproach: string
  timeEstimate:     string
  difficultyScore:  number

  // Step 5 — Плагины (требования студии)
  knownPlugins:  string[]
  serumLevel:    'none' | 'basic' | 'intermediate' | 'advanced' | ''
  stockPluginsOk: 'yes' | 'sometimes' | 'no' | ''
  pluginNotes:   string

  // Step 6 — Портфолио [EXTRA]
  portfolioLinks:    string
  tracksDescription: string

  // Step 7 — Условия [EXTRA]
  availability:    'fulltime' | 'parttime' | 'project' | ''
  rateExpectation: string
  startDate:       string
  additionalInfo:  string
}

export const defaultFormData: FormData = {
  fullName: '', email: '', telegram: '', location: '',
  hasRecreationExp: '', recreationCount: '', recreationDetails: '', experienceLinks: '',
  daw: '', dawYears: '', genres: [], otherGenres: '', theoryLevel: '',
  canRecreate: '', recreateApproach: '', timeEstimate: '', difficultyScore: 5,
  knownPlugins: [], serumLevel: '', stockPluginsOk: '', pluginNotes: '',
  portfolioLinks: '', tracksDescription: '',
  availability: '', rateExpectation: '', startDate: '', additionalInfo: '',
}

export const TOTAL_STEPS = 7
