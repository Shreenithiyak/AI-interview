import express from 'express'
import multer from 'multer'
import {checkdata,sentdata,movedatato, googlelogin, getQuestions, seedQuestions, getCompanies, getRoles} from '../controller/appcontroller.js'
import { transcribeAudio, chatWithAI, generateTTS } from '../controller/interviewController.js'
import { checktoken } from '../middleware/appmiddleware.js'

const route =express.Router()
const upload = multer({ dest: 'uploads/' })

route.post('/sentdata',sentdata)
route.post('/logindata',checkdata)
route.get('/logindata', checktoken,movedatato)
route.post('/googlelogin',googlelogin)
route.get('/questions', getQuestions)
route.get('/companies', getCompanies)
route.get('/roles', getRoles)
route.post('/seed-questions', seedQuestions)

// AI Interview Routes
route.post('/interview/transcribe', checktoken, upload.single('audio'), transcribeAudio)
route.post('/interview/chat', checktoken, chatWithAI)
route.post('/interview/tts', checktoken, generateTTS)


// route.get('/getdatabyid/:id',databyid)
// route.put('/updatedatabyid/:id',updatedatabyid)
// route.get('/deletedatabyid/:id',deletedatabyid)


export default route

//http://localhost:5000/api/user/logindata
//http://localhost:5000/api/user/sentdata
//http://localhost:5000/api/user/getdatabyid/69e5ba7bb9b089d4f1826416
//http://localhost:5000/api/user/updatedatabyid/69e5ba7bb9b089d4f1826416
//http://localhost:5000/api/user/deletedatabyid/69e1fe59488afd2f1f00f176
