import React, { useEffect } from 'react';
import { EditorContent, BubbleMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdLink,
  MdLinkOff,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdLooksOne,
  MdLooksTwo,
  MdLooks3,
} from "react-icons/md";

import './Tiptap.css';

// define your extension array
const extensions = [
  StarterKit,
  Underline,
  Heading.configure({ levels: [2,3]}),
  Link.configure({}),
  Placeholder.configure({
    placeholder: "Start typing your description...",
    emptyEditorClass: "is-editor-empty",
  })
]
// const extensions: [
//   StarterKit.configure({
//     heading: { levels: [1, 2, 3] },
//   }),
//   Underline,
//   Link.configure({
//     openOnClick: true,
//     autolink: true,
//   }),
//   Placeholder.configure({
//     placeholder: "Start typing your description...",
//     emptyEditorClass: "is-editor-empty",
//   }),
// ];

type Props = {
  content: string,
  setContent: (content: string) => void
}

export const Tiptap = ({ content, setContent }: Props) => {

  const editor = useEditor({
    extensions,
    content: content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    }
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [ content, editor ]);

  return (<div className='tiptap-editor'>
    {/* Toolbar */}
    <div className="toolbar">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={editor?.isActive("bold") ? "active" : ""}
        >
          <MdFormatBold />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={editor?.isActive("italic") ? "active" : ""}
        >
          <MdFormatItalic />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={editor?.isActive("underline") ? "active" : ""}
        >
          <MdFormatUnderlined />
        </button>
        <button
          onClick={() => {
            const url = prompt("Enter URL") || "";
            if (url) editor?.chain().focus().setLink({ href: url }).run();
          }}
          className={editor?.isActive("link") ? "active" : ""}
        >
          <MdLink />
        </button>
        <button onClick={() => editor?.chain().focus().unsetLink().run()}>
          <MdLinkOff />
        </button>

        <button
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor?.isActive("heading", { level: 1 }) ? "active" : ""}
        >
          <MdLooksOne />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor?.isActive("heading", { level: 2 }) ? "active" : ""}
        >
          <MdLooksTwo />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor?.isActive("heading", { level: 3 }) ? "active" : ""}
        >
          <MdLooks3 />
        </button>

        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={editor?.isActive("bulletList") ? "active" : ""}
        >
          <MdFormatListBulleted />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={editor?.isActive("orderedList") ? "active" : ""}
        >
          <MdFormatListNumbered />
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="editor-content" />

      {/* Bubble Menu */}
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div className="bubble-menu">
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={editor?.isActive("bold") ? "active" : ""}
          >
            <MdFormatBold />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={editor?.isActive("italic") ? "active" : ""}
          >
            <MdFormatItalic />
          </button>
        </div>
      </BubbleMenu>
  </div>);
  // return (
  //   <EditorProvider extensions={extensions} content={content}>
  //     <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>
  //     <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu>
  //   </EditorProvider>
  // )
  // return (
  //   <>
  //     { editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100}}>
  //       <div className='bubble-menu'>
  //         <button
  //           onClick={() => editor.chain().focus().toggleBold().run()}
  //           className={editor.isActive('bold') ? 'is-active' : ''}
  //         >Bold</button>
  //         <button
  //           onClick={() => editor.chain().focus().toggleItalic().run()}
  //           className={editor.isActive('italic') ? 'is-active' : ''}
  //         >Italic</button>
  //         <button
  //           onClick={() => editor.chain().focus().toggleUnderline().run()}
  //           className={editor.isActive('underline') ? 'is-active' : ''}
  //         >Underline</button>
  //       </div>
  //     </BubbleMenu>
  //     }
  //     {editor && <div className='control-group'>
  //       <div className='button-group'>
  //         {/* <button
  //           onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
  //           className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
  //         >H1</button> */}
  //         <button
  //           onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
  //           className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
  //         >H2</button>
  //         <button
  //           onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
  //           className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
  //         >H3</button>
  //       </div>
  //     </div>}
  //     <EditorContent editor={editor} slot='' />
  //     {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu> */}
  //   </>
  // )
};