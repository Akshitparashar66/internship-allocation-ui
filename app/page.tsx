import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Building2, Users, Target } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">SmartIntern</h1>
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

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 text-balance">Smart Internship Allocation Engine</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-pretty">
            Connect talented students with the perfect internship opportunities using AI-powered matching. Our
            intelligent system ensures the best fit for both students and companies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">Explore Demo</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>AI-Powered Matching</CardTitle>
              <CardDescription>
                Advanced algorithms match students with internships based on skills, location, and preferences
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>For Students</CardTitle>
              <CardDescription>
                Upload your profile, get personalized recommendations, and track your application progress
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>For Companies</CardTitle>
              <CardDescription>
                Post internships, find qualified candidates, and streamline your recruitment process
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-12 shadow-lg">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to find your perfect match?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students and companies who have found success through our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register?role=student">Join as Student</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/register?role=company">Join as Company</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2024 SmartIntern. Built for SIH25033 - Smart Internship Allocation Engine.</p>
        </div>
      </footer>
    </div>
  )
}
