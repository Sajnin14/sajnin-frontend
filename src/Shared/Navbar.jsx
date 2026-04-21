import Container from '@/components/Common/Container'
import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { MoveUpRight } from 'lucide-react'
import { GENERAL_INFO, SOCIAL_LINKS } from '@/components/Lib/Data'

const COLORS = [
  'bg-yellow-500 text-black',
  'bg-blue-500 text-white',
  'bg-teal-500 text-black',
  'bg-indigo-500 text-white',
]

const MENU_LINKS = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'About',
    url: '/#about',
  },
  {
    name: 'Skills',
    url: '/#skills',
  },
  {
    name: 'Experience',
    url: '/#my-experience',
  },
  {
    name: 'Projects',
    url: '/#selected-projects',
  },
  {
    name: 'Contact',
    url: '/#contact',
  },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleScroll = (e, url) => {
    e.preventDefault()
    setIsMenuOpen(false)

    if (url.startsWith('/#')) {
      const id = url.substring(2)
      if (location.pathname === '/') {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        navigate(url)
      }
    } else {
      navigate(url)
      if (url === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  return (
    <nav className='w-full py-8 bg-primary sticky top-0 z-100'>
      <Container>
        <div className='text-border flex items-center justify-between relative'>
          {/* Logo on the left */}
          <h2 className='text-2xl font-semibold italic relative z-110'>
            <Link to='/' onClick={() => setIsMenuOpen(false)}>
              Sajnin
            </Link>
          </h2>

          {/* Menu option (Hamburger) on the right */}
          <button
            className={cn(
              'group size-12 relative z-110 flex items-center justify-center',
            )}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span
              className={cn(
                'inline-block w-3/5 h-0.5 bg-white rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 duration-300 -translate-y-1.25 ',
                {
                  'rotate-45 -translate-y-1/2': isMenuOpen,
                  'md:group-hover:rotate-12': !isMenuOpen,
                },
              )}
            ></span>
            <span
              className={cn(
                'inline-block w-3/5 h-0.5 bg-white rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 duration-300 translate-y-1.25 ',
                {
                  '-rotate-45 -translate-y-1/2': isMenuOpen,
                  'md:group-hover:-rotate-12': !isMenuOpen,
                },
              )}
            ></span>
          </button>
        </div>
      </Container>

      {/* Overlay */}
      <div
        className={cn(
          'overlay fixed inset-0 z-90 bg-black/70 transition-all duration-150',
          {
            'opacity-0 invisible pointer-events-none': !isMenuOpen,
          },
        )}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Side Menu Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 h-dvh w-125 max-w-[calc(100vw-3rem)] transform translate-x-full transition-transform duration-700 z-100 overflow-hidden gap-y-14',
          'flex flex-col lg:justify-center py-10',
          { 'translate-x-0': isMenuOpen },
        )}
      >
        <div
          className={cn(
            'fixed inset-0 scale-150 translate-x-1/2 rounded-[50%] bg-primary duration-700 delay-150 z-[-1]',
            {
              'translate-x-0': isMenuOpen,
            },
          )}
        ></div>

        <div className="grow flex md:items-center w-full max-w-75 mx-8 sm:mx-auto">
          <div className="flex gap-10 lg:justify-between max-lg:flex-col w-full">
            <div className="max-lg:order-2">
              <p className="text-white/60 mb-5 md:mb-8 text-sm tracking-widest uppercase">
                SOCIAL
              </p>
              <ul className="space-y-3">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-lg capitalize hover:underline text-white/80 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="">
              <p className="text-white/60 mb-5 md:mb-8 text-sm tracking-widest uppercase">
                MENU
              </p>
              <ul className="space-y-3">
                {MENU_LINKS.map((link, idx) => (
                  <li key={link.name}>
                    <button
                      onClick={(e) => handleScroll(e, link.url)}
                      className="group text-xl flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                    >
                      <span
                        className={cn(
                          'size-3.5 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-[200%] transition-all',
                          COLORS[idx % COLORS.length],
                        )}
                      >
                        <MoveUpRight
                          size={8}
                          className="scale-0 group-hover:scale-100 transition-all"
                        />
                      </span>
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full max-w-75 mx-8 sm:mx-auto">
          <p className="text-white/60 mb-4 text-sm tracking-widest uppercase">GET IN TOUCH</p>
          <a href={`mailto:${GENERAL_INFO.email}`} className="text-white hover:underline">
            {GENERAL_INFO.email}
          </a>
        </div>
      </div>
    </nav>
  )
}
