'use client';

import { Note } from '@/lib/note';
import { useState } from 'react';
import { PenLine, Save, X } from 'lucide-react';
import { createNote, updateNote } from '@/app/actions/note-action';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

interface NoteFormProps {
  note?: Note | null;
  onClose: () => void;
}

const CATEGORIES = ['Personal', 'Work', 'Ideas', 'Learning', 'Todo', 'Other'];

export default function NoteForm({ note, onClose }: NoteFormProps) {
  const [title, setTitle] = useState(note?.title ?? '');
  const [content, setContent] = useState(note?.content ?? '');
  const [category, setCategory] = useState(note?.category ?? 'Personal');

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('title', title)
    formData.append('content', content)
    formData.append('category', category)

    startTransition(async () => {
      try {
        if (note) {
          await updateNote(note.id, formData);
        } else {
          await createNote(formData);
        }

        setTitle('');
        setContent('');
        setCategory('Personal');

        window.location.reload();

        onClose();
      } catch (error) {
        console.error(error);
        alert('Failed to save note');
      }
    });

  }

  return (
    <div className="modal-overlay fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="modal-content max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-2xl dark:bg-[#353A47]">
        <div className="sticky top-0 flex items-center justify-between border-b border-[#F7C1BB]/20 bg-[#353A47] px-8 py-6">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-white">
            <PenLine size={24} className="text-[#84B082]" />
            {note ? 'Edit Note' : 'Create New Note'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 transition-colors duration-200 hover:bg-white/15 active:bg-white/20"
            aria-label="Close"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-[#353A47] dark:text-[#fff7f5] mb-3">
              Note Title
            </label>
            <input
              name='title'
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your note a title..."
              className="w-full rounded-lg border-2 border-[#F7C1BB] bg-white px-5 py-3 font-medium text-[#353A47] transition-colors duration-200 placeholder:text-[#a98784] focus:border-[#84B082] focus:outline-none focus:ring-4 focus:ring-[#84B082]/20 dark:border-[#66515a] dark:bg-[#463d45] dark:text-white dark:placeholder:text-[#d0aaa6]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#353A47] dark:text-[#fff7f5] mb-3">
              Category
            </label>
            <select
              name='category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border-2 border-[#F7C1BB] bg-white px-5 py-3 font-medium text-[#353A47] transition-colors duration-200 focus:border-[#84B082] focus:outline-none focus:ring-4 focus:ring-[#84B082]/20 dark:border-[#66515a] dark:bg-[#463d45] dark:text-white dark:focus:border-[#84B082] dark:focus:ring-[#84B082]/20"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#353A47] dark:text-[#fff7f5] mb-3">
              Content
            </label>
            <textarea
              name='content'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              rows={10}
              className="w-full resize-none rounded-lg border-2 border-[#F7C1BB] bg-white px-5 py-3 font-medium text-[#353A47] transition-colors duration-200 placeholder:text-[#a98784] focus:border-[#84B082] focus:outline-none focus:ring-4 focus:ring-[#84B082]/20 dark:border-[#66515a] dark:bg-[#463d45] dark:text-white dark:placeholder:text-[#d0aaa6] dark:focus:border-[#84B082] dark:focus:ring-[#84B082]/20"
            />
          </div>

          <div className="flex gap-3 justify-end pt-6 border-t border-[#F7C1BB] dark:border-[#66515a]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border-2 border-[#F7C1BB] px-6 py-2.5 font-bold text-[#885A5A] transition-colors duration-200 hover:border-[#885A5A] hover:bg-[#F7C1BB]/35 dark:border-[#66515a] dark:text-[#fff7f5] dark:hover:border-[#F7C1BB] dark:hover:bg-[#463d45]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#DC136C] px-8 py-2.5 font-bold text-white shadow-md shadow-[#DC136C]/25 transition-colors duration-200 hover:bg-[#b90f5b] active:bg-[#9f0d4f] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={18} />
              {isPending ? 'Saving...' : 'Save Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
