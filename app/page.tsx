import Image from "next/image";
import { prisma } from "@/lib/db";
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
  BookOpen,
} from "lucide-react";

export const revalidate = 60;

export default async function LandingPage() {
  const totalNotes = await prisma.note.count();

  const categories = await prisma.note.groupBy({
    by: ["category"],
  });
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B1120] text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute left-20 top-20 h-96 w-96 rounded-full bg-pink-500/10 blur-[140px]" />
        <div className="absolute right-20 top-40 h-96 w-96 rounded-full bg-purple-500/10 blur-[140px]" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-pink-500/10 blur-[140px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7C1BB] text-[#353A47]">
            <BookOpen size={28} />
          </div>

          <h1 className="text-2xl font-bold">My Notes</h1>
        </Link>

        <div className="hidden items-center gap-10 text-gray-300 md:flex">
          <a href="#features" className="hover:text-white">
            Features
          </a>

          <a href="#stats" className="hover:text-white">
            Stats
          </a>

          <a href="#about" className="hover:text-white">
            About
          </a>
        </div>

        <Link
          href="/notes"
          className="flex items-center gap-2 rounded-xl bg-[#DC136C] px-6 py-3 font-semibold text-white transition hover:bg-[#c01160]"
        >
          Get Started
          <ArrowRight size={18} />
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Left */}
          <div>
            <div className="inline-flex items-center rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-2 text-sm text-pink-300">
              ✨ Organize. Write. Remember.
            </div>

            <h1 className="mt-8 text-5xl font-bold leading-tight md:text-7xl">
              Your thoughts,
              <br />
              beautifully{" "}
              <span className="bg-gradient-to-r from-pink-500 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                organized.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-gray-400 md:text-xl">
              Capture ideas, organize your thoughts, and find what matters —
              instantly.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <Link
                href="/notes"
                className="flex items-center gap-2 rounded-xl bg-[#DC136C] px-8 py-4 font-semibold transition hover:bg-[#c01160]"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>

              <button className="rounded-xl border border-white/10 px-8 py-4 text-gray-300 transition hover:border-white/20 hover:text-white">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-pink-500/20 blur-[120px]" />

            <Image
              src="/hero-notes.png"
              alt="Notes App"
              width={900}
              height={700}
              priority
              className="relative z-10 w-full max-w-2xl rounded-3xl object-contain drop-shadow-[0_0_60px_rgba(220,19,108,0.35)] transition duration-500 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="relative z-10 mx-auto max-w-7xl px-6 py-16"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<Pencil size={28} />}
            title="Write Freely"
            text="Capture your ideas and notes without distractions."
          />

          <FeatureCard
            icon={<Folder size={28} />}
            title="Stay Organized"
            text="Use categories and tags to keep everything in place."
          />

          <FeatureCard
            icon={<Search size={28} />}
            title="Find Instantly"
            text="Powerful search helps you locate notes in seconds."
          />

          <FeatureCard
            icon={<Shield size={28} />}
            title="Private & Safe"
            text="Your notes remain secure and accessible only to you."
          />
        </div>
      </section>

      {/* Stats */}
      <section
        id="stats"
        className="relative z-10 mx-auto max-w-7xl px-6 pb-20"
      >
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
          <div className="grid gap-8 md:grid-cols-5">
            <div className="flex gap-4">
              <Heart className="text-pink-500" />

              <div>
                <h3 className="font-semibold">
                  Loved by productivity enthusiasts
                </h3>

                <p className="text-sm text-gray-400">
                  Join thousands using My Notes.
                </p>
              </div>
            </div>

            <Stat
              icon={<FileText size={22} />}
              value={totalNotes.toString()}
              label="Notes Created"
            />

            <Stat
              icon={<Folder size={22} />}
              value={categories.length.toString()}
              label="Categories"
            />

            <Stat
              icon={<Zap size={22} />}
              value="99.9%"
              label="Uptime"
            />

            <Link
              href="/notes"
              className="rounded-xl bg-[#DC136C] py-4 text-center font-semibold transition hover:bg-[#c01160]"
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
    <div className="rounded-2xl border border-white/5 bg-[#131C31] p-6 transition hover:border-pink-500/20 hover:bg-[#17213a]">
      <div className="mb-4 text-pink-400">{icon}</div>

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-gray-400">{text}</p>
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
    <div className="flex items-center gap-3">
      <div className="text-purple-400">{icon}</div>

      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-gray-400">{label}</div>
      </div>
    </div>
  );
}