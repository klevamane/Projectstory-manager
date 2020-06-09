import { Request, Response } from 'express';
import { StatusEnum } from '../util';


import Story from '../orm/entity/Story';

class AdminController {
  public getAllUserStories = async (request: Request, response: Response): Promise<Response> => {
    const stories = await Story.createQueryBuilder('story')
      .leftJoin('story.user', 'user')
      .addSelect(['user.id', 'user.email'])
      .getMany();
    return response.json({ result: stories });
  };

  public getUserStory = async (request: Request, response: Response): Promise<Response> => {
    const story = await Story.createQueryBuilder('story')
      .leftJoin('story.user', 'user')
      .addSelect(['user.id', 'user.email'])
      .where('story.id =:id', { id: request.params.id })
      .getOne();
    if (!story) return response.status(404).json({ status: 'failed', msg: 'story not found' });
    if (story.user.id !== response.locals.userData.userId) {
      return response.status(403).json({ status: 'failed', msg: 'permission denied' });
    }
    return response.json({ status: 'success', story });
  }

  public approveStory = async (request: Request, response: Response) => {
    const story: any = await Story.findOne(request.params.id);
    if (story.status === StatusEnum.APPROVED) {
      return response
        .status(400)
        .json({ status: 'failed', msg: 'already approved' });
    }
    story.status = StatusEnum.APPROVED;
    story.isActive = true;
    story.save();
    response.status(200).send();
  }

  public rejectStory = async (request: Request, response: Response) => {
    const story: any = await Story.findOne(request.params.id);
    story.status = StatusEnum.REJECTED;
    story.isActive = false;
    story.save();
    response.status(200).send();
  }

  public editStory = async (request: Request, response: Response): Promise<Response> => {
    // Todo validate request body
    // cannot edit data if status is not opened
    const unEditableFields = ['status', 'id', 'isActive'];
    const updateDetails = request.body;
    Object.keys(updateDetails).forEach((key: string) => {
      if (unEditableFields.includes(key)) delete updateDetails[key];
    });
    const story = await Story.createQueryBuilder('story')
      .leftJoin('story.user', 'user')
      .addSelect(['user.id', 'user.email'])
      .where('story.id =:id', { id: request.params.id })
      .getOne();
    if (!story) return response.status(404).json({ status: 'failed', msg: 'story not found' });
    Story.merge(story, updateDetails).save();
    return response.json({ story });
  }
}
export default AdminController;
