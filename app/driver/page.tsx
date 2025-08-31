"use client"

import { Nav } from "@/components/navigation"
import { DriverView } from "@/components/driver/driver-view"

export default function DriverPage() {
  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="font-heading text-2xl mb-4">Driver</h1>
        <DriverView />
      </section>
    </main>
  )
}
