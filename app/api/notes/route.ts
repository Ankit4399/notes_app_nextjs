import {prisma} from '@/lib/db'
import {NextRequest, NextResponse} from 'next/server'

// get all notes
export async function GET(req : NextRequest){
    try {
        const searchparams = req.nextUrl.searchParams;
        const search = searchparams.get('search') || '';
        const category = searchparams.get('category') || '';

        const notes = await prisma.note.findMany({
            where : {
                AND: [
                    search? 
                    {
                        OR:[
                            {
                                title : {
                                    contains: search,
                                    mode : "insensitive"
                                }
                            },
                            {
                                content : {
                                    contains: search,
                                    mode : "insensitive"
                                }
                            }
                        ]
                    } : {},
                    category ? {category} : {}
                ]
            },
            orderBy : {
                createdAt: 'desc'
            }
    });
        return NextResponse.json(
            {success : true,data : notes},
            {status: 200}
        )   
    } catch (error) {
        return NextResponse.json(
            {success : false,message : "Failed to get all notes"},
            {status: 500}
        )
    }

}


// we use server action for this

//create a note 
// export async function POST(request : NextRequest) {
//     try {
//         const {title,content,category} = await request.json();
//         const note = await prisma.note.create({
//             data : {title,content,category}
//         })
    
//         return NextResponse.json(
//                 {success : true,data : note},
//                 {status: 200}
//             )  
//     } catch (error) {
//         return NextResponse.json(
//             {success : false,message : "Failed to create a note"},
//             {status: 500}
//         )
//     } 
// }

