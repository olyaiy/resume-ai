import { Separator } from '@/components/ui/separator'
import React from 'react'
import SectionItem from '../section-item'

const Section = () => {
  return (
      <div className='bg-white text-black'>
        
        {/* Section Title */}
        <h1 className='text-xl font-bold'>Section Title</h1>
        
        <Separator className='bg-black'/>

        <SectionItem />
        <SectionItem />
        <SectionItem />
        


    </div>
  )
}

export default Section
