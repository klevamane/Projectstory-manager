export class HttpException extends Error {
    status: number;
    message: string;
    constructor(status: number, message: string) {
      super(message);
      this.status = status;
      this.message = message;
    }
  }

export class StoryNotFoundException extends HttpException {
    constructor(id: string) {
    super(404, `Story ${id} not found`);
    }
}

export class PermissionDenied extends HttpException {
    constructor() {
    super(403, `Permission denied`);
    }
}
