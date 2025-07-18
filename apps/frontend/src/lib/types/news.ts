export interface INews {
  title: string;
  description?: string;
  date: string;
  content: string;
  author: string;
  archiveDate?: Date;
}

export interface INewsSingular__Database {
  object: {
    _id: string;
  } & INews;
}

export interface INews__Database {
  objects: ({
    _id: string;
  } & INews)[];
}
