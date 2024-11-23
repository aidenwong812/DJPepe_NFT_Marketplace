async function getIpfsJwt(): Promise<string | undefined> {
  try {
    const res = await fetch('/api/ipfs/generate-jwt')
    const data = await res.json()
    if (!res.ok) throw Error(data?.message ?? res.statusText)

    return data.JWT as string
  } catch (error) {
    console.error(error)
    return undefined
  }
}

export default getIpfsJwt
