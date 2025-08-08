import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Welcome to Greedy Game
          </h1>
          <p className="text-lg text-muted-foreground">
            Your Next.js project with shadcn/ui, TypeScript, and Tailwind CSS is ready!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">
            Get Started
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
          <Button variant="secondary" size="lg">
            Documentation
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="font-semibold mb-2">Next.js</h3>
            <p className="text-sm text-muted-foreground">
              React framework for production
            </p>
          </div>
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="font-semibold mb-2">shadcn/ui</h3>
            <p className="text-sm text-muted-foreground">
              Beautiful and accessible components
            </p>
          </div>
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="font-semibold mb-2">Tailwind CSS</h3>
            <p className="text-sm text-muted-foreground">
              Utility-first CSS framework
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
