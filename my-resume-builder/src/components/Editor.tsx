'use client'
import React, { useState } from 'react'

import { useEditor, EditorContent } from '@tiptap/react'
import { getResumeContent } from '../lib/getResumeContent';
import { generateJSON } from '@tiptap/html';



// Tiptap Extensions
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Underline from '@tiptap/extension-underline'
import Heading from '@tiptap/extension-heading'
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
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


// Icons
import { BoldIcon, Heading1, Heading2, Heading3, HeadingIcon, ItalicIcon, LinkIcon, ListIcon, Loader2, LucideHeading, Minus, QuoteIcon, TextQuote, Underline as UnderlineIconLucid } from "lucide-react"

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

const Editor = ({ initialContent, saveLocation }: { initialContent: any; saveLocation: string }) => {
  const [isSaving, setIsSaving] = useState(false);

  // Get the initial JSON content
  const initialJSON = generateJSON(initialContent, [
    Document,
    Paragraph,
    Text.configure({
      HTMLAttributes: {
        class: ''
      }
    }),
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
        class: 'cursor-pointer'
      },
    }),
    BulletList,
    ListItem,
    HorizontalRule,
    
  ]);

  // Editor Instance Configuration
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Document,
      Paragraph,
      Text.configure({
        HTMLAttributes: {
          class: ''
        }
      }),
      Heading,
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
          class: 'cursor-pointer'
        },
      }),
      BulletList,
      ListItem,
      HorizontalRule,
      
    ],


    content: initialJSON,
    editorProps: {
      attributes: {
        class: 'w-full h-full prose text-black prose- decoration-black color prose-stone prose-sm  m-5 dark:prose-invert prose-a:text-blue-700 focus:outline-none',

      },},
      injectCSS: false,
  })
  // Save the content to the server
  const handleSave = async (editor: any) => {
    if (!editor) return;

    setIsSaving(true);
    try {
      const content = editor.getJSON();
      const response = await fetch('/api/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error('Failed to save content');
      }

      const result = await response.json();
      console.log(result.message); // 'Content saved successfully'
      // You could show a success message to the user here
    } catch (error) {
      console.error('Save error:', error);
      // You could show an error message to the user here
    } finally {
      setIsSaving(false);
    }
  };


  // while editor is loading, dipaly a loading spinner
  if (!editor) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader2 className="animate-spin text-blue-500" />
      </div>
    );
  } 

  // display the editor
  else return (
  
    // Editor Container
  <div className="flex flex-col gap-4 w-full h-full ">

    {/* toolbar */}
    <div className="flex flex-row gap-2 w-full rounded-lg justify-center"> 


      {/* Heading Button */}
      <DropdownMenu>

        {/* Dropdown Button */}
        <DropdownMenuTrigger><HeadingIcon className="h-4 w-4"/></DropdownMenuTrigger>
        
        {/* Dropdown Content */}
        <DropdownMenuContent>

          {/* Heading 1 */}
          <DropdownMenuItem
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
            <Heading1/>
          </DropdownMenuItem>

          {/* Heading 2 */}
          <DropdownMenuItem
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
            <Heading2/>
          </DropdownMenuItem>

          {/* Heading 3 */}
          <DropdownMenuItem
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
            <Heading3/>
          </DropdownMenuItem>
        </DropdownMenuContent>

        
      </DropdownMenu>



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

      {/* Blockquote Button */}
      <Button
      onClick={() => editor.chain().focus().toggleBlockquote().run()}
      className={ `bg-white text-black hover:bg-slate-300 ${editor.isActive('blockQuote') ? 'is-active' : ''}`}>
      
        <QuoteIcon className="h-4 w-4"/>
      </Button>

      { /* Horizontal Rule Button */}
      <Button 
      onClick={() => editor.chain().focus().setHorizontalRule().run()}
      className={'bg-white text-black hover:bg-slate-300'}>
      
        <Minus className="h-4 w-4"/>
      </Button>

      {/* Save Button */}
      <Button 
      onClick={() => handleSave(editor)}
      disabled={isSaving}
      className={`bg-green-600 text-white hover:bg-green-950`}>
      {isSaving ? 'Saving...' : 'Save'}
      </Button>
      
    </div>


    <EditorContent editor={editor} className='flex min-w-full min-h-full border border-gray-200 shadow-md pt-8 px-6'/>
  </div>
  )
}

export default Editor
