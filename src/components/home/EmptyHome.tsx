import { BrainCircuit, Globe, MessageSquareMore, History, FileSearch, Coins, Terminal } from 'lucide-react'

const steps = [
  {
    number: '1',
    title: 'CLONE THE REPO',
    code: 'git clone https://github.com/UTPAL-GAURAV/readyloop.git',
  },
  {
    number: '2',
    title: 'GET YOUR TOKEN',
    content: 'Copy token from the Copy token button in the header of this page.',
  },
  {
    number: '3',
    title: 'ADD TOKEN TO .ENV',
    content: 'Open the cloned repo in VS Code and paste the token in .env file.',
    code: 'GOOGLE_AUTH_TOKEN=<paste token here>',
  },
  {
    number: '4',
    title: 'START A SESSION',
    content: 'Open Claude Code CLI, VS Code extension, or desktop app (path must be the readyloop repo):',
    code: 'Paste a JD and say: "Prepare me for this role"',
  },
]

const features = [
  { icon: BrainCircuit, title: 'JD-AWARE INTERVIEW PLAN', desc: 'Claude reads your JD, identifies the company, role and level, and builds a full structured interview plan with the right rounds.' },
  { icon: Globe, title: 'COMPANY & GEOGRAPHY CALIBRATED', desc: 'Questions are calibrated to company type and region. A FAANG US role gets different depth than a European enterprise role.' },
  { icon: MessageSquareMore, title: 'ADAPTIVE FOLLOW-UP QUESTIONING', desc: 'Claude grills you on weak spots within each topic — probing deeper without derailing into unrelated questions.' },
  { icon: History, title: 'FULL ATTEMPT HISTORY', desc: 'Every session is saved. Replay any round or generate a fresh non-overlapping question set with the Replicate button.' },
  { icon: FileSearch, title: 'SELF-ASSESSMENT BREAKDOWN', desc: 'After every round, see your answer, strong points, what you missed, and what the interviewer wanted to hear — per question.' },
  { icon: Coins, title: 'ZERO COST', desc: 'Uses your own Claude token (corporate or personal). No subscription. No paywall. Runs entirely on free tiers.' },
]

export function EmptyHome() {
  return (
    <div className="mx-auto max-w-3xl py-10 space-y-12">
      {/* Setup steps */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Terminal className="h-5 w-5 text-primary" />
          <h2 className="text-base font-semibold text-foreground">Setup & How to Use</h2>
        </div>
        <div className="space-y-5">
          {steps.map(step => (
            <div key={step.number} className="space-y-2">
              <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                {step.number}. {step.title}
              </p>
              {step.content && <p className="text-sm text-foreground">{step.content}</p>}
              {step.code && (
                <div className="rounded-md bg-muted px-4 py-3 font-mono text-sm text-foreground">
                  {step.code}
                </div>
              )}
            </div>
          ))}
          <p className="text-xs text-muted-foreground pt-2 border-t border-border">
            Claude reads CLAUDE.md automatically — no extra setup needed. Refresh this dashboard to see progress update live.
          </p>
        </div>
      </div>

      {/* Features */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <BrainCircuit className="h-5 w-5 text-primary" />
          <h2 className="text-base font-semibold text-foreground">What is ReadyLoop?</h2>
        </div>
        <p className="text-sm text-foreground leading-relaxed mb-5">
          Most candidates bounce between YouTube videos, mock sites, and random question banks — spending more time searching than actually preparing.{' '}
          <strong>ReadyLoop is the single place where everything lives:</strong> your interview plans, your answers, your weak spots, your progress — all tied to <em>you</em> and the specific role you're targeting.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-lg border border-border bg-muted/40 p-4 space-y-1.5">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary shrink-0" />
                <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">{title}</p>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
