'use client';

import { Note, fetchNotes } from '@/lib/note';
import { useEffect, useMemo, useState } from 'react';
import NoteCard from '@/components/note/NoteCard';
import NoteForm from '@/components/note/NoteForm';
import SearchBar from '@/components/note/SearchBar';
import CategoryFilter from '@/components/note/CategoryFilter';
import { Plus, BookOpen, FilePenLine } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [allCategories] = useState<string[]>([
    'Personal',
    'Work',
    'Ideas',
    'Learning',
    'Todo',
    'Other',
  ]);

  const filteredNotes = useMemo(() => {
    let result = notes;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      result = result.filter((note) => note.category === selectedCategory);
    }

    return result;
  }, [notes, searchQuery, selectedCategory]);

  useEffect(() => {
    let isMounted = true;

    fetchNotes()
      .then((data) => {
        if (isMounted) {
          setNotes(data || []);
        }
      })
      .catch((error) => {
        console.error('Failed to load notes:', error);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCreateOrUpdate = async (data: {
    title: string;
    content: string;
    category: string;
  }) => {
    try {
      if (editingNote) {
        // Update note
        const res = await fetch(`/api/notes/${editingNote.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          const updatedNote = await res.json();
          setNotes(
            notes.map((n) =>
              n.id === editingNote.id ? updatedNote.data : n
            )
          );
        }
      } else {
        // Create note
        const res = await fetch('/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          const newNote = await res.json();
          setNotes([newNote.data, ...notes]);
        }
      }
      setEditingNote(null);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to save note:', error);
      alert('Failed to save note');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return;

    try {
      const res = await fetch(`/api/notes/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setNotes(notes.filter((n) => n.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete note:', error);
      alert('Failed to delete note');
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setIsFormOpen(true);
  };

  const handleNewNote = () => {
    setEditingNote(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingNote(null);
  };

  return (
    <main className="min-h-dvh w-full bg-[#fbf2ef] text-[#353A47] dark:bg-[#242936] dark:text-[#fff7f5]">
      <div className="mx-auto flex min-h-dvh w-full max-w-7xl flex-col px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <header className="mb-6 flex flex-col gap-5 rounded-lg border border-[#353A47]/10 bg-[#353A47] px-5 py-5 shadow-lg shadow-[#885A5A]/15 dark:border-[#F7C1BB]/15 dark:bg-[#353A47] sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <Link
                  href="/"
                  className="flex items-center gap-3 hover:opacity-90 transition"
                >
              <span 
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#F7C1BB] text-[#353A47]"
              >
                <BookOpen size={28} />
              </span>
              <h1 className="truncate text-4xl font-bold tracking-normal text-white sm:text-5xl">
                My Notes
              </h1>

              </Link>
            </div>
            <p className="mt-2 text-sm font-medium text-[#F7C1BB]">
              {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={handleNewNote}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#DC136C] px-5 py-3 font-bold text-white shadow-md shadow-[#DC136C]/25 transition-colors duration-200 hover:bg-[#b90f5b] active:bg-[#9f0d4f] sm:w-auto"
          >
            <Plus size={20} />
            <span>New Note</span>
          </button>
        </header>

        <section className="mb-8 grid gap-4 rounded-lg border border-[#F7C1BB] bg-white/90 p-4 shadow-sm shadow-[#885A5A]/10 dark:border-[#66515a] dark:bg-[#353A47] sm:p-5 lg:grid-cols-[minmax(20rem,28rem)_1fr] lg:items-end">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#885A5A] dark:text-[#F7C1BB]">
              Search
            </p>
            <SearchBar onSearch={setSearchQuery} />
          </div>

          <div className="min-w-0">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#885A5A] dark:text-[#F7C1BB]">
              Filter by Category
            </p>
            <CategoryFilter
              categories={allCategories}
              onFilter={setSelectedCategory}
            />
          </div>
        </section>

        {isLoading ? (
          <section className="grid flex-1 place-items-center py-16">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6 h-16 w-16">
                <div className="absolute inset-0 animate-pulse rounded-full bg-[#DC136C] opacity-20"></div>
                <div className="absolute inset-2 animate-spin rounded-full border-4 border-transparent border-r-[#DC136C] border-t-[#84B082]"></div>
              </div>
              <p className="font-medium text-[#885A5A] dark:text-[#F7C1BB]">
                Loading your notes...
              </p>
            </div>
          </section>
        ) : filteredNotes.length === 0 ? (
          <section className="grid flex-1 place-items-center py-12">
            <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-lg border border-[#F7C1BB] bg-white text-[#DC136C] shadow-sm dark:border-[#66515a] dark:bg-[#353A47] dark:text-[#F7C1BB]">
                <FilePenLine size={52} strokeWidth={1.8} />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-[#353A47] dark:text-white sm:text-3xl">
                {notes.length === 0 ? 'No notes yet' : 'No notes match your filters'}
              </h3>
              <p className="mb-8 text-base text-[#885A5A] dark:text-[#F7C1BB] sm:text-lg">
                {notes.length === 0
                  ? 'Create your first note to get started'
                  : 'Try adjusting your search or filters'}
              </p>
              {notes.length === 0 && (
                <button
                  onClick={handleNewNote}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#DC136C] px-6 py-3 font-bold text-white shadow-md shadow-[#DC136C]/25 transition-colors duration-200 hover:bg-[#b90f5b] active:bg-[#9f0d4f]"
                >
                  <Plus size={20} />
                  Create First Note
                </button>
              )}
            </div>
          </section>
        ) : (
          <section className="grid grid-cols-1 gap-5 pb-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </section>
        )}
      </div>

      {isFormOpen && (
        <NoteForm
          key={editingNote?.id ?? 'new-note'}
          note={editingNote}
          onClose={handleCloseForm}
          onSave={handleCreateOrUpdate}
        />
      )}
    </main>
  );
}
