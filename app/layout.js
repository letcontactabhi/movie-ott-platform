import './globals.css'

export const metadata = {
  title: 'Movie-OTT Platform Database',
  description: 'A database linking movies to their availability on OTT platforms',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}