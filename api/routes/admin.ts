import { Router } from 'express';
import AdminController from '../controller/admin';
import { checkAuth, checkAdmin } from '../middleware';

const adminController = new AdminController();


const adminRouter = Router();
adminRouter.get('/stories/:id', checkAuth, checkAdmin, adminController.getUserStory);
adminRouter.get('/stories', checkAuth, checkAdmin, adminController.getAllUserStories);
adminRouter.patch('/stories/edit/:id', checkAuth, checkAdmin, adminController.editStory);
adminRouter.patch('/stories/reject/:id', checkAuth, checkAdmin, adminController.rejectStory);
adminRouter.patch('/stories/approve/:id', checkAuth, checkAdmin, adminController.approveStory);


export default adminRouter;
