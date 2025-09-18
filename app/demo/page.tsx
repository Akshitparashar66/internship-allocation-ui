"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, Building2, Users, Target, Star, MapPin, ArrowLeft } from "lucide-react"

// Mock demo data
const demoStudentProfile = {
  name: "Alex Kumar",
  cgpa: 8.5,
  location: "Mumbai, Maharashtra",
  department: "Computer Science",
  skills: ["React", "JavaScript", "Python", "Node.js", "MongoDB"],
}

const demoRecommendations = [
  {
    id: 1,
    title: "Full Stack Developer Intern",
    company: "TechVenture Solutions",
    location: "Mumbai, Maharashtra",
    score: 95,
    skills: ["React", "Node.js", "MongoDB"],
    description: "Work on cutting-edge web applications with our development team.",
  },
  {
    id: 2,
    title: "Frontend Developer Intern",
    company: "Digital Innovations",
    location: "Pune, Maharashtra",
    score: 88,
    skills: ["React", "JavaScript", "CSS"],
    description: "Create beautiful user interfaces for our client projects.",
  },
  {
    id: 3,
    title: "Python Developer Intern",
    company: "DataFlow Analytics",
    location: "Bangalore, Karnataka",
    score: 82,
    skills: ["Python", "Django", "PostgreSQL"],
    description: "Build data processing pipelines and web applications.",
  },
]

const demoCompanyData = {
  name: "TechVenture Solutions",
  activeInternships: 5,
  totalApplicants: 47,
  recentPostings: [
    {
      title: "Full Stack Developer Intern",
      applicants: 15,
      status: "Active",
      skills: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "UI/UX Designer Intern",
      applicants: 12,
      status: "Active",
      skills: ["Figma", "Adobe XD", "Prototyping"],
    },
    {
      title: "Data Science Intern",
      applicants: 20,
      status: "Active",
      skills: ["Python", "Machine Learning", "SQL"],
    },
  ],
}

export default function DemoPage() {
  const [activeView, setActiveView] = useState("student")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">SmartIntern Demo</h1>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Experience SmartIntern</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore how our AI-powered platform works for both students and companies. See real examples of intelligent
            matching and streamlined internship management.
          </p>
        </div>

        <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="student" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Student View
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Company View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="student" className="space-y-8">
            {/* Student Profile Demo */}
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Student Profile
                </CardTitle>
                <CardDescription>See how student profiles are analyzed for intelligent matching</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">{demoStudentProfile.name}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">CGPA:</span>
                        <span className="font-medium">{demoStudentProfile.cgpa}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium">{demoStudentProfile.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Department:</span>
                        <span className="font-medium">{demoStudentProfile.department}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {demoStudentProfile.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations Demo */}
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  AI-Powered Recommendations
                </CardTitle>
                <CardDescription>Personalized internship matches based on profile analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {demoRecommendations.map((rec) => (
                    <Card key={rec.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{rec.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center gap-1">
                                <Building2 className="h-4 w-4" />
                                {rec.company}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {rec.location}
                              </div>
                            </div>
                            <p className="text-gray-600 mb-3">{rec.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {rec.skills.map((skill) => (
                                <Badge
                                  key={skill}
                                  variant={demoStudentProfile.skills.includes(skill) ? "default" : "outline"}
                                  className={
                                    demoStudentProfile.skills.includes(skill) ? "bg-green-100 text-green-800" : ""
                                  }
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-2">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="font-semibold text-lg">{rec.score}%</span>
                            </div>
                            <Badge variant="outline">Match Score</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="company" className="space-y-8">
            {/* Company Dashboard Demo */}
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Dashboard
                </CardTitle>
                <CardDescription>Comprehensive overview of internship postings and applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Building2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{demoCompanyData.activeInternships}</p>
                    <p className="text-sm text-gray-600">Active Internships</p>
                  </div>
                  <div className="text-center">
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-green-600">{demoCompanyData.totalApplicants}</p>
                    <p className="text-sm text-gray-600">Total Applicants</p>
                  </div>
                  <div className="text-center">
                    <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Target className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold text-purple-600">
                      {Math.round(demoCompanyData.totalApplicants / demoCompanyData.activeInternships)}
                    </p>
                    <p className="text-sm text-gray-600">Avg. Applications</p>
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-4">Recent Postings</h3>
                <div className="space-y-3">
                  {demoCompanyData.recentPostings.map((posting, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{posting.title}</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {posting.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{posting.applicants} applicants</p>
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          {posting.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to get started?</h3>
              <p className="text-gray-600 mb-6">
                Join thousands of students and companies who have found success through our AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/register?role=student">Join as Student</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/register?role=company">Join as Company</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
