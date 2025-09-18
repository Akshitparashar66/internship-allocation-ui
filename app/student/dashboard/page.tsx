"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { GraduationCap, Upload, Search, Eye, LogOut, MapPin, Building, Star, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import AIChatWidget from "@/components/ai-chat-widget"

// Mock data for recommendations
const mockRecommendations = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechCorp Solutions",
    location: "Mumbai, Maharashtra",
    score: 92,
    department: "Engineering",
    skills: ["React", "JavaScript", "CSS"],
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "DataFlow Analytics",
    location: "Bangalore, Karnataka",
    score: 88,
    department: "Data Science",
    skills: ["Python", "Machine Learning", "SQL"],
  },
  {
    id: 3,
    title: "Mobile App Developer",
    company: "AppVenture Labs",
    location: "Pune, Maharashtra",
    score: 85,
    department: "Mobile Development",
    skills: ["React Native", "JavaScript", "Firebase"],
  },
]

export default function StudentDashboard() {
  const [profile, setProfile] = useState({
    cgpa: "",
    location: "",
    department: "",
    skills: [] as string[],
  })
  const [skillInput, setSkillInput] = useState("")
  const [hasRecommendations, setHasRecommendations] = useState(false)
  const [selectedAudit, setSelectedAudit] = useState<any>(null)
  const { toast } = useToast()

  const addSkill = () => {
    if (skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, skillInput.trim()],
      })
      setSkillInput("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((skill) => skill !== skillToRemove),
    })
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    })
  }

  const getRecommendations = () => {
    setHasRecommendations(true)
    toast({
      title: "Recommendations Generated",
      description: "AI has analyzed your profile and found matching internships.",
    })
  }

  const openAuditModal = (recommendation: any) => {
    // Mock audit data
    const auditData = {
      ...recommendation,
      breakdown: {
        skillsMatch: 85,
        locationMatch: 95,
        cgpaMatch: 90,
        departmentMatch: 100,
      },
      details: {
        matchedSkills: recommendation.skills.filter(
          (skill: string) => profile.skills.includes(skill) || ["React", "JavaScript"].includes(skill),
        ),
        missingSkills: recommendation.skills.filter(
          (skill: string) => !profile.skills.includes(skill) && !["React", "JavaScript"].includes(skill),
        ),
      },
    }
    setSelectedAudit(auditData)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">SmartIntern</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, Student</span>
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Upload Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Update Profile
                </CardTitle>
                <CardDescription>Keep your profile updated to get better recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cgpa">CGPA</Label>
                    <Input
                      id="cgpa"
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      placeholder="e.g., 8.5"
                      value={profile.cgpa}
                      onChange={(e) => setProfile({ ...profile, cgpa: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Mumbai, Maharashtra"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      placeholder="e.g., Computer Science"
                      value={profile.department}
                      onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills</Label>
                    <div className="flex gap-2">
                      <Input
                        id="skills"
                        placeholder="Add a skill"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                      />
                      <Button type="button" onClick={addSkill} variant="outline" size="sm">
                        Add
                      </Button>
                    </div>
                    {profile.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profile.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                            {skill}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full">
                    Update Profile
                  </Button>
                </form>

                <div className="mt-6">
                  <Button onClick={getRecommendations} className="w-full" variant="default">
                    <Search className="h-4 w-4 mr-2" />
                    Get Recommendations
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Internships</CardTitle>
                <CardDescription>
                  {hasRecommendations
                    ? "AI-powered recommendations based on your profile"
                    : "Update your profile and click 'Get Recommendations' to see matches"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {hasRecommendations ? (
                  <div className="space-y-4">
                    {mockRecommendations.map((recommendation) => (
                      <Card key={recommendation.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-2">{recommendation.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                <div className="flex items-center gap-1">
                                  <Building className="h-4 w-4" />
                                  {recommendation.company}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {recommendation.location}
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {recommendation.skills.map((skill) => (
                                  <Badge key={skill} variant="outline">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 mb-2">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span className="font-semibold text-lg">{recommendation.score}%</span>
                              </div>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => openAuditModal(recommendation)}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Audit
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Scoring Breakdown</DialogTitle>
                                    <DialogDescription>
                                      Detailed analysis of how this internship matches your profile
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedAudit && (
                                    <div className="space-y-6">
                                      <div>
                                        <h4 className="font-semibold mb-2">{selectedAudit.title}</h4>
                                        <p className="text-sm text-gray-600">{selectedAudit.company}</p>
                                      </div>

                                      <div className="space-y-4">
                                        <div>
                                          <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium">Skills Match</span>
                                            <span className="text-sm">{selectedAudit.breakdown.skillsMatch}%</span>
                                          </div>
                                          <Progress value={selectedAudit.breakdown.skillsMatch} />
                                        </div>

                                        <div>
                                          <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium">Location Match</span>
                                            <span className="text-sm">{selectedAudit.breakdown.locationMatch}%</span>
                                          </div>
                                          <Progress value={selectedAudit.breakdown.locationMatch} />
                                        </div>

                                        <div>
                                          <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium">CGPA Match</span>
                                            <span className="text-sm">{selectedAudit.breakdown.cgpaMatch}%</span>
                                          </div>
                                          <Progress value={selectedAudit.breakdown.cgpaMatch} />
                                        </div>

                                        <div>
                                          <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium">Department Match</span>
                                            <span className="text-sm">{selectedAudit.breakdown.departmentMatch}%</span>
                                          </div>
                                          <Progress value={selectedAudit.breakdown.departmentMatch} />
                                        </div>
                                      </div>

                                      <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                          <h5 className="font-medium text-green-700 mb-2">Matched Skills</h5>
                                          <div className="flex flex-wrap gap-2">
                                            {selectedAudit.details.matchedSkills.map((skill: string) => (
                                              <Badge
                                                key={skill}
                                                variant="default"
                                                className="bg-green-100 text-green-800"
                                              >
                                                {skill}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                        <div>
                                          <h5 className="font-medium text-orange-700 mb-2">Skills to Develop</h5>
                                          <div className="flex flex-wrap gap-2">
                                            {selectedAudit.details.missingSkills.map((skill: string) => (
                                              <Badge
                                                key={skill}
                                                variant="outline"
                                                className="border-orange-300 text-orange-700"
                                              >
                                                {skill}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Recommendations Yet</h3>
                    <p className="text-gray-600 mb-4">
                      Complete your profile and click "Get Recommendations" to see personalized internship matches.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <AIChatWidget />
    </div>
  )
}
