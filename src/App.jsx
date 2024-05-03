import { useState } from 'react'
import useSWR from 'swr'

import Quote from './components/Quote'
import Clock from './components/Clock'
import InfoPanel from './components/InfoPanel'
import Skeleton from './components/Skeleton'
import Error from './components/Error'

function App() {
  const [isExpanded, setIsExpanded] = useState(false)

  const {
    data: timeData,
    isLoading: isTimeLoading,
    error: timeError
  } = useSWR(['https://worldtimeapi.org/api/ip'], {
    refreshInterval: 1000 * 10
  })

  function togglePanel() {
    setIsExpanded(prevExpanded => !prevExpanded)
  }

  return (
    <>
      <main className="flex-1 px-6 pt-8 pb-10 flex md:px-16 md:pt-20 md:pb-16 xl:pt-14 xl:pb-14">
        <div className="relative flex-1 max-w-container mx-auto flex flex-col gap-8 md:gap-16 xl:gap-20">
          <Quote isExpanded={isExpanded} />
          {timeError && <Error>Time fetching error: {timeError.message}</Error>}
          {isTimeLoading && <Skeleton />}
          {timeData && <Clock timeData={timeData} isExpanded={isExpanded} togglePanel={togglePanel} />}
        </div>
      </main>
      <InfoPanel isExpanded={isExpanded} timeData={timeData} />
    </>
  )
}

export default App
