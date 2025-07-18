export interface INews {
  title: string;
  description: string;
  date: string;
  content: string;
  author: string;
  archiveDate?: string;
}

export interface IFetchError {
  message: string;
  status: number;
}

export interface INewsObject__Database {
  object: {
    _id: string;
  } & INews;
}

export interface INewsObjects__Database {
  objects: ({
    _id: string;
  } & INews)[];
}

export interface INewsUpdate__Database {
  _id: string;
  data: INews;
}

export interface INewsArchive__Database {
  _id: string;
  archiveDate: string;
}
