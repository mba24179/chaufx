"use client"

import { useSyncExternalStore, useMemo } from "react"
import { subscribe, listRides, listIncoming, listConfirmed, listDrivers, type Ride, type Driver } from "@/lib/local-db"

export function useRides(): Ride[] {
  return useSyncExternalStore(subscribe, listRides, () => [])
}
export function useIncomingRides(): Ride[] {
  return useSyncExternalStore(subscribe, listIncoming, () => [])
}
export function useConfirmedRides(): Ride[] {
  return useSyncExternalStore(subscribe, listConfirmed, () => [])
}
export function useDrivers(): Driver[] {
  return useSyncExternalStore(subscribe, listDrivers, () => [])
}
export function useMetrics() {
  const rides = useRides()
  const drivers = useDrivers()
  return useMemo(() => {
    const today = new Date().toISOString().slice(0, 10)
    const ridesToday = rides.filter((r) => r.dateISO === today)
    const completedToday = ridesToday.filter((r) => r.status === "completed").length
    const utilization = drivers.length
      ? Math.round((drivers.reduce((a, d) => a + d.utilization, 0) / drivers.length) * 100)
      : 0
    const avgPickupWait = 7 // mock minutes
    const satisfaction = 92 // mock %
    const byCity = ["Delhi Airport", "Connaught Place", "Gurgaon"].map((z) => ({
      zone: z,
      rides: rides.filter((r) => r.pickup.includes(z) || r.drop.includes(z)).length,
    }))
    return { ridesToday: ridesToday.length, utilization, avgPickupWait, satisfaction, completedToday, byCity }
  }, [rides, drivers])
}
