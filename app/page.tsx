"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Wallet, Send, MessageCircle, Users, Moon, Sun, Star, Trophy } from "lucide-react"

interface AnimatedStarProps {
  show: boolean
  onComplete: () => void
}

function AnimatedStar({ show, onComplete }: AnimatedStarProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onComplete()
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  if (!show) return null

  return (
    <div className="absolute -top-2 -right-2 pointer-events-none">
      <Star
        className="h-4 w-4 text-[#FACC15] animate-bounce fill-current"
        style={{
          animation: "starPop 1s ease-out forwards",
        }}
      />
      <style jsx>{`
        @keyframes starPop {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
          100% { transform: scale(0.8) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default function RecombEE() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [recommendation, setRecommendation] = useState("")
  const [recommendationsSent, setRecommendationsSent] = useState(12)
  const [rewardsEarned, setRewardsEarned] = useState(8)
  const [showRecommendationStar, setShowRecommendationStar] = useState(false)
  const [showRewardStar, setShowRewardStar] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Alice",
      message: "I recommend the Italian restaurant downtown, excellent pasta!",
      timestamp: "5 min ago",
    },
    {
      id: 2,
      user: "Bob",
      message: "For movies, I suggest the new Marvel film at IMAX",
      timestamp: "10 min ago",
    },
    {
      id: 3,
      user: "Carol",
      message: "Central park is perfect for Saturday's picnic",
      timestamp: "15 min ago",
    },
  ])

  const handleConnectWallet = () => {
    setIsWalletConnected(!isWalletConnected)
  }

  const handleSendRecommendation = () => {
    if (recommendation.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: "You",
        message: recommendation,
        timestamp: "now",
      }
      setMessages([newMessage, ...messages])
      setRecommendation("")

      // Increment recommendations and show animation
      setRecommendationsSent((prev) => prev + 1)
      setShowRecommendationStar(true)

      // Random chance to earn a reward
      if (Math.random() > 0.6) {
        setTimeout(() => {
          setRewardsEarned((prev) => prev + 1)
          setShowRewardStar(true)
        }, 500)
      }
    }
  }

  const themeClasses = {
    background: isDarkMode ? "bg-gray-900" : "bg-[#F8FAFC]",
    cardBg: isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-[#60A5FA]/20",
    text: isDarkMode ? "text-gray-100" : "text-[#111827]",
    textSecondary: isDarkMode ? "text-gray-300" : "text-[#111827] opacity-70",
    textMuted: isDarkMode ? "text-gray-400" : "text-gray-500",
  }

  return (
    <div className={`min-h-screen ${themeClasses.background} p-4 transition-all duration-500 ease-in-out`}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-start">
          <div className="text-center flex-1 space-y-2 py-8">
            <h1
              className={`text-4xl font-bold ${themeClasses.text} flex items-center justify-center gap-2 animate-fade-in`}
            >
              <Users className="h-8 w-8 text-[#2563EB] animate-pulse" />
              RecombEE
            </h1>
            <p className={`text-xl ${themeClasses.textSecondary} animate-slide-up`}>Your group recommendation agent</p>
          </div>

          <div className="flex items-center gap-2 mt-8">
            <Sun className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-[#FACC15]"} transition-colors`} />
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              className="data-[state=checked]:bg-[#2563EB]"
            />
            <Moon className={`h-4 w-4 ${isDarkMode ? "text-[#60A5FA]" : "text-gray-400"} transition-colors`} />
          </div>
        </div>

        {/* Rewards Section */}
        <div className="grid grid-cols-2 gap-4 animate-slide-up">
          <Card
            className={`${themeClasses.cardBg} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between relative">
                <div className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-[#2563EB]" />
                  <span className={`text-sm ${themeClasses.text}`}>Recommendations</span>
                </div>
                <div className="relative">
                  <span className={`text-2xl font-bold ${themeClasses.text}`}>{recommendationsSent}</span>
                  <AnimatedStar show={showRecommendationStar} onComplete={() => setShowRecommendationStar(false)} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`${themeClasses.cardBg} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between relative">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-[#FACC15]" />
                  <span className={`text-sm ${themeClasses.text}`}>Rewards</span>
                </div>
                <div className="relative">
                  <span className={`text-2xl font-bold ${themeClasses.text}`}>{rewardsEarned}</span>
                  <AnimatedStar show={showRewardStar} onComplete={() => setShowRewardStar(false)} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Wallet Connection */}
        <div className="flex justify-center animate-fade-in">
          <Button
            onClick={handleConnectWallet}
            size="lg"
            className={`flex items-center gap-2 transition-all duration-300 hover:scale-105 ${
              isWalletConnected
                ? "bg-[#60A5FA] hover:bg-[#60A5FA]/90 text-white border-[#60A5FA]"
                : "bg-[#2563EB] hover:bg-[#2563EB]/90 text-white hover:shadow-lg"
            }`}
          >
            <Wallet className="h-4 w-4" />
            {isWalletConnected ? "Wallet Connected" : "Connect Wallet"}
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Send Recommendation Section */}
          <Card
            className={`${themeClasses.cardBg} shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-left`}
          >
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${themeClasses.text}`}>
                <Send className="h-5 w-5 text-[#2563EB]" />
                Send Recommendation
              </CardTitle>
              <CardDescription className={themeClasses.textMuted}>
                Share your recommendation with the group
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recommendation" className={themeClasses.text}>
                  Your recommendation
                </Label>
                <Textarea
                  id="recommendation"
                  placeholder="Write your recommendation here..."
                  value={recommendation}
                  onChange={(e) => setRecommendation(e.target.value)}
                  className={`min-h-[100px] transition-all duration-200 focus:scale-[1.02] ${
                    isDarkMode ? "bg-gray-700 border-gray-600 text-gray-100" : ""
                  }`}
                />
              </div>
              <Button
                onClick={handleSendRecommendation}
                className="w-full bg-[#2563EB] hover:bg-[#2563EB]/90 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                disabled={!recommendation.trim() || !isWalletConnected}
              >
                <Send className="h-4 w-4 mr-2" />
                Send Recommendation
              </Button>
              {!isWalletConnected && (
                <p className={`text-sm ${themeClasses.textMuted} text-center animate-bounce`}>
                  Connect your wallet to send recommendations
                </p>
              )}
            </CardContent>
          </Card>

          {/* Messages Section */}
          <Card
            className={`${themeClasses.cardBg} shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-right`}
          >
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${themeClasses.text}`}>
                <MessageCircle className="h-5 w-5 text-[#2563EB]" />
                Group Messages
              </CardTitle>
              <CardDescription className={themeClasses.textMuted}>Latest shared recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`border-l-4 border-[#FACC15] pl-4 py-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-sm rounded-r-lg ${
                      isDarkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-50"
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="text-xs bg-[#60A5FA] text-white hover:bg-[#60A5FA]/90 transition-colors">
                        {message.user}
                      </Badge>
                      <span className={`text-xs ${themeClasses.textMuted}`}>{message.timestamp}</span>
                    </div>
                    <p className={`text-sm ${themeClasses.text} opacity-80`}>{message.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Bar */}
        <div className="text-center animate-fade-in">
          <Badge
            className={`text-sm transition-all duration-300 hover:scale-105 ${
              isWalletConnected
                ? "bg-[#FACC15] text-[#111827] hover:shadow-lg"
                : `${isDarkMode ? "bg-[#60A5FA] text-white" : "bg-[#60A5FA] text-white"} hover:shadow-lg`
            }`}
          >
            {isWalletConnected ? "✓ Connected and ready to recommend" : "Connect your wallet to get started"}
          </Badge>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-slide-left {
          animation: slide-left 0.8s ease-out;
        }
        
        .animate-slide-right {
          animation: slide-right 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}
