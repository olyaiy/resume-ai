'use client'
import React from 'react'

import { useEditor, EditorContent } from '@tiptap/react'

// Tiptap Extensions
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Underline from '@tiptap/extension-underline'
import Text from '@tiptap/extension-text'
import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import HorizontalRule from '@tiptap/extension-horizontal-rule'



// shadcn
import { Button } from './ui/button'
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent } from './ui/popover'
import { Input } from "@/components/ui/input"

// Icons
import { BoldIcon, ItalicIcon, LinkIcon, ListIcon, Minus, TextQuote, Underline as UnderlineIconLucid } from "lucide-react"


export function InputDemo() {
  return <Input type="email" placeholder="Email" />
}
import { PopoverTrigger } from '@radix-ui/react-popover'
import { useState } from 'react'

// Handle Set Link
const handleSetLink = (editor: any) => {
  // get the current input box value
  const input = document.getElementById('link-input') as HTMLInputElement | null;
  let url = input?.value || '';

  // Add https:// if it's missing and the URL is not empty
  if (url && !url.match(/^https?:\/\//)) {
    url = `https://${url}`;
  }
  

  // set the link to the correct value
  editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();

}
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
      Link.configure({
        protocols: ['https', 'mailto'],
        autolink: true,
        openOnClick: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: 'text-blue-700 hover:underline cursor-pointer'
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc'
        }

      }), 
      ListItem.configure({
        HTMLAttributes: {
          class: 'text-black'
        },
      }),
      HorizontalRule.configure({
        HTMLAttributes: {
          class: 'my-4'
        }
      }),
      
    ],
    content:`
        <ul>
          <li>A list item</li>
          <li>And another one</li>
        </ul>
      `,
    editorProps: {
      attributes: {
        class: 'w-full h-full focus:outline-none ',
      },},
      // injectCSS: false,
  })

  if (!editor) return <div> Editor Failed to Load</div>; else return (
  
    // Editor Container
  <div className="flex flex-col gap-4 w-full h-full ">

    {/* toolbar */}
    <div className="flex flex-row gap-2 w-full rounded-lg justify-center"> 

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
      
      {/* Link Button */}
      <Popover>
        <PopoverTrigger asChild>
          <Button 
              className={`bg-white text-black hover:bg-slate-300 ${editor.isActive('underline') ? 'is-active' : ''}`}>
            <LinkIcon className="h-4 w-4"/>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full p-4 flex flex-col gap-4'>
          <div className="flex flex-row gap-2">
            <Input className="w-64" id="link-input"/>
            <Button onClick={() => handleSetLink(editor)}>  Add Link </Button>
          </div>

          <Button
            onClick={() => editor.chain().focus().unsetLink().run()}
          > Remove Link</Button>
        </PopoverContent>
      </Popover>

      {/* Bullet List Button */}
      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={ `bg-white text-black hover:bg-slate-300 ${editor.isActive('bulletList') ? 'is-active' : ''}`}>
          <ListIcon />
        </Button>      

      { /* Horizontal Rule Button */}
      <Button 
      onClick={() => editor.chain().focus().setHorizontalRule().run()}
      className={'bg-white text-black hover:bg-slate-300'}>
      
        <Minus />
      </Button>

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
