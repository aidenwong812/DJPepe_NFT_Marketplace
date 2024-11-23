import generatePinataJWT from '@/lib/ipfs/generatePinataJWT'

export async function GET() {
  try {
    const data = await generatePinataJWT()
    return Response.json(data)
  } catch (error) {
    console.error(error)
    const message = error instanceof Error ? error.message : 'failed to generate JWT';
    return Response.json({ message }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 0
