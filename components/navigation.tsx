"use client"

import Link from "next/link"
import { CarFront, Bot, Gauge, FerrisWheel as SteeringWheel, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Nav() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <CarFront className="h-6 w-6 text-primary" />
          <span className="font-heading text-lg tracking-tight">ChaufX Concierge</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <Link href="/faq" className="px-3 py-2 text-sm text-foreground/80 hover:text-foreground">
            FAQ
          </Link>
          <Link
            href="/admin"
            className="px-3 py-2 text-sm text-foreground/80 hover:text-foreground flex items-center gap-2"
          >
            <ClipboardList className="h-4 w-4 text-primary" /> Admin
          </Link>
          <Link
            href="/driver"
            className="px-3 py-2 text-sm text-foreground/80 hover:text-foreground flex items-center gap-2"
          >
            <SteeringWheel className="h-4 w-4 text-primary" /> Driver
          </Link>
          <Link
            href="/dashboard"
            className="px-3 py-2 text-sm text-foreground/80 hover:text-foreground flex items-center gap-2"
          >
            <Gauge className="h-4 w-4 text-primary" /> Analytics
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/#book">
            <Button className="bg-primary text-primary-foreground hover:opacity-90">Book a Ride</Button>
          </Link>
          <Bot className="h-5 w-5 text-primary" aria-hidden />
        </div>
      </div>
    </header>
  )
}
