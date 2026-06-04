import Link from "next/link";
import {
  ArrowRight,
  Pencil,
  Folder,
  Search,
  Shield,
  Heart,
  FileText,
  Users,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0B1120] text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(236,72,153,0.15),transparent_25%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.15),transparent_25%)]" />

      {/* Navbar */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-pink-200 flex items-center justify-center">
            📝
          </div>

          <h1 className="font-bold text-2xl">My Notes</h1>
        </div>

        <div className="hidden md:flex gap-10 text-gray-300">
          <a href="#features">Features</a>
          <a href="#how">How it Works</a>
          <a href="#about">About</a>
        </div>

        <Link
          href="/notes"
          className="bg-pink-600 hover:bg-pink-500 transition px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
        >
          Get Started
          <ArrowRight size={18} />
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-2 text-sm text-pink-300">
              ✨ Organize. Write. Remember.
            </div>

            <h1 className="mt-8 text-6xl font-bold leading-tight">
              Your thoughts,
              <br />
              beautifully{" "}
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                organized.
              </span>
            </h1>

            <p className="mt-6 text-xl text-gray-400 max-w-xl">
              Capture ideas, organize your thoughts, and find what matters —
              instantly.
            </p>

            <div className="mt-10 flex gap-5">
              <Link
                href="/notes"
                className="bg-pink-600 hover:bg-pink-500 px-8 py-4 rounded-xl font-semibold flex items-center gap-2"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>

              <button className="text-lg text-gray-300 hover:text-white">
                Learn More →
              </button>
            </div>
          </div>

          {/* Right Hero Illustration */}
          <div className="relative">
            <div className="absolute inset-0 bg-pink-500/20 blur-[120px]" />

            <div className="relative bg-[#131C31] border border-pink-500/20 rounded-3xl p-8 shadow-2xl">
              <div className="space-y-4">
                <div className="bg-[#1A243D] rounded-xl p-4">
                  <h3 className="font-semibold text-pink-300">
                    Project Ideas
                  </h3>

                  <ul className="mt-3 text-gray-400 space-y-2">
                    <li>✓ Build Notes App</li>
                    <li>✓ Next.js Portfolio</li>
                    <li>✓ AI Assistant</li>
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1A243D] p-4 rounded-xl">
                    <div className="text-pink-400 text-sm">
                      Daily Journal
                    </div>

                    <div className="mt-2 text-gray-300">
                      Productive day 🚀
                    </div>
                  </div>

                  <div className="bg-[#1A243D] p-4 rounded-xl">
                    <div className="text-purple-400 text-sm">Learning</div>

                    <div className="mt-2 text-gray-300">
                      Next.js App Router
                    </div>
                  </div>
                </div>

                <div className="bg-[#1A243D] rounded-xl p-4">
                  <div className="flex items-center gap-2 text-green-400">
                    <Search size={18} />
                    Instant Search
                  </div>

                  <p className="text-gray-400 mt-2">
                    Find any note within seconds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="relative z-10 max-w-7xl mx-auto px-6 py-20"
      >
        <div className="grid md:grid-cols-4 gap-6">
          <FeatureCard
            icon={<Pencil />}
            title="Write Freely"
            text="Capture your ideas and notes without distractions."
          />

          <FeatureCard
            icon={<Folder />}
            title="Stay Organized"
            text="Keep notes neatly categorized."
          />

          <FeatureCard
            icon={<Search />}
            title="Find Instantly"
            text="Powerful search to find anything."
          />

          <FeatureCard
            icon={<Shield />}
            title="Private & Safe"
            text="Your notes belong only to you."
          />
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="border border-pink-500/10 rounded-3xl bg-[#111827]/70 backdrop-blur p-8">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="flex gap-4">
              <Heart className="text-pink-500" />
              <div>
                <h3 className="font-semibold">
                  Loved by productivity enthusiasts
                </h3>

                <p className="text-gray-400 text-sm">
                  Join thousands using My Notes.
                </p>
              </div>
            </div>

            <Stat icon={<FileText />} value="10K+" label="Notes Created" />
            <Stat icon={<Users />} value="5K+" label="Users" />
            <Stat icon={<Zap />} value="99.9%" label="Uptime" />

            <Link
              href="/notes"
              className="bg-pink-600 text-center py-4 rounded-xl font-semibold hover:bg-pink-500"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-[#131C31] border border-white/5 rounded-2xl p-6">
      <div className="text-pink-400 mb-4">{icon}</div>

      <h3 className="font-semibold text-lg">{title}</h3>

      <p className="text-gray-400 mt-2">{text}</p>
    </div>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex gap-3 items-center">
      <div className="text-purple-400">{icon}</div>

      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-gray-400 text-sm">{label}</div>
      </div>
    </div>
  );
}