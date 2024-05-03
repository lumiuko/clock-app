import { useEffect, memo } from 'react'
import useSWR from 'swr'

import Skeleton from './Skeleton'
import Error from './Error'

function Clock({ timeData, isExpanded, togglePanel }) {
  const date = new Date(timeData.unixtime * 1000)

  const {
    data: locationData,
    isLoading: isLocationLoading,
    error: locationError
  } = useSWR(['https://api.ipbase.com/v2/info', { apikey: import.meta.env.VITE_APP_IPBASE_API_KEY }])

  const hours = date.getHours()
  const minutes = date.getMinutes()
  const isDark = hours >= 18 || hours < 5

  useEffect(() => {
    document.documentElement.className = isDark ? 'dark' : ''
  }, [isDark])

  if (isLocationLoading) {
    return <Skeleton />
  }

  if (locationError) {
    return <Error>Location fetch error: {locationError.message}</Error>
  }

  const { country, city } = locationData.data.location

  let timeOfDay = ''
  if (hours >= 5 && hours < 12) {
    timeOfDay = 'morning'
  } else if (hours >= 12 && hours < 18) {
    timeOfDay = 'afternoon'
  } else {
    timeOfDay = 'evening'
  }

  return (
    <section className="mt-auto flex flex-col gap-12 justify-between items-start md:gap-20 xl:flex-row xl:items-end">
      <div className="flex flex-col gap-4 md:gap-0 xl:gap-4">
        <h1 className="flex gap-4 items-center">
          {isDark ? <img src="/desktop/icon-moon.svg" alt="Moon icon" /> : <img src="/desktop/icon-sun.svg" alt="Sun icon" />}
          <div className="uppercase leading-body-2 tracking-[3px] md:leading-body-1 md:tracking-[3.6px] xl:text-h4 xl:tracking-[4px]">
            <span>Good {timeOfDay}</span>
            <span className="hidden md:inline">, it&apos;s currently</span>
          </div>
        </h1>
        <p className="flex gap-1 items-end md:gap-3">
          <span className="text-[6.25rem] leading-none font-bold tracking-[-2.5px] md:text-[10.9375rem] xl:text-h1">
            {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}
          </span>
          <span className="mb-1 font-light md:text-[2rem] md:mb-6 xl:mb-7 xl:text-[2.5rem]">{timeData.abbreviation}</span>
        </p>
        <p className="uppercase font-bold tracking-[3px] md:tracking-[3.6px] xl:text-h3 xl:tracking-[4.8px]">
          In {city.name}, {country.alpha2}
        </p>
      </div>

      <button
        className="p-1 pl-4 rounded-[28px] bg-white text-black/50 flex items-center gap-4 md:p-2 md:pl-5 md:gap-3 group"
        onClick={togglePanel}
      >
        <span className="uppercase font-bold text-xs leading-[0.875rem] tracking-[3.75px] md:text-base md:leading-body-1">
          {isExpanded ? 'Less' : 'More'}
        </span>
        <div className="size-8 bg-dark-gray flex justify-center items-center rounded-full md:size-10 group-hover:bg-gray transition-colors">
          <img
            src="/desktop/icon-arrow-down.svg"
            className="transition-transform"
            alt="Arrow down"
            style={{ transform: isExpanded ? 'rotate(180deg)' : '' }}
          />
        </div>
      </button>
    </section>
  )
}

const MemoizedClock = memo(Clock)
export default MemoizedClock
