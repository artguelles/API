const express = require('express')
const { 
    getUser, getUserByID, getUserByUsername, postUser, putUser, patchUser, deleteUser, 
    getVideo, postVideo, getVideoByID, putVideo, patchVideo, deleteVideo, getVideoByTitle, loginUser 
} = require('./controllers')

// Importamos los middlewares (Asegúrate de que la ruta al archivo sea correcta, por ejemplo './middlewares')
const { 
    validarObjectId, 
    validarUsuarioPost, 
    validarUsuarioPatch 
} = require('./middlewares')

const router = express.Router()

    router.route('/user')
        .get(getUser)
        .post(validarUsuarioPost, postUser)
        
    router.post('/user/login', loginUser)

    router.route('/video')
        .get(getVideo)
        .post(postVideo)

    router

    router.route('/user/:_id')
        .get(validarObjectId, getUserByID)
        .put(validarObjectId, validarUsuarioPatch, putUser)
        .patch(validarObjectId, validarUsuarioPatch, patchUser) 
        .delete(validarObjectId, deleteUser) 

    router.route('/video/:_id')
        .get(validarObjectId, getVideoByID)
        .put(validarObjectId, putVideo)
        .patch(validarObjectId, patchVideo)
        .delete(validarObjectId, deleteVideo)


    // Añadida la subruta /username/ y /title/ para evitar que Express los confunda con :_id
    router.route('/user/username/:username')
        .get(getUserByUsername)
    
    router.route('/video/title/:title')
        .get(getVideoByTitle)
    
    // router.route('/video/category/:category')
    //     .get()

    // POST /api/videos/:id/like

    // POST /api/videos/:id/unlike

    // POST /api/users/:id/subscribe

    // POST /api/users/:id/unsubscribe

    // GET /api/users/:id/likedVideos

    // GET /api/users/:id/subscriptions    


module.exports = {
    router
}