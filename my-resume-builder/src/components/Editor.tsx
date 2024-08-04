'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import Underline from '@tiptap/extension-underline'

import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'




// shadcn
import { Button } from './ui/button'
import { Separator } from "@/components/ui/separator"


import { BoldIcon, ItalicIcon, TextQuote, Underline as UnderlineIconLucid } from "lucide-react"





const Editor = () => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline,
      Blockquote,
    ],

    content: '<p>Hello World! 🌎️</p>',
     
    editorProps: {
      attributes: {
        class: 'w-full h-full focus:outline-none ',
      },},
      injectCSS: false,

  

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
      <BoldIcon className="h-4 w-4"/>
      </Button>

      {/* Italics Button */}
      <Button 
      onClick={() => editor.chain().focus().toggleItalic().run()} 
      className={`bg-white text-black hover:bg-slate-300 ${editor.isActive('italic') ? 'is-active' : ''}`}> 
            <ItalicIcon className="h-4 w-4"/>
      </Button>

      {/* Underline Button */}
      <Button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
                  className={`bg-white text-black hover:bg-slate-300 ${editor.isActive('underline') ? 'is-active' : ''}`}> 
             {/* <UnderlineIcon /> */}
             <UnderlineIconLucid className="h-4 w-4"/>
      </Button>
      
      {/* Block Quote Button (doesnt work for some reason */}
      {/* <Button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                  className={editor.isActive('blockquote') ? 'is-active' : ''}> 
             <TextQuote className="h-4 w-4"/>
      </Button> */}

      {/* Save Button */}
      <Button 
      onClick={() => console.log(editor.getJSON())}
      className={`bg-green-600 text-white hover:bg-green-950`}>
        Save
      </Button>

      


    </div>


    <EditorContent editor={editor} 
    className='flex w-full h-full border border-gray-200 shadow-md pt-8 px-6'/>
  </div>
  )
}

export default Editor
