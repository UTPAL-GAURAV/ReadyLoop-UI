import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const steps = [
  {
    number: '1',
    title: 'CLONE THE REPO',
    content: null,
    code: 'git clone https://github.com/UTPAL-GAURAV/readyloop.git',
  },
  {
    number: '2',
    title: 'GET YOUR TOKEN',
    content: 'Copy token from the header button present in this UI.',
    code: null,
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
    content: 'Open Claude Code CLI or VS Code extension or desktop app and say (cli path must be readyloop):',
    code: 'Paste a JD and say: "Prepare me for this role"',
  },
]

export function HowToUseModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Setup & How to Use</DialogTitle>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  )
}
