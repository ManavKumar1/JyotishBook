export interface Reading {
  id: string
  userId: string
  readingDate: string   // auto (YYYY-MM-DD)
  readingTime: string   // manual or auto (HH:MM AM/PM)
  questions: string[]
  prediction: string
  createdAt: string
}
