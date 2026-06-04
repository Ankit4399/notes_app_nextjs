export type Note = {
    id: string
    title: string
    content: string
    category: string
    createdAt: string
}

// export function getBaseUrl() {
//     if (process.env.VERCEL_URL) {
//         return `https://notes-app-nextjs-weld.vercel.app/`;
//     }

//     return `http://localhost:${process.env.PORT ?? 3000}`;
// }

export async function fetchNotes() {
    const res = await fetch('https://notes-app-nextjs-weld.vercel.app/api/notes', {
        cache: 'no-store',
    });

    console.log('Status:', res.status);

    const json = await res.json();

    console.log('Response:', json);

    return json.data;
}