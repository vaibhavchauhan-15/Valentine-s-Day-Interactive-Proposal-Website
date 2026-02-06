import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GiftBoxScreen from './components/GiftBoxScreen'
import ValentineQuestion from './components/ValentineQuestion'
import DateOptionsScreen from './components/DateOptionsScreen'
import FinalScreen from './components/FinalScreen'
import FloatingHearts from './components/FloatingHearts'

function App() {
  const [screen, setScreen] = useState('gift') // gift, question, options, final
  const [selectedOption, setSelectedOption] = useState('')

  const handleGiftOpen = () => {
    setScreen('question')
  }

  const handleYes = () => {
    setScreen('options')
  }

  const handleDateSelection = (option) => {
    setSelectedOption(option)
    setTimeout(() => {
      setScreen('final')
    }, 2500)
  }

  return (
    <div className="min-h-screen h-screen w-full overflow-hidden relative bg-gradient-to-br from-pink-200 via-valentine-lavender via-50% to-valentine-pink animate-gradient-slow">
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-pink-300/20 via-transparent to-purple-300/20"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: [0.22, 1, 0.36, 1]
        }}
        style={{ willChange: 'opacity' }}
      />
      
      <FloatingHearts />
      
      <AnimatePresence mode="wait">
        {screen === 'gift' && (
          <GiftBoxScreen key="gift" onOpen={handleGiftOpen} />
        )}
        
        {screen === 'question' && (
          <ValentineQuestion key="question" onYes={handleYes} />
        )}
        
        {screen === 'options' && (
          <DateOptionsScreen key="options" onSelect={handleDateSelection} />
        )}
        
        {screen === 'final' && (
          <FinalScreen key="final" selectedOption={selectedOption} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
