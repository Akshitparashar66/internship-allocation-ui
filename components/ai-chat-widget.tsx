"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, X, Bot, User, Minimize2, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  text: string
  sender: "user" | "assistant"
  timestamp: Date
}

const mockResponses = [
  "I can help you find the perfect internship match! What skills are you looking to develop?",
  "Based on your profile, I recommend focusing on React and JavaScript skills for frontend roles.",
  "Companies in Mumbai are actively looking for students with your background. Would you like me to show you some opportunities?",
  "Your CGPA is competitive! I suggest highlighting your project experience in your applications.",
  "For data science roles, consider adding Python and SQL to your skill set.",
  "I can help you prepare for technical interviews. What specific areas would you like to focus on?",
]

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your AI assistant. I can help you with internship recommendations, profile optimization, and career guidance. How can I assist you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  const sendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(
      () => {
        const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]
        const assistantMessage: Message = {
          id: messages.length + 2,
          text: randomResponse,
          sender: "assistant",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 2000,
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-shadow bg-blue-600 hover:bg-blue-700"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={cn("w-80 shadow-2xl transition-all duration-300", isMinimized ? "h-14" : "h-96")}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-blue-600" />
              </div>
              AI Assistant
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => setIsMinimized(!isMinimized)} className="h-8 w-8 p-0">
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages Area */}
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn("flex gap-2", message.sender === "user" ? "justify-end" : "justify-start")}
                  >
                    {message.sender === "assistant" && (
                      <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="h-3 w-3 text-blue-600" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                        message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900",
                      )}
                    >
                      {message.text}
                    </div>
                    {message.sender === "user" && (
                      <div className="h-6 w-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="h-3 w-3 text-gray-600" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-2 justify-start">
                    <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="h-3 w-3 text-blue-600" />
                    </div>
                    <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" />
                        <div
                          className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={!inputValue.trim() || isTyping} size="sm" className="px-3">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
