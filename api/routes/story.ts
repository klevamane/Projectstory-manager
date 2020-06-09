
// Node package
import { Router } from 'express';

// User defined
import StoryController from '../controller/story';
import { checkAuth } from '../middleware';

const storyController = new StoryController();
const storyRouter = Router();
storyRouter.post('/create', checkAuth, storyController.createStory);
storyRouter.get('/all', checkAuth, storyController.getUserStories);
storyRouter.get('/:id', checkAuth, storyController.getUserStory);
// storyRouter.patch('/assign/:id', checkAuth, storyController.assignToAdmin);

export default storyRouter;
