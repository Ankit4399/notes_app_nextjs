'use client';

import { Note } from '@/lib/note';
import { Trash2, Edit2 } from 'lucide-react';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

const categoryColors: Record<string, { bar: string; badge: string }> = {
  Personal: {
    bar: 'bg-[#F7C1BB]',
    badge: 'border-[#F7C1BB] bg-[#F7C1BB]/45 text-[#885A5A] dark:border-[#F7C1BB]/30 dark:bg-[#F7C1BB]/15 dark:text-[#F7C1BB]',
  },
  Work: {
    bar: 'bg-[#353A47]',
    badge: 'border-[#353A47]/15 bg-[#353A47]/5 text-[#353A47] dark:border-[#F7C1BB]/15 dark:bg-[#353A47] dark:text-white',
  },
  Ideas: {
    bar: 'bg-[#DC136C]',
    badge: 'border-[#DC136C]/25 bg-[#DC136C]/8 text-[#DC136C] dark:border-[#DC136C]/40 dark:bg-[#DC136C]/15 dark:text-[#ff8fbd]',
  },
  Learning: {
    bar: 'bg-[#84B082]',
    badge: 'border-[#84B082]/45 bg-[#84B082]/15 text-[#4f7450] dark:border-[#84B082]/50 dark:bg-[#84B082]/15 dark:text-[#b8d4b7]',
  },
  Todo: {
    bar: 'bg-[#885A5A]',
    badge: 'border-[#885A5A]/25 bg-[#f5e5e2] text-[#885A5A] dark:border-[#885A5A]/60 dark:bg-[#885A5A]/25 dark:text-[#F7C1BB]',
  },
  Other: {
    bar: 'bg-[#84B082]',
    badge: 'border-[#353A47]/10 bg-[#F7C1BB]/25 text-[#353A47] dark:border-[#66515a] dark:bg-[#463d45] dark:text-[#fff7f5]',
  },
};

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const colors = categoryColors[note.category] ?? categoryColors.Other;

  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-lg border border-[#F7C1BB] bg-white p-5 shadow-sm shadow-[#885A5A]/10 transition-colors duration-200 hover:border-[#84B082] hover:shadow-md dark:border-[#66515a] dark:bg-[#353A47] dark:hover:border-[#84B082]">
      <div className={`absolute inset-x-0 top-0 h-1 ${colors.bar}`} />
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-base font-bold text-[#353A47] dark:text-white mb-2 line-clamp-2 group-hover:text-[#DC136C] dark:group-hover:text-[#F7C1BB] transition-colors">
            {note.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`inline-block rounded-full border px-3 py-1 text-xs font-bold ${colors.badge}`}>
              {note.category}
            </span>
            <span className="text-xs text-[#885A5A] dark:text-[#F7C1BB] font-medium">
              {formatDate(note.createdAt)}
            </span>
          </div>
        </div>
        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onEdit(note)}
            className="rounded-lg p-1.5 text-[#353A47] transition-colors duration-200 hover:bg-[#F7C1BB]/50 hover:text-[#DC136C] dark:text-[#fff7f5] dark:hover:bg-[#463d45]"
            aria-label="Edit note"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="rounded-lg p-1.5 text-red-600 transition-colors duration-200 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/40"
            aria-label="Delete note"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <p className="text-[#885A5A] dark:text-[#f3d6d2] text-sm line-clamp-2 leading-relaxed">
        {note.content}
      </p>
    </div>
  );
}
