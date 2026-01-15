"use client"

import { useEffect, useState } from "react"
import { CheckCircle, X } from "lucide-react"

interface BetNotificationProps {
  isOpen: boolean
  onClose: () => void
  betAmount: string
  playerName: string
  odds: number
}

export function BetNotification({ isOpen, onClose, betAmount, playerName, odds }: BetNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose()
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  if (!isVisible) return null

  const potentialWin = (Number.parseFloat(betAmount) * odds).toFixed(4)

  return (
    <div className="fixed top-4 right-4 z-[60] animate-in slide-in-from-top-2 fade-in">
      <div className="rounded-lg border border-primary/50 bg-gradient-to-r from-primary/10 to-transparent p-4 shadow-lg backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Bet Placed Successfully!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {betAmount} ETH on <span className="font-medium text-foreground">{playerName}</span> at {odds.toFixed(1)}x
            </p>
            <p className="text-xs text-primary mt-1">
              Potential win: <span className="font-mono font-semibold">{potentialWin} ETH</span>
            </p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false)
              onClose()
            }}
            className="text-muted-foreground hover:text-foreground mt-0.5 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
