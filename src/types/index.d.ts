import { ReactNode } from 'react';

declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> { }
  }
}

export interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

export interface Genre {
  name: string;
  description: string;
  color: string;
}

export interface FooterLink {
  title: string;
  links: {
    name: string;
    href: string;
  }[];
}

export interface PageTransitionProps {
  children: ReactNode;
}

export interface RecordLogoProps {
  size?: number;
  className?: string;
}

export interface Playlist {
  id: number;
  name: string;
  description: string;
  trackCount: number;
}

export interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
}

export interface MotionProps {
  initial?: Record<string, any>;
  animate?: Record<string, any>;
  exit?: Record<string, any>;
  whileInView?: Record<string, any>;
  viewport?: Record<string, any>;
  transition?: Record<string, any>;
  whileHover?: Record<string, any>;
  whileTap?: Record<string, any>;
} 