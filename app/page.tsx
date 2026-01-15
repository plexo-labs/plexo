"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { PlayBets } from "@/components/play-bets"
import { PlayGames } from "@/components/play-games"
import { BetModal } from "@/components/bet-modal"
import { BetNotification } from "@/components/bet-notification"
import { GameView } from "@/components/game-view"
import { Footer } from "@/components/footer"
import type { LiveGame } from "@/lib/mock-data"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"bets" | "games">("bets")
  const [selectedGame, setSelectedGame] = useState<LiveGame | null>(null)
  const [showBetModal, setShowBetModal] = useState(false)
  const [betPlayer, setBetPlayer] = useState<"A" | "B" | null>(null)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationData, setNotificationData] = useState({ amount: "", playerName: "", odds: 0 })

  const handlePlaceBet = (game: LiveGame, player: "A" | "B") => {
    setSelectedGame(game)
    setBetPlayer(player)
    setShowBetModal(true)
  }

  const handleBetPlaced = (betAmount: string, playerName: string, odds: number) => {
    setNotificationData({ amount: betAmount, playerName, odds })
    setShowNotification(true)
  }

  const handleWatchGame = (game: LiveGame) => {
    setSelectedGame(game)
  }

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Header />

      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab("bets")}
              className={`relative py-4 text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "bets" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Play Bets
              {activeTab === "bets" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
            </button>
            <button
              onClick={() => setActiveTab("games")}
              className={`relative py-4 text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "games" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Play Games
              {activeTab === "games" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl w-full flex-1 px-4 py-8">
        {activeTab === "bets" ? <PlayBets onPlaceBet={handlePlaceBet} onWatchGame={handleWatchGame} /> : <PlayGames />}
      </div>

      {/* Footer */}
      <Footer />

      {/* Bet Modal */}
      {showBetModal && selectedGame && betPlayer && (
        <BetModal
          game={selectedGame}
          player={betPlayer}
          onClose={() => {
            setShowBetModal(false)
            setBetPlayer(null)
          }}
          onBetPlaced={handleBetPlaced}
        />
      )}

      {/* Bet Notification */}
      <BetNotification
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
        betAmount={notificationData.amount}
        playerName={notificationData.playerName}
        odds={notificationData.odds}
      />

      {/* Game View Modal */}
      {selectedGame && !showBetModal && (
        <GameView game={selectedGame} onClose={() => setSelectedGame(null)} onPlaceBet={handlePlaceBet} />
      )}
    </main>
  )
}
