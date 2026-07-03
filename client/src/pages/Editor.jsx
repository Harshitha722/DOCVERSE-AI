import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Start writing your document here...</p>',
  });

  return (
    <div>
      <h1 className="gradient-text">Rich Document Editor</h1>
      <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem', minHeight: '60vh' }}>
        <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
          {/* Toolbar will go here */}
          <button onClick={() => editor.chain().focus().toggleBold().run()} style={{ marginRight: '0.5rem' }}>Bold</button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
        </div>
        <EditorContent editor={editor} style={{ outline: 'none' }} />
      </div>
    </div>
  );
};

export default Editor;
