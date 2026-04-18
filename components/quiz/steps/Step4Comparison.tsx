import { FormData } from '@/types/form'
import '@/components/quiz/steps/step.scss'

// ─────────────────────────────────────────────────────────────────────────────
// МЕДИАФАЙЛЫ
//
// 🖼  Изображения → /public/images/comparison/
//     wave-original-1.png  /  wave-recreated-1.png
//     wave-original-2.png  /  wave-recreated-2.png
//     wave-original-3.png  /  wave-recreated-3.png
//
// 🎵  Треки → /public/tracks/
//     original-1.mp3  /  recreated-1.mp3
//     original-2.mp3  /  recreated-2.mp3
//     original-3.mp3  /  recreated-3.mp3
//
// Когда добавишь файлы:
// 1. Раскомментируй import Image from 'next/image'
// 2. Раскомментируй COMPARISON_PAIRS
// 3. Замени блок-заглушку на блок с реальными парами
// ─────────────────────────────────────────────────────────────────────────────

// import Image from 'next/image'

// const COMPARISON_PAIRS = [
//   {
//     label: 'Пример 1',
//     imgOriginal:    '/images/comparison/wave-original-1.png',
//     imgRecreated:   '/images/comparison/wave-recreated-1.png',
//     trackOriginal:  '/tracks/original-1.mp3',
//     trackRecreated: '/tracks/recreated-1.mp3',
//   },
//   {
//     label: 'Пример 2',
//     imgOriginal:    '/images/comparison/wave-original-2.png',
//     imgRecreated:   '/images/comparison/wave-recreated-2.png',
//     trackOriginal:  '/tracks/original-2.mp3',
//     trackRecreated: '/tracks/recreated-2.mp3',
//   },
//   {
//     label: 'Пример 3',
//     imgOriginal:    '/images/comparison/wave-original-3.png',
//     imgRecreated:   '/images/comparison/wave-recreated-3.png',
//     trackOriginal:  '/tracks/original-3.mp3',
//     trackRecreated: '/tracks/recreated-3.mp3',
//   },
// ]

type Props = { data: FormData; update: (f: Partial<FormData>) => void }

const RECREATE_OPTIONS = [
  { value: 'yes',       label: 'Справлюсь' },
  { value: 'partially', label: 'Частично' },
  { value: 'no',        label: 'Затрудняюсь' },
] as const

export default function Step4Comparison({ data, update }: Props) {
  const b = 'step'

  return (
    <div className={b}>
      <p className={`${b}__index`}>04 · Тестовое задание</p>
      <h2 className={`${b}__heading`}>Оцените сложность задачи</h2>
      <p className={`${b}__subheading`}>
        Ниже — оригинал и воссозданный трек. Изучите разницу по волне и спектру,
        затем ответьте на вопросы.
      </p>

      {/* ── ЗАГЛУШКА — заменить когда добавишь файлы ────────────────────────

        {COMPARISON_PAIRS.map((pair, i) => (
          <div key={i} className={`${b}__field`}>
            <label className={`${b}__label`}>{pair.label}</label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: 4 }}>Оригинал</span>
                <Image src={pair.imgOriginal} alt="Оригинал" width={240} height={80}
                  style={{ width: '100%', borderRadius: 8, opacity: 0.85 }} />
                <audio controls src={pair.trackOriginal}
                  style={{ width: '100%', marginTop: 6, height: 32 }} />
              </div>
              <div>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: 4 }}>Воссозданный</span>
                <Image src={pair.imgRecreated} alt="Воссозданный" width={240} height={80}
                  style={{ width: '100%', borderRadius: 8, opacity: 0.85 }} />
                <audio controls src={pair.trackRecreated}
                  style={{ width: '100%', marginTop: 6, height: 32 }} />
              </div>
            </div>
          </div>
        ))}

      ────────────────────────────────────────────────────────────────────── */}

      <div className={`${b}__placeholder`}>
        <span className={`${b}__placeholder-icon`}>🎛</span>
        Здесь появятся изображения волн и треки для сравнения
        <small>
          Добавь файлы в /public/images/comparison/ и /public/tracks/<br />
          затем раскомментируй блок выше
        </small>
      </div>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>Сможете воссоздать с таким качеством?</label>
        <div className={`${b}__options`}>
          {RECREATE_OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`${b}__option${data.canRecreate === opt.value ? ` ${b}__option--selected` : ''}`}
              onClick={() => update({ canRecreate: opt.value })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`${b}__field`}>
        <label className={`${b}__label`}>Ваш подход к воссозданию</label>
        <textarea
          className={`${b}__textarea`}
          placeholder="С чего начнёте? Как будете анализировать частоты, транзиенты, пространство, сайдчейн?.."
          value={data.recreateApproach}
          onChange={e => update({ recreateApproach: e.target.value })}
          rows={3}
        />
      </div>

      <div className={`${b}__row`}>
        <div className={`${b}__field`}>
          <label className={`${b}__label`}>Оценка времени</label>
          <input
            className={`${b}__input`}
            placeholder="напр. 3–5 дней"
            value={data.timeEstimate}
            onChange={e => update({ timeEstimate: e.target.value })}
          />
        </div>

        <div className={`${b}__field`}>
          <label className={`${b}__label`}>
            Субъективная сложность
            <span className={`${b}__label-value`}>{data.difficultyScore}/10</span>
          </label>
          <input
            type="range"
            min={1} max={10} step={1}
            value={data.difficultyScore}
            onChange={e => update({ difficultyScore: Number(e.target.value) })}
            className={`${b}__range`}
          />
          <div className={`${b}__range-hints`}>
            <span>Легко</span>
            <span>Очень сложно</span>
          </div>
        </div>
      </div>
    </div>
  )
}
