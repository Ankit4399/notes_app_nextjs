import {prisma} from '@/lib/db'
import {NextRequest, NextResponse} from 'next/server'

//get a note
export async function GET(req : NextRequest,ctx : {params : Promise<{id : string}>}){
    try {
        const {id} = await ctx.params;
        const note = await prisma.note.findFirst({
            where : {id}
        })
        return NextResponse.json(
            {success : true, data : note},
            {status : 200}
        )
    } catch (error) {
        return NextResponse.json(
            {success: false,message : error},
            {status : 500}
        )
    }
}

export async function PUT(req: NextRequest,ctx : {params : Promise<{id :string}>}){
    try {
        const {id} = await ctx.params;
        const body = await req.json();
        const updatedNote = await prisma.note.update({
            where : {id},
            data : {
                title : body.title,
                content: body.content,
                category : body.category
            }
        })
        return NextResponse.json(
            {success: true, data : updatedNote},
            {status : 200}
        )
    }catch (error) {
        return NextResponse.json(
            {success: false,message : error},
            {status : 500}
        )
    }
}

export async function DELETE(req: NextRequest,ctx : {params : Promise<{id :string}>}){
    const {id} = await ctx.params;

    await prisma.note.delete({where : {id}});

    return NextResponse.json({
    message: 'Deleted',
  })
}