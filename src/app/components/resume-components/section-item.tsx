import React from 'react'

const SectionItem = () => {
  return (
    <div>
        {/* Section Item */}
        <div className="flex flex-row justify-between">
            
            <div className="flex flex-col">
                <h2 className='text-lg font-bold'>Section item</h2>
                <p>This is a description of the item</p>
            </div>
            <p>01/01/2024</p>
        </div>

        <ul className="list-disc">
            <li className="ml-4">STAR: Situation Task Action Result</li>
            <li className="ml-4">STAR: Situation Task Action Result</li>
            <li className="ml-4">STAR: Situation Task Action Result</li>
            <li className="ml-4">STAR: Situation Task Action Result</li>
        </ul>
      
    </div>
  )
}

export default SectionItem
