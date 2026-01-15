"use client"

import { X, Users, Zap, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { LiveGame } from "@/lib/mock-data"

interface GameViewProps {
  game: LiveGame
  onClose: () => void
  onPlaceBet: (game: LiveGame, player: "A" | "B") => void
}

export function GameView({ game, onClose, onPlaceBet }: GameViewProps) {
  const progress = (game.currentMove / game.totalMoves) * 100

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="relative w-full max-w-2xl border-border bg-card mx-4 max-h-[90vh] overflow-auto">
        <button onClick={onClose} className="absolute right-4 top-4 z-10 text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="border-b border-border p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-live" />
              <span className="text-xs font-medium text-primary">LIVE</span>
            </div>
            <span className="text-sm text-muted-foreground">{game.type}</span>
          </div>

          {/* Players Display */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-center flex-1">
              <div className="text-lg font-bold text-foreground">{game.playerA}</div>
              <div className="text-sm text-muted-foreground">{game.oddsA.toFixed(1)}x odds</div>
            </div>
            <div className="px-6">
              <div className="text-2xl font-bold text-muted-foreground">VS</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-lg font-bold text-foreground">{game.playerB}</div>
              <div className="text-sm text-muted-foreground">{game.oddsB.toFixed(1)}x odds</div>
            </div>
          </div>
        </div>

        {/* Game Board Placeholder */}
        <div className="p-6">
          <div className="aspect-square max-w-xs mx-auto rounded-xl bg-secondary/50 border border-border flex items-center justify-center">
            {game.type === "Tic-Tac-Toe" ? (
              <div className="grid grid-cols-3 gap-2 p-4 w-full h-full">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-background/50 border border-border flex items-center justify-center text-2xl font-bold text-muted-foreground"
                  >
                    {i < game.currentMove ? (i % 2 === 0 ? "X" : "O") : ""}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-1 p-4 w-full h-full">
                {Array.from({ length: 42 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-full bg-background/50 border border-border" />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Game Info */}
        <div className="border-t border-border p-6 space-y-4">
          {/* Progress */}
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>
                  Move {game.currentMove}/{game.totalMoves}
                </span>
              </div>
              <span className="text-primary animate-pulse-slow">In Progress</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Pool Info */}
          <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span className="text-sm">Total Betting Pool</span>
            </div>
            <span className="font-mono text-lg font-semibold text-foreground">{game.pool.toFixed(3)} ETH</span>
          </div>

          {/* Bet Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              size="lg"
              className="flex-col h-auto py-4 gap-1 bg-transparent"
              onClick={() => onPlaceBet(game, "A")}
            >
              <span className="text-xs text-muted-foreground">Bet on</span>
              <span className="font-semibold">{game.playerA}</span>
              <div className="flex items-center gap-1 text-primary">
                <Zap className="h-3 w-3" />
                <span className="text-sm">{game.oddsA.toFixed(1)}x</span>
              </div>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex-col h-auto py-4 gap-1 bg-transparent"
              onClick={() => onPlaceBet(game, "B")}
            >
              <span className="text-xs text-muted-foreground">Bet on</span>
              <span className="font-semibold">{game.playerB}</span>
              <div className="flex items-center gap-1 text-primary">
                <Zap className="h-3 w-3" />
                <span className="text-sm">{game.oddsB.toFixed(1)}x</span>
              </div>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
