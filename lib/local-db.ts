export type RideStatus = "incoming" | "confirmed" | "assigned" | "completed" | "rejected" | "cancelled"
export type Vehicle = "Sedan" | "SUV" | "Luxury"
export type PaymentMethod = "Card" | "UPI" | "Wallet"

export type Ride = {
  id: string
  pickup: string
  drop: string
  dateISO: string // yyyy-MM-dd
  time: string // HH:mm
  vehicle: Vehicle
  status: RideStatus
  clientName?: string
  chauffeurId?: string
  price?: number
  createdAt: number
}

export type Driver = {
  id: string
  name: string
  zone: string
  earnings: number
  assignedRideIds: string[]
  utilization: number // 0..1
}

type DB = {
  rides: Ride[]
  drivers: Driver[]
}

const STORAGE_KEY = "chaufx-db-v1"
const EVT = "db:update"
const et = new EventTarget()

function seed(): DB {
  const now = Date.now()
  const d: DB = {
    rides: [],
    drivers: [
      { id: "drv-1", name: "Arjun Singh", zone: "Connaught Place", earnings: 0, assignedRideIds: [], utilization: 0.2 },
      { id: "drv-2", name: "Priya Mehra", zone: "Delhi Airport", earnings: 0, assignedRideIds: [], utilization: 0.15 },
      { id: "drv-3", name: "Rohit Gupta", zone: "Gurgaon", earnings: 0, assignedRideIds: [], utilization: 0.1 },
    ],
  }
  // Seed example incoming ride
  d.rides.push({
    id: "ride-demo",
    pickup: "Connaught Place",
    drop: "Delhi Terminal 1",
    dateISO: new Date(now).toISOString().slice(0, 10),
    time: "15:00",
    vehicle: "Sedan",
    status: "incoming",
    clientName: "Demo Client",
    createdAt: now,
    price: 1200,
  })
  return d
}

function getDB(): DB {
  if (typeof window === "undefined") return { rides: [], drivers: [] }
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    const s = seed()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
    return s
  }
  try {
    return JSON.parse(raw) as DB
  } catch {
    const s = seed()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
    return s
  }
}

function setDB(next: DB) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  et.dispatchEvent(new Event(EVT))
}

export function subscribe(cb: () => void) {
  const handler = () => cb()
  et.addEventListener(EVT, handler)
  const storageHandler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) cb()
  }
  window.addEventListener("storage", storageHandler)
  return () => {
    et.removeEventListener(EVT, handler)
    window.removeEventListener("storage", storageHandler)
  }
}

export function listRides(): Ride[] {
  return getDB().rides.sort((a, b) => b.createdAt - a.createdAt)
}
export function listIncoming(): Ride[] {
  return listRides().filter((r) => r.status === "incoming")
}
export function listConfirmed(): Ride[] {
  return listRides().filter((r) => r.status === "confirmed" || r.status === "assigned")
}
export function listDrivers(): Driver[] {
  return getDB().drivers
}

export function addRide(r: Omit<Ride, "id" | "createdAt" | "status"> & { status?: RideStatus }): Ride {
  const db = getDB()
  const ride: Ride = {
    id: `ride-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: Date.now(),
    status: r.status ?? "incoming",
    ...r,
  }
  db.rides.push(ride)
  setDB(db)
  return ride
}

export function updateRide(id: string, patch: Partial<Ride>) {
  const db = getDB()
  const r = db.rides.find((x) => x.id === id)
  if (!r) return
  Object.assign(r, patch)
  setDB(db)
}

export function confirmRide(id: string) {
  updateRide(id, { status: "confirmed" })
}

export function assignRide(rideId: string, driverId: string) {
  const db = getDB()
  const r = db.rides.find((x) => x.id === rideId)
  const d = db.drivers.find((x) => x.id === driverId)
  if (!r || !d) return
  r.status = "assigned"
  r.chauffeurId = d.id
  d.assignedRideIds.push(rideId)
  d.utilization = Math.min(1, d.utilization + 0.1)
  setDB(db)
}

export function completeRide(rideId: string) {
  const db = getDB()
  const r = db.rides.find((x) => x.id === rideId)
  if (!r) return
  r.status = "completed"
  if (r.chauffeurId) {
    const d = db.drivers.find((x) => x.id === r.chauffeurId)
    if (d) d.earnings += r.price ?? 1000
  }
  setDB(db)
}

export function rejectRide(rideId: string) {
  updateRide(rideId, { status: "rejected" })
}

export function autoAssignBest(rideId: string) {
  const db = getDB()
  const r = db.rides.find((x) => x.id === rideId)
  if (!r) return
  // naive match by zone proximity and lowest utilization
  const zoneHint = [r.drop, r.pickup].join(" ")
  const best = db.drivers.slice().sort((a, b) => {
    const aScore = (a.zone && zoneHint.includes(a.zone) ? -1 : 0) + a.utilization
    const bScore = (b.zone && zoneHint.includes(b.zone) ? -1 : 0) + b.utilization
    return aScore - bScore
  })[0]
  if (best) assignRide(rideId, best.id)
}

export function resetDB() {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
  setDB(seed())
}
