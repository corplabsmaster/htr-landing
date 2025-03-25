import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tractor, Sun, Cloud, BarChart, Users, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function FarmAppLanding() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b sticky top-0 z-10 bg-white">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <div
                className="absolute inset-0 bg-blue-600 transform rotate-45"
                style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
              ></div>
              <div
                className="absolute inset-0 border-2 border-white rounded-full"
                style={{ width: "100%", height: "40%", top: "30%" }}
              ></div>
            </div>
            <span className="text-xl font-bold text-blue-600">FarmApp</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-blue-600 transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm font-medium hover:text-blue-600 transition-colors hidden md:block">
              Log In
            </Link>
            <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-lime-300 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <Image
                src="/placeholder.svg?height=500&width=800"
                width="550"
                height="310"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Smart Farming Solutions for Modern Agriculture
                  </h1>
                  <p className="max-w-[600px] text-gray-700 md:text-xl">
                    Give your team the toolkit to stop configuring and start innovating. Securely build, deploy, and
                    scale the best web experiences.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form className="flex gap-2">
                    <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Sign Up
                    </Button>
                  </form>
                  <p className="text-xs text-gray-500">
                    Sign up to get notified when we launch.{" "}
                    <Link href="/terms" className="underline underline-offset-2">
                      Terms &amp; Conditions
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-lime-300 px-3 py-1 text-sm text-blue-600">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Grow</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides comprehensive tools to manage every aspect of your farm operations.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-lime-300 p-3">
                  <Tractor className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">Equipment Management</h3>
                <p className="text-center text-gray-500">
                  Track maintenance, schedule usage, and optimize your equipment fleet.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-lime-300 p-3">
                  <Sun className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">Crop Monitoring</h3>
                <p className="text-center text-gray-500">
                  Monitor growth, track diseases, and optimize harvesting schedules.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-lime-300 p-3">
                  <Cloud className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">Weather Integration</h3>
                <p className="text-center text-gray-500">
                  Get real-time weather data and forecasts to plan your farming activities.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-lime-300 p-3">
                  <BarChart className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">Analytics Dashboard</h3>
                <p className="text-center text-gray-500">
                  Visualize farm data and gain insights to make informed decisions.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-lime-300 p-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">Team Collaboration</h3>
                <p className="text-center text-gray-500">
                  Coordinate tasks, share information, and improve team productivity.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-lime-300 p-3">
                  <div className="relative w-6 h-6">
                    <div
                      className="absolute inset-0 bg-blue-600 transform rotate-45"
                      style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
                    ></div>
                    <div
                      className="absolute inset-0 border-2 border-white rounded-full"
                      style={{ width: "100%", height: "40%", top: "30%" }}
                    ></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold">Sustainability Tracking</h3>
                <p className="text-center text-gray-500">Monitor environmental impact and optimize resource usage.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-12 md:py-24 lg:py-32 bg-lime-300">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-white px-3 py-1 text-sm text-blue-600">How It Works</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple. Powerful. Effective.</h2>
                <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get started in minutes and transform your farm management approach.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 font-bold text-2xl">
                  1
                </div>
                <h3 className="text-xl font-bold">Sign Up</h3>
                <p className="text-center text-gray-700">
                  Create your account and set up your farm profile with basic information.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 font-bold text-2xl">
                  2
                </div>
                <h3 className="text-xl font-bold">Configure</h3>
                <p className="text-center text-gray-700">
                  Add your fields, equipment, and team members to customize the platform.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 font-bold text-2xl">
                  3
                </div>
                <h3 className="text-xl font-bold">Grow</h3>
                <p className="text-center text-gray-700">
                  Use the insights and tools to optimize operations and increase productivity.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-lime-300 px-3 py-1 text-sm text-blue-600">Pricing</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Plans for Farms of All Sizes</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that fits your needs and scale as you grow.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Starter</h3>
                  <p className="text-gray-500">Perfect for small farms just getting started.</p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">$29</span>
                  <span className="ml-1 text-gray-500">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Up to 50 acres</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Basic analytics</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                    <span>3 team members</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Button className="mt-8 bg-blue-600 hover:bg-blue-700">Get Started</Button>
              </div>
              <div className="flex flex-col rounded-lg border border-blue-600 p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="inline-block rounded-full bg-lime-300 px-3 py-1 text-xs text-blue-600">Popular</div>
                  <h3 className="text-2xl font-bold">Professional</h3>
                  <p className="text-gray-500">Ideal for medium-sized farms with diverse operations.</p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">$79</span>
                  <span className="ml-1 text-gray-500">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Up to 200 acres</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                    <span>10 team members</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Equipment tracking</span>
                  </li>
                </ul>
                <Button className="mt-8 bg-blue-600 hover:bg-blue-700">Get Started</Button>
              </div>
              <div className="flex flex-col rounded-lg border p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <p className="text-gray-500">For large farms with complex operations.</p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">$199</span>
                  <span className="ml-1 text-gray-500">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Unlimited acres</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Custom analytics</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Unlimited team members</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                    <span>24/7 dedicated support</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Custom integrations</span>
                  </li>
                </ul>
                <Button className="mt-8 bg-blue-600 hover:bg-blue-700">Contact Sales</Button>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-12 md:py-24 lg:py-32 bg-lime-300">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-white px-3 py-1 text-sm text-blue-600">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trusted by Farmers Worldwide</h2>
                <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear what our customers have to say about how FarmApp has transformed their operations.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex items-center space-x-4">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="John Farmer"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-bold">John Farmer</h3>
                    <p className="text-sm text-gray-500">Wheat Farmer, Kansas</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-500">
                  "FarmApp has revolutionized how we manage our 500-acre wheat farm. The weather integration alone has
                  saved us thousands in potential crop losses."
                </p>
              </div>
              <div className="flex flex-col rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex items-center space-x-4">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Maria Rodriguez"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-bold">Maria Rodriguez</h3>
                    <p className="text-sm text-gray-500">Vineyard Owner, California</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-500">
                  "The analytics dashboard gives me insights I never had before. I can now make data-driven decisions
                  about our vineyard management practices."
                </p>
              </div>
              <div className="flex flex-col rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex items-center space-x-4">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Robert Johnson"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-bold">Robert Johnson</h3>
                    <p className="text-sm text-gray-500">Dairy Farmer, Wisconsin</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-500">
                  "Team collaboration features have improved communication across our dairy operation. Everyone knows
                  their tasks and we're more efficient than ever."
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Farm?
                </h2>
                <p className="max-w-[600px] text-blue-50 md:text-xl">
                  Join thousands of farmers who are already using FarmApp to optimize their operations and increase
                  profitability.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-end">
                <Button className="bg-white text-blue-600 hover:bg-lime-300">Start Free Trial</Button>
                <Button variant="outline" className="border-white text-white hover:bg-blue-700">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white">
        <div className="container flex flex-col gap-6 py-8 md:py-12 px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8">
                  <div
                    className="absolute inset-0 bg-blue-600 transform rotate-45"
                    style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
                  ></div>
                  <div
                    className="absolute inset-0 border-2 border-white rounded-full"
                    style={{ width: "100%", height: "40%", top: "30%" }}
                  ></div>
                </div>
                <span className="text-xl font-bold text-blue-600">FarmApp</span>
              </div>
              <p className="text-sm text-gray-500">
                Smart farming solutions for modern agriculture. Streamline operations and increase yields.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    Updates
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row justify-between items-center border-t pt-6">
            <p className="text-xs text-gray-500">© {new Date().getFullYear()} FarmApp. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

