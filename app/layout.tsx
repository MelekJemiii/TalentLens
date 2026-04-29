import type { Metadata } from 'next'
import "./globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';


export const metadata: Metadata = {
   icons: {
    icon: './favicon-v2.ico',
  },
  title: 'TalentLens - AI-Powered Resume Analysis',
  description: 'Transform your resume with AI-driven insights.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  )
}