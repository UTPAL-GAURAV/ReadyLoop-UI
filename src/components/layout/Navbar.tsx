import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sun, Moon, Copy, Check, CircleDot, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/components/layout/ThemeProvider'
import { HowToUseModal } from '@/components/home/HowToUseModal'
import { AboutModal } from '@/components/home/AboutModal'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function Navbar() {
  const { isAuthenticated, user, logout, copyToken, copied } = useAuth()
  const { theme, toggle } = useTheme()
  const [aboutOpen, setAboutOpen] = useState(false)
  const [howToOpen, setHowToOpen] = useState(false)
  const navigate = useNavigate()

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : '?'

  const displayName = user?.name
    ? user.name.length > 10 ? user.name.slice(0, 10) + '...' : user.name
    : ''

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-foreground/80 transition-colors">
            <CircleDot className="h-4 w-4 text-primary" />
            ReadyLoop
          </Link>

          {/* Right controls */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-xs h-8 px-3" onClick={() => setAboutOpen(true)}>
              About
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-xs h-8 px-3" onClick={() => setHowToOpen(true)}>
              How to use
            </Button>

            {isAuthenticated && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground text-xs h-8 px-3 gap-1.5"
                  onClick={copyToken}
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copied!' : 'Copy token'}
                </Button>

                <Button variant="ghost" size="sm" className="h-8 px-2 gap-1.5 text-xs text-muted-foreground hover:text-foreground" onClick={() => navigate('/profile')}>
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-[10px]">{initials}</AvatarFallback>
                  </Avatar>
                  {displayName}
                </Button>

                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={logout}>
                  <LogOut className="h-3.5 w-3.5" />
                </Button>
              </>
            )}

            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={toggle}>
              {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </Button>
          </div>
        </div>
      </header>

      <HowToUseModal open={howToOpen} onClose={() => setHowToOpen(false)} />
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  )
}
