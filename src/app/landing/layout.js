import { Geist } from 'next/font/google';
import './landing.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

export const metadata = {
  title: 'TaskFlow — Manage complex workflows with absolute clarity',
  description:
    'TaskFlow is engineered for high-performance teams. Recede the noise and let your tasks take center stage.',
};

export default function LandingLayout({ children }) {
  return (
    <div
      className={`landing-page light ${geist.variable} ${geist.className} min-h-screen bg-background font-sans text-on-surface`}
    >
      {children}
    </div>
  );
}
