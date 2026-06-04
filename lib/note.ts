export type Note = {
    id: string
    title: string
    content: string
    category: string
}

export async function fetchNotes(){
    const res = await fetch(`http://localhost:3000/api/notes`,{cache:"no-store"})

    if(!res.ok){
        return [];
    }
    const resjson = await res.json();
    return resjson.data;
}