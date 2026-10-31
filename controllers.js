const { User, Video } = require("./models")

// USER

// UPDATE CHANNEL INFORMATION IN USER VIDEOS
const syncUserVideos = async (user) => {
    await Video.updateMany(
        { owner: user._id },
        {
            $set: {
                channelName: user.fullName,
                channelImage: user.image || '/assets/profileImage_default.jpg'
            }
        }
    )
}

const getUser = async (req, res, next) => {
    const data = await User.find()

    res.status(200).json({
        message: `Doing a get request in /streamview/user`,
        data
    })
}

const getUserByID = async (req, res, next) => {
    const { _id } = req.params

    const data = await User.findById({ _id: _id })

    res.status(200).json({
        message: `Searching the user with the ID ${_id}`,
        data
    })
}

const getUserByUsername = async (req, res, next) => {
    const { username } = req.params

    const data = await User.find({ username: username })

    res.status(200).json({
        message: `Doing a get request in /notion for username ${username}`,
        data
    })
}

// const postUser = async (req,res,next)=>{
//     const { email , password , fullName } = req.body

//     const newUser = new User({
//         fullName , email , password
//     })

//     await newUser.save()

//     const data = await User.find()

//     res.status(201).json({
//         message: `Adding the user ${fullName}`,
//         data
//     })
// }

const postUser = async (req, res, next) => {
    try {
        const user = new User(req.body)
        const data = await user.save()

        const userData = data.toObject()
        delete userData.password

        res.status(201).json({ data: userData })
    } catch (err) {
        next(err)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        // if (!user || user.password !== password) {
        //     return res.status(401).json({
        //         message: 'Email o contraseña incorrectos'
        //     })
        // }

        console.log('Email recibido:', JSON.stringify(email))
        console.log('¿Usuario encontrado?', Boolean(user))

        if (user) {
            console.log(
                '¿Coincide la contraseña?',
                user.password === password
            )
        }

        const data = user.toObject()
        delete data.password

        res.status(200).json({ data })
    } catch (err) {
        next(err)
    }
}

// const putUser = async (req, res, next) => {
//     const { _id } = req.params
//     const { username, email, password, fullName, image } = req.body

//     await User.findByIdAndUpdate(_id, { username, email, password, fullName, image })

//     const data = await User.find()

//     res.status(200).json({
//         message: `Updating EVERY SINGLE piece of info of the user ${_id}`,
//         data
//     })
// }

const putUser = async (req, res, next) => {
    try {
        const { _id } = req.params

        const data = await User.findByIdAndUpdate(
            _id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).select('-password')

        if (!data) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            })
        }

        // Actualizar los datos del canal en sus vídeos
        await syncUserVideos(data)

        res.status(200).json({ data })

    } catch (err) {
        next(err)
    }
}

// const patchUser = async ( req, res , next )=>{
//     const {_id} = req.params
//     const {body} = req

//     await User.findByIdAndUpdate(_id , body)
//     const data = await User.find()

//     res.status(200).json({
//         message: `Updating something of the user ${_id}`,
//         data
//     })
// }

// const patchUser = async (req, res, next) => {
//     try {
//         const { _id } = req.params

//         const data = await User.findByIdAndUpdate(
//             _id,
//             req.body,
//             {
//                 new: true,
//                 runValidators: true
//             }
//         ).select('-password')

//         if (!data) {
//             return res.status(404).json({
//                 message: 'Usuario no encontrado'
//             })
//         }

//         res.status(200).json({ data })
//     } catch (err) {
//         next(err)
//     }
// }

const patchUser = async (req, res, next) => {
    try {
        const { _id } = req.params

        const data = await User.findByIdAndUpdate(
            _id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).select('-password')

        if (!data) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            })
        }

        // Actualizar los datos del canal en sus vídeos
        await syncUserVideos(data)

        res.status(200).json({ data })

    } catch (err) {
        next(err)
    }
}

// const deleteUser = async (req, res, next) => {
//     const { _id } = req.params

//     await User.findByIdAndDelete(_id)
//     const data = await User.find()

//     res.status(200).json({
//         message: `Deleting the user with the id ${_id}`,
//         data
//     })
// }

const deleteUser = async (req, res, next) => {
    try {
        const { _id } = req.params

        const data = await User.findByIdAndDelete(_id)

        if (!data) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            })
        }

        res.status(200).json({
            message: 'Usuario eliminado correctamente'
        })

    } catch (err) {
        next(err)
    }
}


// // VIDEO
// const getVideo = async (req, res, next) => {
//     const data = await Video.find()

//     res.status(200).json({
//         message: `Doing a get request in /streamview/video`,
//         data
//     })
// }

// const getVideoByID = async (req, res, next) => {
//     const { _id } = req.params

//     const data = await Video.findById({ _id: _id })

//     res.status(200).json({
//         message: `Searching the user with the ID ${_id}`,
//         data
//     })
// }

// const getVideoByTitle = async (req, res, next) => {
//     const { username } = req.params

//     const data = await Video.find({ username: username })

//     res.status(200).json({
//         message: `Doing a get request in /notion for username ${username}`,
//         data
//     })
// }

// const postVideo = async (req, res, next) => {
//     const { email, password, fullName } = req.body

//     const newUser = new Video({
//         fullName, email, password
//     })

//     await newUser.save()

//     const data = await Video.find()

//     res.status(201).json({
//         message: `Adding the user ${fullName}`,
//         data
//     })
// }

// const putVideo = async (req, res, next) => {
//     const { _id } = req.params
//     const { username, email, password, fullName, image } = req.body

//     await User.findByIdAndUpdate(_id, { username, email, password, fullName, image })

//     const data = await Video.find()

//     res.status(200).json({
//         message: `Updating EVERY SINGLE piece of info of the user ${_id}`,
//         data
//     })
// }

// const patchVideo = async (req, res, next) => {
//     const { _id } = req.params
//     const { body } = req

//     await User.findByIdAndUpdate(_id, body)
//     const data = await Video.find()

//     res.status(200).json({
//         message: `Updating something of the user ${_id}`,
//         data
//     })
// }

// const deleteVideo = async (req, res, next) => {
//     const { _id } = req.params

//     await User.findByIdAndDelete(_id)
//     const data = await Video.find()

//     res.status(200).json({
//         message: `Deleting the user with the id ${_id}`,
//         data
//     })
// }

// VIDEO

// const getVideo = async (req, res, next) => {
//     try {
//         const data = await Video.find()

//         res.status(200).json({
//             message: 'Getting all videos',
//             data
//         })
//     } catch (err) {
//         next(err)
//     }
// }
const getVideo = async (req, res, next) => {
    try {
        const filter = req.query.owner
            ? { owner: req.query.owner }
            : {}

        const data = await Video.find(filter)

        res.status(200).json({
            message: 'Getting videos',
            data
        })
    } catch (err) {
        next(err)
    }
}


const getVideoByID = async (req, res, next) => {
    try {
        const { _id } = req.params

        const data = await Video.findById(_id)

        if (!data) {
            return res.status(404).json({
                message: 'Video not found'
            })
        }

        res.status(200).json({ data })
    } catch (err) {
        next(err)
    }
}


const getVideoByTitle = async (req, res, next) => {
    try {
        const { title } = req.params

        const data = await Video.find({
            title: { $regex: title, $options: 'i' }
        })

        res.status(200).json({ data })
    } catch (err) {
        next(err)
    }
}


// CREATE VIDEO
const postVideo = async (req, res, next) => {
    try {
        const video = new Video(req.body)

        const data = await video.save()

        res.status(201).json({
            message: 'Video uploaded successfully',
            data
        })
    } catch (err) {
        next(err)
    }
}


// REPLACE VIDEO (PUT)
const putVideo = async (req, res, next) => {
    try {
        const { _id } = req.params

        const data = await Video.findByIdAndUpdate(
            _id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if (!data) {
            return res.status(404).json({
                message: 'Video not found'
            })
        }

        res.status(200).json({
            message: 'Video replaced successfully',
            data
        })
    } catch (err) {
        next(err)
    }
}


// UPDATE VIDEO (PATCH)
const patchVideo = async (req, res, next) => {
    try {
        const { _id } = req.params

        const data = await Video.findByIdAndUpdate(
            _id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if (!data) {
            return res.status(404).json({
                message: 'Video not found'
            })
        }

        res.status(200).json({
            message: 'Video updated successfully',
            data
        })
    } catch (err) {
        next(err)
    }
}


// DELETE VIDEO
const deleteVideo = async (req, res, next) => {
    try {
        const { _id } = req.params

        const data = await Video.findByIdAndDelete(_id)

        if (!data) {
            return res.status(404).json({
                message: 'Video not found'
            })
        }

        res.status(200).json({
            message: 'Video deleted successfully'
        })
    } catch (err) {
        next(err)
    }
}


module.exports = {
    getUser,
    getUserByID,
    getUserByUsername,
    postUser,
    putUser,
    patchUser,
    deleteUser,
    getVideo,
    getVideoByID,
    getVideoByTitle,
    postVideo,
    putVideo,
    patchVideo,
    deleteVideo,
    loginUser
}