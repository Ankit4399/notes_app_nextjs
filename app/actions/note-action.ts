'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createNote(formData: FormData) {
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const category = formData.get('category') as string

    if (!title || !content) {
        throw new Error('Title and content are required');
    }

    await prisma.note.create({
        data: { title, content, category }
    })

    revalidatePath('/')
    revalidatePath('/notes')
}

export async function updateNote(id: string, formData: FormData) {
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const category = formData.get('category') as string

    await prisma.note.update({
        where: { id },
        data: { title, content, category }
    })

    revalidatePath('/')
    revalidatePath('/notes')
}

export async function deleteNote(id: string) {
    await prisma.note.delete({ where: { id } });

    revalidatePath('/')
    revalidatePath('/notes')

}