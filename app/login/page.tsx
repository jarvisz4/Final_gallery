import { Navigation } from "@/components/navigation"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen page-enter page-enter-active">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="cursive text-4xl md:text-5xl font-bold text-pink-600 mb-4">Welcome Back</h1>
            <p className="text-lg text-pink-700 leading-relaxed">
              Enter your credentials to access our private collection of memories
            </p>
          </div>

          {/* Login Form */}
          <div className="glass-card p-8">
            <LoginForm />
          </div>

          {/* Upload Placeholder Info */}
          <div className="glass-card p-6 mt-6">
            <div className="text-center">
              <h3 className="cursive text-xl font-bold text-pink-600 mb-3">Coming Soon</h3>
              <p className="text-pink-700 text-sm mb-4">
                Once logged in, you'll be able to upload new memories, add captions, and organize our collection.
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-xs text-pink-600">
                <span className="glass px-3 py-1 rounded-full">📸 Upload Photos</span>
                <span className="glass px-3 py-1 rounded-full">✏️ Add Captions</span>
                <span className="glass px-3 py-1 rounded-full">📍 Set Locations</span>
                <span className="glass px-3 py-1 rounded-full">📅 Date Picker</span>
              </div>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="glass-card p-4 mt-4">
            <div className="text-center">
              <p className="text-pink-600 text-sm mb-2 font-medium">Demo Credentials</p>
              <div className="text-xs text-pink-500 space-y-1">
                <p>Email: love@ourgallery.com</p>
                <p>Password: forever</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
