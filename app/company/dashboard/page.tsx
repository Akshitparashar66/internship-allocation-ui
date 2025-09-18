"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Building2, Plus, MoreHorizontal, Edit, Trash2, LogOut, MapPin, Users, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import AIChatWidget from "@/components/ai-chat-widget"

// Mock data for posted internships
const mockInternships = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    description: "Work on React-based web applications with our development team.",
    requiredSkills: ["React", "JavaScript", "CSS", "HTML"],
    location: "Mumbai, Maharashtra",
    department: "Engineering",
    postedDate: "2024-01-15",
    applicants: 12,
    status: "Active",
  },
  {
    id: 2,
    title: "Data Science Intern",
    description: "Analyze large datasets and build machine learning models.",
    requiredSkills: ["Python", "Machine Learning", "SQL", "Pandas"],
    location: "Bangalore, Karnataka",
    department: "Data Science",
    postedDate: "2024-01-10",
    applicants: 8,
    status: "Active",
  },
  {
    id: 3,
    title: "Marketing Intern",
    description: "Support digital marketing campaigns and content creation.",
    requiredSkills: ["Digital Marketing", "Content Writing", "Social Media"],
    location: "Delhi, NCR",
    department: "Marketing",
    postedDate: "2024-01-05",
    applicants: 15,
    status: "Closed",
  },
]

export default function CompanyDashboard() {
  const [internships, setInternships] = useState(mockInternships)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    department: "",
    requiredSkills: [] as string[],
  })
  const [skillInput, setSkillInput] = useState("")
  const { toast } = useToast()

  const addSkill = () => {
    if (skillInput.trim() && !formData.requiredSkills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        requiredSkills: [...formData.requiredSkills, skillInput.trim()],
      })
      setSkillInput("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      requiredSkills: formData.requiredSkills.filter((skill) => skill !== skillToRemove),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newInternship = {
      id: internships.length + 1,
      ...formData,
      postedDate: new Date().toISOString().split("T")[0],
      applicants: 0,
      status: "Active",
    }
    setInternships([newInternship, ...internships])
    setFormData({
      title: "",
      description: "",
      location: "",
      department: "",
      requiredSkills: [],
    })
    setShowForm(false)
    toast({
      title: "Internship Posted",
      description: "Your internship has been successfully posted and is now live.",
    })
  }

  const deleteInternship = (id: number) => {
    setInternships(internships.filter((internship) => internship.id !== id))
    toast({
      title: "Internship Deleted",
      description: "The internship posting has been removed.",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">SmartIntern</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, Company</span>
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
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Internships</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {internships.filter((i) => i.status === "Active").length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Applicants</p>
                  <p className="text-3xl font-bold text-green-600">
                    {internships.reduce((sum, i) => sum + i.applicants, 0)}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Applications</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {internships.length > 0
                      ? Math.round(internships.reduce((sum, i) => sum + i.applicants, 0) / internships.length)
                      : 0}
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Internship Posting Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Post Internship
                  </span>
                  {showForm && (
                    <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  )}
                </CardTitle>
                <CardDescription>
                  {showForm ? "Fill in the details to post a new internship" : "Create new internship opportunities"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!showForm ? (
                  <Button onClick={() => setShowForm(true)} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Internship
                  </Button>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Frontend Developer Intern"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the internship role and responsibilities..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="e.g., Mumbai, Maharashtra"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        placeholder="e.g., Engineering"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skills">Required Skills</Label>
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
                      {formData.requiredSkills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.requiredSkills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                              {skill}
                              <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <Button type="submit" className="w-full">
                      Post Internship
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Posted Internships Table */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Posted Internships</CardTitle>
                <CardDescription>Manage your internship postings and track applications</CardDescription>
              </CardHeader>
              <CardContent>
                {internships.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Applicants</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {internships.map((internship) => (
                          <TableRow key={internship.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{internship.title}</p>
                                <p className="text-sm text-gray-600 truncate max-w-[200px]">{internship.description}</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {internship.requiredSkills.slice(0, 2).map((skill) => (
                                    <Badge key={skill} variant="outline" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                  {internship.requiredSkills.length > 2 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{internship.requiredSkills.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-gray-400" />
                                <span className="text-sm">{internship.location}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">{internship.department}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3 text-gray-400" />
                                <span className="font-medium">{internship.applicants}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={internship.status === "Active" ? "default" : "secondary"}
                                className={
                                  internship.status === "Active"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }
                              >
                                {internship.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => deleteInternship(internship.id)}
                                    className="text-red-600"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Internships Posted</h3>
                    <p className="text-gray-600 mb-4">Start by creating your first internship posting.</p>
                    <Button onClick={() => setShowForm(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Post Your First Internship
                    </Button>
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
