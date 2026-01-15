"use client"

import { useState, useEffect } from "react"
import { GameCard } from "@/components/game-card"
import { mockLiveGames, type LiveGame } from "@/lib/mock-data"
import { Activity } from "lucide-react"

interface PlayBetsProps {
  onPlaceBet: (game: LiveGame, player: "A" | "B") => void
  onWatchGame: (game: LiveGame) => void
}

export function PlayBets({ onPlaceBet, onWatchGame }: PlayBetsProps) {
  const [games, setGames] = useState<LiveGame[]>(mockLiveGames)

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setGames((prevGames) =>
        prevGames.map((game) => ({
          ...game,
          currentMove: Math.min(game.currentMove + 1, game.totalMoves),
          pool: game.pool + Math.random() * 0.5,
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const totalPool = games.reduce((sum, game) => sum + game.pool, 0)

  return (
    <div className="space-y-8">
      {/* Stats Banner */}
      <div className="flex items-center gap-6 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Activity className="h-5 w-5 text-primary" />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary animate-live" />
          </div>
          <span className="text-sm font-medium text-foreground">{games.length} Live Games</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Total Pool:</span>
          <span className="font-mono text-sm font-semibold text-primary">{totalPool.toFixed(2)} ETH</span>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <GameCard key={game.id} game={game} onPlaceBet={onPlaceBet} onWatch={() => onWatchGame(game)} />
        ))}
      </div>
    </div>
  )
}
