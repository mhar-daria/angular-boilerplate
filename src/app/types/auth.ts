export type hashedPasswordType = {
    tkid: string
    hashed: string
}

export type LoginInputType = {
    tkid: string
    password: string
    username: string
}

export type LoginOutputType = {
    message: string
    token: string
    expiration: string
    tokenType: string
}
