import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

function TwemojiWrapper({ children }) {
  useEffect(() => {
    const parse = () => {
      if (window.twemoji) {
        window.twemoji.parse(document.body, {
          folder: 'svg',
          ext: '.svg',
        })
      }
    }
    parse()
    const observer = new MutationObserver(parse)
    observer.observe(document.getElementById('root'), { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])
  return children
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TwemojiWrapper>
        <App />
      </TwemojiWrapper>
    </BrowserRouter>
  </StrictMode>,
)
