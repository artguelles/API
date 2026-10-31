// GET/PUT/PATCH/DELETE
const validarObjectId = (req, res, next) => {
    const { _id } = req.params

    if (!/^[a-fA-F0-9]{24}$/.test(_id)) {
        return res.status(400).json({
            error: 'El _id debe ser un ObjectId válido (24 caracteres hexadecimales)'
        })
    }

    next()
}

// POST USER
const validarUsuarioPost = (req, res, next) => {
    const { fullName, email, password } = req.body

    if (!fullName || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(fullName)) {
        return res.status(400).json({
            error: 'El nombre completo es obligatorio y debe contener solo letras'
        })
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({
            error: 'Debe proporcionar un email válido'
        })
    }

    if (!password || password.length < 6) {
        return res.status(400).json({
            error: 'La contraseña es obligatoria y debe tener al menos 6 caracteres'
        })
    }

    next()
}

// PATCH USER
const validarUsuarioPatch = (req, res, next) => {
    const { fullName, email, password, image } = req.body

    // validar fullName (solo si viene)
    if (fullName !== undefined) {
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(fullName)) {
            return res.status(400).json({
                error: 'El nombre completo debe contener solo letras'
            })
        }
    }

    // validar email (solo si viene)
    if (email !== undefined) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: 'Debe proporcionar un email válido'
            })
        }
    }

    // validar password (solo si viene)
    if (password !== undefined) {
        if (password.length < 6) {
            return res.status(400).json({
                error: 'La contraseña debe tener al menos 6 caracteres'
            })
        }
    }

    // validar image (solo si viene)
    if (image !== undefined) {
        if (typeof image !== 'string' || !image.startsWith('http')) {
            return res.status(400).json({
                error: 'La imagen debe ser una URL válida'
            })
        }
    }

    next()
}

// 404 - Endpoint no encontrado
const middleware404 = (req, res, next) => { 
    const error = new Error(`The endpoint you're searching for doesn't exist`)
    error.status = 404 
    next(error)
}

// 500 - Manejo de errores globales
const middleware500 = (error, req, res, next) => {
    let status = error.status || 500
    res.status(status).json({
        message: error.message,
        data: null
    })
}

module.exports = {
    validarObjectId,
    validarUsuarioPost,
    validarUsuarioPatch,
    middleware404,
    middleware500
}