import bcrypt from 'bcrypt'


const EncryptPassword = async (password) => {
    try {

        const saltRounds = 10

        const hashedPassword = await bcrypt.hash(password, saltRounds)
        // console.log("test", hashedPassword)
        return hashedPassword



    } catch (error) {
        console.log("Error in password Encryption", error)

    }
}


export { EncryptPassword }