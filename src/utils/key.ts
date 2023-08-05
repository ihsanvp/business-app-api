export async function generateActivationKey(customer: string, secret: string): Promise<string> {
    const data = secret + customer + crypto.randomUUID()
    const algorithm = { name: "SHA-512" }
    const encoder = new TextEncoder()
    const dataBuffer = encoder.encode(data)

    const hashBuffer = await crypto.subtle.digest(algorithm, dataBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hasHex = hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("")

    const key = hasHex
        .slice(0, 16)
        .toUpperCase()
        .replace(/(.{4})/g, '$1-')
        .slice(0, -1);

    return key
    // return new Promise((resolve) => {

    //     const salt = secret + customer + randomBytes(32).toString("hex")
    //     const hash = createHash("sha512").update(salt).digest("hex")
    //     const key = hash
    //         .slice(0, 16)
    //         .toUpperCase()
    //         .replace(/(.{4})/g, '$1-')
    //         .slice(0, -1);

    //     resolve(key)
    // })
}