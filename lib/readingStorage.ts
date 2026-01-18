import { Reading } from "@/types/reading"

const KEY = "astrology_readings"

export const getReadings = (): Reading[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(KEY)
  return data ? JSON.parse(data) : []
}

export const getReadingsByUser = (userId: string): Reading[] => {
  return getReadings().filter(r => r.userId === userId)
}

export const saveReading = (reading: Reading) => {
  const readings = getReadings()
  readings.push(reading)
  localStorage.setItem(KEY, JSON.stringify(readings))
}

export const getReadingById = (id: string): Reading | undefined => {
  return getReadings().find(r => r.id === id)
}
