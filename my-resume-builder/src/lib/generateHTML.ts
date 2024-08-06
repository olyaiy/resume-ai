import { generateJSON } from '@tiptap/html'

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


generateJSON(`<p>On the server, or the browser</p>`, [
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
    // other extensions …
  ])
  