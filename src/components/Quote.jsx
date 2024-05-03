import { useState, Fragment } from 'react'
import { Transition } from '@headlessui/react'

import quotes from '../data/quotes.json'
import random from '../utils/random'
import { fade } from '../utils/transition'

export default function Quote({ isExpanded }) {
  const [quoteIndex, setQuoteIndex] = useState(random(quotes.length))

  function randomizeQuote() {
    setQuoteIndex(random(quotes.length))
  }

  return (
    <Transition as={Fragment} show={!isExpanded} {...fade}>
      <header className="flex items-start gap-4 max-w-[573px]">
        <blockquote
          className="w-full text-xs leading-[1.375rem] flex flex-col gap-2 md:text-body-1 md:leading-body-1 md:gap-3"
          role="region"
          aria-live="polite"
        >
          <p>“{quotes[quoteIndex].en}”</p>
          <p className="font-bold">{quotes[quoteIndex].author}</p>
        </blockquote>
        <button aria-label="Refresh quote" onClick={randomizeQuote} className="opacity-50 hover:opacity-100 transition-opacity">
          <img src="/desktop/icon-refresh.svg" alt="" aria-hidden="true" />
        </button>
      </header>
    </Transition>
  )
}
