"use client"

import { useState, useEffect } from "react"
import { X, Zap, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAccount, useSendTransaction } from "wagmi"
import { parseEther } from "viem"
import type { LiveGame } from "@/lib/mock-data"

interface BetModalProps {
  game: LiveGame
  player: "A" | "B"
  onClose: () => void
  onBetPlaced?: (betAmount: string, playerName: string, odds: number) => void
}

export function BetModal({ game, player, onClose, onBetPlaced }: BetModalProps) {
  const [amount, setAmount] = useState("")
  const { address, isConnected } = useAccount()
  const { sendTransaction, isPending, isSuccess, data } = useSendTransaction()

  const playerName = player === "A" ? game.playerA : game.playerB
  const odds = player === "A" ? game.oddsA : game.oddsB
  const potentialWin = amount ? Number.parseFloat(amount) * odds : 0

  useEffect(() => {
    if (isSuccess && data) {
      console.log("[v0] Transaction confirmed:", data)
      onBetPlaced?.(amount, playerName, odds)
      setTimeout(() => onClose(), 500)
    }
  }, [isSuccess, data, amount, playerName, odds, onBetPlaced, onClose])

  const handlePlaceBet = () => {
    if (!isConnected || !address) {
      alert("Please connect your wallet to place a bet")
      return
    }

    if (!amount || Number.parseFloat(amount) <= 0) {
      return
    }

    sendTransaction({
      to: address,
      value: parseEther(amount),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="relative w-full max-w-md border-border bg-card p-6 mx-4">
        <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Place Your Bet</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {game.type} • {game.playerA} vs {game.playerB}
          </p>
        </div>

        {/* Selected Player */}
        <div className="mb-6 rounded-lg bg-secondary/50 p-4">
          <div className="mb-2 text-xs text-muted-foreground">Betting on</div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-foreground">{playerName}</span>
            <div className="flex items-center gap-1 text-primary">
              <TrendingUp className="h-4 w-4" />
              <span className="font-mono font-semibold">{odds.toFixed(1)}x</span>
            </div>
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-foreground">Bet Amount (ETH)</label>
          <Input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="font-mono"
          />
          <div className="mt-2 flex gap-2">
            {[0.01, 0.05, 0.1, 0.5].map((preset) => (
              <button
                key={preset}
                onClick={() => setAmount(preset.toString())}
                className="rounded-md bg-secondary px-3 py-1 text-xs font-medium text-foreground hover:bg-secondary/80"
              >
                {preset} ETH
              </button>
            ))}
          </div>
        </div>

        {/* Potential Win */}
        <div className="mb-6 flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 p-4">
          <span className="text-sm text-muted-foreground">Potential Win</span>
          <span className="font-mono text-lg font-semibold text-primary">{potentialWin.toFixed(4)} ETH</span>
        </div>

        {!isConnected && (
          <div className="mb-6 rounded-lg bg-amber-500/10 border border-amber-500/30 p-3">
            <p className="text-xs text-amber-600">Please connect your wallet to place bets</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button
            onClick={handlePlaceBet}
            disabled={!amount || Number.parseFloat(amount) <= 0 || !isConnected || isPending}
            className="flex-1 gap-2"
          >
            <Zap className="h-4 w-4" />
            {isPending ? "Signing..." : "Confirm Bet"}
          </Button>
        </div>
      </Card>
    </div>
  )
}
