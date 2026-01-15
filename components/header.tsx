"use client"

import { ConnectWalletButton } from "@/components/connect-wallet-button"
import { Zap } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">Plexo</span>
        </div>

        {/* Wallet Connect Button */}
        <ConnectWalletButton />
      </div>
    </header>
  )
}
