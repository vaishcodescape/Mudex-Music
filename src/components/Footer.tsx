import Link from 'next/link';
import { FooterLink } from '@/types';

const links: FooterLink[] = [
  {
    title: 'Open Source Contributions',
    links: [
      { name: 'Github', href: 'https://github.com/vaishcodescape/Mudex-Music.git' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-t from-black/90 via-sky-950/70 to-white/10 backdrop-blur-2xl border-t border-sky-500/20 rounded-t-3xl shadow-2xl text-white py-10 mt-24 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 flex flex-col items-center">
        <div className="w-full flex flex-col items-center gap-8">
          {links.map((section) => (
            <div key={section.title} className="w-full flex flex-col items-center">
              <h3 className="text-base font-semibold text-sky-400 uppercase tracking-wider mb-2 text-center font-sans">
                {section.title}
              </h3>
              <ul className="flex flex-col items-center gap-2 mt-1">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center text-sky-200/90 hover:text-sky-400 transition-colors text-base font-sans"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className="h-5 w-5 mr-2 text-sky-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="w-full mt-10 pt-6 border-t border-sky-500/20 flex flex-col items-center">
          <p className="text-sky-200/60 text-sm text-center font-sans">
            © {new Date().getFullYear()} Mudex Music. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 