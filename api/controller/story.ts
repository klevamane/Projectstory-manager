//  Related third party imports
import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';

// User defined
import { StatusEnum, ComplexityEnum, LabelEnum } from '../util';
import Story from '../orm/entity/Story';
import { HttpException, PermissionDenied } from '../middleware/httpError';

async function singleStoryWithPermission(id: number, permission: boolean, response: Response<unknown>) {
  const story = await Story.createQueryBuilder('story')
    .leftJoin('story.user', 'user')
    .addSelect(['user.id', 'user.email'])
    .where('story.id =:id', { id })
    .andWhere('story.isActive = :isActive', { isActive: true })
    .getOne();
  if (!story)
    throw new HttpException(404, 'Story not found');
  if (permission && story !== undefined && story.user.id !== response.locals.userData.userId)
    throw new PermissionDenied();
  return story;
}

export default class StoryController {
  public createStory = async (request: Request, response: Response) => {
    const story = new Story();
    story.complexity = ComplexityEnum[request.body.complexity];
    story.cost = request.body.cost;
    story.description = request.body.description;
    story.hours = request.body.hours;
    story.label = LabelEnum[request.body.label];
    story.summary = request.body.summary;
    const errors = await validate(story, { validationError: { target: false, value: false } });
    if (errors.length > 0) return response.status(400).json({ errors });
    story.user = response.locals.userData.userId;
    try {
      const newStory = await story.save();
      delete newStory.user;
      response.status(201).json({ newStory });
    } catch (error) {
      return response.status(400).json(error);
    }
  };

  public getUserStories = async (request: Request, response: Response): Promise<Response> => {
    const stories = await Story.find({ where: { user: response.locals.userData.userId, isActive: true }, relations: ['user'] });
    return response.json({ result: stories });
  };

  public getUserStory = async (request: Request, response: Response, next: NextFunction) => {
    // TODO validate query parameter
    const id = Number(request.params.id);
    try {
    const story = await singleStoryWithPermission(id, true, response);
    return response.json({ status: 'success', story });
  } catch(error) {
    next(error)
  };
  }

  public assignToAdmin = async (request: Request, response: Response, next: NextFunction) => {
    // Todo validate query parameter
    // TODO check that the story is opened
    const id = Number(request.params.id);
    try {
    const story = await singleStoryWithPermission(id, true, response);

    if (story.status !== StatusEnum.OPEN) return response.status(400).json({ status: 'failed', msg: 'story already assigned to admin' });
    story.status = StatusEnum.PENDING;
    story.save();
    return response.status(403).json({ status: 'success', msg: 'story assigned to admin' });
  } catch(error) {
    next(error)
  };
  }
}


