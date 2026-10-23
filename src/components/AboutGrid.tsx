import type { CSSProperties } from 'react'
import { ArrowUpRight, MapPin } from '@/components/slab'
import { profile } from '@/data/profile'

const C = { src: '/icons/ai/c.png', name: 'C' }
const CSHARP = { src: '/icons/ai/csharp.png', name: 'CSHARP' }
const JAVA = { src: '/icons/ai/java.png', name: 'JAVA' }
const PHP = { src: '/icons/ai/php.png', name: 'PHP' }
const PYTHON = { src: '/icons/ai/python.png', name: 'PYTHON' }

const HTML = { src: '/icons/ai/html.png', name: 'HTML' }
const CSS = { src: '/icons/ai/css.png', name: 'CSS' }
const BOOTSTRAP = { src: '/icons/ai/bootstrap.png', name: 'BOOTSTRAP' }
const JAVASCRIPT = { src: '/icons/ai/javascript.png', name: 'JAVASCRIPT' }
const REACT = { src: '/icons/ai/react.png', name: 'REACT' }

const LARAVEL = { src: '/icons/ai/laravel.png', name: 'LARAVEL' }
const MYSQL = { src: '/icons/ai/mysql.png', name: 'MYSQL' }
const NGINX = { src: '/icons/ai/nginx.png', name: 'NGINX' }
const APACHE = { src: '/icons/ai/apache.png', name: 'APACHE' }
const SUPABASE = { src: '/icons/ai/supabase.png', name: 'SUPABASE' }

type Capability = {
  index: string
  title: string
  marks: { src: string; name: string }[]
}

const CAPABILITIES: Capability[] = [
  {
    index: '01',
    title: 'Programming Languages',
    marks: [C, CSHARP, JAVA, PHP, PYTHON],
  },
  {
    index: '02',
    title: 'Front End Development',
    marks: [HTML, CSS, BOOTSTRAP, JAVASCRIPT, REACT],
  },
  {
    index: '03',
    title: 'Back End and Database',
    marks: [LARAVEL, MYSQL, NGINX, APACHE, SUPABASE],
  },
]

export default function AboutGrid() {
  return (
    <section className="pgrid agrid" aria-labelledby="about-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">About</span>
        <h1 className="pgrid__title" id="about-title">
          {`Hi, I’m ${profile.firstName}.`}
        </h1>
        <p className="pgrid__lede">
          PLACEHOLDER - tell me what to put here: one line on what you do.
        </p>
      </header>

      <div className="home__glass agrid__glass">
        <div className="agrid__copy">
          <p className="agrid__lead">
            Your big statement goes here, in one or two lines.
            <span> A softer second half that finishes the thought.</span>
          </p>

          <p className="agrid__note">
            <strong>Your company name</strong>, and{' '}
            <a className="agrid__link" href="#">
              your product
            </a>{' '}
            - PLACEHOLDER - tell me what to put here: two sentences on your company, what
            you sell or build, and who it is for.
          </p>

          <ul className="agrid__caps" role="list">
            {CAPABILITIES.map((c) => (
              <li key={c.index} className="agrid__cap">
                <span className="agrid__cap-marks">
                  {c.marks.map((m, i) => (
                    <span
                      key={m.name}
                      className="agrid__mark"
                      style={{ '--i': c.marks.length - i } as CSSProperties}
                    >
                      <img src={m.src} alt={m.name} loading="lazy" decoding="async" />
                    </span>
                  ))}
                </span>
                <span className="agrid__cap-title">{c.title}</span>
                <span className="agrid__cap-index" aria-hidden="true">
                  {c.index}
                </span>
              </li>
            ))}
          </ul>

          {/* One plate, two cells sharing a mark / title / meta anatomy. */}
          <div className="agrid__bar">
            <span className="agrid__cell">
              <span className="agrid__cell-mark agrid__cell-mark--img">
                <img src="/placeholders/badge.svg" alt="" loading="lazy" decoding="async" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Credential name</span>
                <span className="agrid__cell-meta">Credential ID</span>
              </span>
            </span>

            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <MapPin size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">{profile.location}</span>
                <span className="agrid__cell-meta">Timezone · working hours</span>
              </span>
            </span>

            <a className="agrid__cell agrid__cell--wide" href="#">
              <span className="agrid__cell-mark agrid__cell-mark--plain">
                <img src="/placeholders/logo.svg" alt="" loading="lazy" decoding="async" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Community or affiliation</span>
                <span className="agrid__cell-meta">Your role there</span>
              </span>
              <ArrowUpRight className="agrid__cell-go" size={15} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="agrid__portrait">
          <img
            src="/avatar.svg"
            alt="Portrait placeholder"
            loading="eager"
            decoding="async"
            width={400}
            height={400}
          />
        </div>
      </div>
    </section>
  )
}
