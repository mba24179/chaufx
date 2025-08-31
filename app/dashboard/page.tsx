"use client"

import { Nav } from "@/components/navigation"
import { AnalyticsDashboard } from "@/components/dashboard/analytics"

export default function DashboardPage() {
  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="font-heading text-2xl mb-4">Analytics</h1>
        <AnalyticsDashboard />
      </section>
    </main>
  )
}
