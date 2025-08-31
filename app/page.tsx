"use client"

import type React from "react"

import { Nav } from "@/components/navigation"
import { BookingForm } from "@/components/booking-form"
import { ChatbotWidget } from "@/components/chatbot-widget"
import { Card } from "@/components/ui/card"
import { ArrowRight, ClipboardList, FerrisWheel as SteeringWheel, Gauge } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
            <h1 className="font-heading text-3xl md:text-4xl text-balance">Premium Chauffeur Bookings, Done Right.</h1>
            <p className="text-muted-foreground">
              ChaufX Concierge delivers luxury rides with a refined, minimalist experience. Book via chat or form, track
              assignments in real-time, and keep your fleet utilized efficiently.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="#book"
                className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2"
              >
                Book Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/faq" className="text-foreground/80 hover:text-foreground">
                View FAQ
              </Link>
            </div>
          </div>
          <Card className="bg-card p-6 border-border">
            <BookingForm />
          </Card>
        </div>

        <div className="mt-12 grid md:grid-cols-4 gap-4">
          <FlowCard
            title="User"
            desc="Landing, Chatbot, Form"
            href="/"
            icon={<ArrowRight className="h-5 w-5 text-primary" />}
          />
          <FlowCard
            title="Admin"
            desc="Booking Engine, Storage, Allocation"
            href="/admin"
            icon={<ClipboardList className="h-5 w-5 text-primary" />}
          />
          <FlowCard
            title="Driver"
            desc="Accept / Reject, Earnings"
            href="/driver"
            icon={<SteeringWheel className="h-5 w-5 text-primary" />}
          />
          <FlowCard
            title="Analytics"
            desc="Utilization, Demand, Revenue"
            href="/dashboard"
            icon={<Gauge className="h-5 w-5 text-primary" />}
          />
        </div>
      </section>

      <ChatbotWidget />
    </main>
  )
}

function FlowCard({ title, desc, href, icon }: { title: string; desc: string; href: string; icon: React.ReactNode }) {
  return (
    <Link href={href} className="rounded-xl border border-border p-4 hover:bg-secondary/30 transition">
      <div className="flex items-center justify-between">
        <div className="font-heading">{title}</div>
        {icon}
      </div>
      <div className="text-sm text-muted-foreground mt-1">{desc}</div>
    </Link>
  )
}
