import express from 'express'
import { uploadVideo, getAllVideos } from '../Controllers/uploadVideo.js';
import { likeController } from '../Controllers/like.js';
import { viewController } from '../Controllers/view.js';
import { likeVideoController, getAllLikeVideoController, deleteLikeVideoController } from '../Controllers/likeVideo.js'
import {watchLaterController,getAllwatchLaterController,deletewatchLaterController } from '../Controllers/watchLater.js'
import { HistoryController, getAllHistoryController, deleteHistoryController } from '../Controllers/History.js'
import upload from '../Helpers/fileHelpers.js';
import auth from '../middleware/auth.js'

const routes = express.Router();

routes.get("/getvideos", getAllVideos);
routes.post("/uploadVideo",auth, upload.single("file"), uploadVideo);
routes.patch("/like/:id",auth, likeController);
routes.patch("/view/:id", viewController);

routes.post("/likeVideo",auth, likeVideoController)
routes.get("/getAllLikeVideo", getAllLikeVideoController)
routes.delete("/deleteLikeVideo/:videoId/:Viewer",auth, deleteLikeVideoController)

routes.post('/watchLater',auth,watchLaterController)
routes.get('/getAllwatchLater',getAllwatchLaterController)
routes.delete('/deleteWatchlater/:videoId/:Viewer',auth,deletewatchLaterController)

routes.post("/History",auth, HistoryController)
routes.get("/getAllHistory", getAllHistoryController)
routes.delete("/deleteHistory/:userId",auth, deleteHistoryController)

export default routes   