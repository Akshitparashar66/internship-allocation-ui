"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState("student")
  const [skills, setSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState("")
  const { toast } = useToast()

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()])
      setSkillInput("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Registration Successful!",
      description: "Your account has been created. Please check your email to verify your account.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-gray-900 mb-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            SmartIntern
          </Link>
          <p className="text-gray-600">Create your account to get started</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Choose your account type and fill in your details</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="company">Company</TabsTrigger>
              </TabsList>

              <TabsContent value="student" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-name">Full Name</Label>
                      <Input id="student-name" placeholder="Enter your full name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-email">Email</Label>
                      <Input id="student-email" type="email" placeholder="Enter your email" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-password">Password</Label>
                      <Input id="student-password" type="password" placeholder="Create a password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cgpa">CGPA</Label>
                      <Input id="cgpa" type="number" step="0.01" min="0" max="10" placeholder="e.g., 8.5" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="e.g., Mumbai, Maharashtra" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" placeholder="e.g., Computer Science" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills</Label>
                    <div className="flex gap-2">
                      <Input
                        id="skills"
                        placeholder="Add a skill and press Enter"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                      />
                      <Button type="button" onClick={addSkill} variant="outline">
                        Add
                      </Button>
                    </div>
                    {skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                            {skill}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full">
                    Create Student Account
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="company" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Contact Name</Label>
                      <Input id="company-name" placeholder="Enter contact person name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-email">Email</Label>
                      <Input id="company-email" type="email" placeholder="Enter company email" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-password">Password</Label>
                      <Input id="company-password" type="password" placeholder="Create a password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization</Label>
                      <Input id="organization" placeholder="Enter company name" required />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Create Company Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
