'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { Button } from './ui/button'
import { Bold, BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'
import Italic from '@tiptap/extension-italic'


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
    className="flex flex-row gap-2 w-full p-4 border border-slate-400 rounded-lg"> 
      {/* Bold Button  */}
      <Button 
      onClick={() => editor.chain().focus().toggleBold().run()} 
      className='bg-slate-200 text-black hover:bg-slate-300'> 
        <BoldIcon/>
      </Button>

      {/* Italics Button */}
      <Button 
      onClick={() => editor.chain().focus().toggleItalic().run()} 
      className={`bg-slate-200 text-black hover:bg-slate-300 ${editor.isActive('italic') ? 'is-active' : ''}`}> 
            <ItalicIcon/>
      </Button>

      {/* Underline Button */}
      <Button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
                  className={`bg-slate-200 text-black hover:bg-slate-300 ${editor.isActive('underline') ? 'is-active' : ''}`}> 
             <UnderlineIcon />
      </Button>

    </div>

    <EditorContent editor={editor} 
    className='flex w-full h-full border border-gray-200 shadow-md pt-8 px-6'/>
  </div>
  )
}

export default Editor
