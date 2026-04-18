# Audio Studio — Quiz

## Быстрый старт

```bash
cp .env.local.example .env.local   # заполни токены
npm install
npm run dev
# → http://localhost:3000
```

## Медиафайлы

### 🖼 Изображения волн/спектра → `/public/images/comparison/`
```
wave-original-1.png   wave-recreated-1.png
wave-original-2.png   wave-recreated-2.png
wave-original-3.png   wave-recreated-3.png
```

### 🎵 Треки → `/public/tracks/`
```
original-1.mp3    recreated-1.mp3
original-2.mp3    recreated-2.mp3
original-3.mp3    recreated-3.mp3
```
После добавления файлов — раскомментируй блок в `Step4Comparison.tsx`

## Структура

```
app/
  page.tsx                   ← лендинг
  quiz/page.tsx              ← контроллер формы (7 шагов)
  api/submit/route.ts        ← отправка Telegram + Email

components/quiz/
  ProgressBar.tsx
  steps/
    Step1Contacts.tsx        ← контакты
    Step2Experience.tsx      ← опыт воссоздания
    Step3Skills.tsx          ← DAW и жанры
    Step4Comparison.tsx      ← тестовое задание
    Step5Plugins.tsx         ← требования студии к плагинам
    Step6Portfolio.tsx       ← [EXTRA] портфолио
    Step7Workflow.tsx        ← [EXTRA] условия работы
    StepDone.tsx             ← финальный экран

lib/
  buildMessage.ts            ← форматирование сообщений (TG + Email)

types/
  form.ts                    ← типы + defaultFormData + TOTAL_STEPS

styles/
  _variables.scss            ← переменные
  _mixins.scss               ← миксины
```

## Удалить EXTRA шаги

1. Убери импорт и `{step === N && <StepN ... />}` в `app/quiz/page.tsx`
2. Уменьши `TOTAL_STEPS` в `types/form.ts`
3. Удали соответствующие поля из `FormData`

## ENV переменные

| Переменная | Описание |
|---|---|
| `TELEGRAM_BOT_TOKEN` | Токен бота от @BotFather |
| `TELEGRAM_CHAT_ID` | ID чата (@userinfobot) |
| `RESEND_API_KEY` | API ключ resend.com |
| `EMAIL_TO` | Куда приходят анкеты |
| `EMAIL_FROM` | От кого (верифицирован в Resend) |
