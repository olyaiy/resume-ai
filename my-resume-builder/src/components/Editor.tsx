'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { Button } from './ui/button'
// import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'
import { Bold, Italic, ItalicIcon, Underline as UnderlineIconLucid } from "lucide-react"
import { Separator } from "@/components/ui/separator"





const Editor = () => {
  const editor = useEditor({
    
    immediatelyRender: false,
    extensions: [StarterKit, Underline.configure({
      HTMLAttributes: {
        class: 'my-custom-class',
      },
    })   ],
    content: '<p>Hello World! 🌎️</p>',
     
    editorProps: {
      attributes: {
        class: 'w-full h-full focus:outline-none ',
      },},
  

  })

  if (!editor) return <div> Editor Failed to Load</div>



  return (
  <div className="flex flex-col gap-4 w-full h-full ">

    {/* toolbar */}
    <div 
    className="flex flex-row gap-2 w-full rounded-lg"> 
      {/* Bold Button  */}
      <Button 
      onClick={() => editor.chain().focus().toggleBold().run()} 
      className='bg-white text-black hover:bg-slate-300'> 
      <Bold className="h-4 w-4"/>
      </Button>

      {/* Italics Button */}
      <Button 
      onClick={() => editor.chain().focus().toggleItalic().run()} 
      className={`bg-white text-black hover:bg-slate-300 ${editor.isActive('italic') ? 'is-active' : ''}`}> 
            {/* <ItalicIcon/> */}
            <ItalicIcon className="h-4 w-4"/>
      </Button>

      {/* Underline Button */}
      <Button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
                  className={`bg-white text-black hover:bg-slate-300 ${editor.isActive('underline') ? 'is-active' : ''}`}> 
             {/* <UnderlineIcon /> */}
             <UnderlineIconLucid className="h-4 w-4"/>
      </Button>
      

    </div>


    <EditorContent editor={editor} 
    className='flex w-full h-full border border-gray-200 shadow-md pt-8 px-6'/>
  </div>
  )
}

export default Editor
