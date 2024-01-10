import express, { Request, Response } from "express";
export const app = express();

app.use(express.json());

export enum Status {
  Ok_200 = 200,
  Created_201 = 201,
  NoContent_204 = 204,
  BadRequest_400 = 400,
  NotFound_404 = 404,
}

type DB = {
  videos: VideoType[];
};

export type VideoType = {
  id: number;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: number | null;
  createdAt: string;
  publicationDate: string;
  availableResolutions: AvailableResolutions;
};

type AvailableResolutions = (
  | "P144"
  | "P240"
  | "P360"
  | "P480"
  | "P720"
  | "P1080"
  | "P1440"
  | "P2160"
)[];

const resolutions: AvailableResolutions = [
  "P144",
  "P240",
  "P360",
  "P480",
  "P720",
  "P1080",
  "P1440",
  "P2160",
];

type RequestWithParams<P> = Request<P>;
type Params = {
  id: string;
};

type RequestWithBody<B> = Request<any, any, B>;
type RequestWithBodyAndParams<P, B> = Request<P, any, B>;

export type CreateVideoType = {
  title: string;
  author: string;
  availableResolutions: AvailableResolutions;
};

export type UpdateVideoType = {
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: number | null;
  publicationDate: string;
  availableResolutions: AvailableResolutions;
};

const db: DB = {
  videos: [
    {
      id: 0,
      title: "string",
      author: "string",
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: "2024-01-09T12:12:25.111Z",
      publicationDate: "2024-01-09T12:12:25.111Z",
      availableResolutions: ["P144"],
    },
  ],
};

type ErrorMessageType = {
  message: string;
  field: string;
};

type ErrorType = {
  errorsMessages: ErrorMessageType[];
};

app.get("/videos", (req: Request, res) => {
  res.status(Status.Ok_200).json(db.videos);
});

app.get(
  "/videos/:id",
  (req: RequestWithParams<Params>, res: Response<VideoType>) => {
    debugger;
    const video = db.videos.find((video) => video.id === +req.params.id);
    if (video) {
      res.status(Status.Ok_200).json(video);
    } else {
      res.sendStatus(Status.NotFound_404);
    }
  }
);

app.post(
  "/videos",
  (
    req: RequestWithBody<CreateVideoType>,
    res: Response<VideoType | ErrorType>
  ) => {
    let { title, author, availableResolutions } = req.body;

    let error: ErrorType = {
      errorsMessages: [],
    };

    if (typeof title !== "string" || title.length > 40) {
      error.errorsMessages.push({
        message: "Incorrect title",
        field: "title",
      });
    }

    if (typeof author !== "string" || author.length > 20) {
      error.errorsMessages.push({
        message: "Incorrect author",
        field: "author",
      });
    }

    if (Array.isArray(availableResolutions)) {
      availableResolutions.forEach((availableResolution) => {
        if (!resolutions.includes(availableResolution)) {
          error.errorsMessages.push({
            message: "Incorrect availableResolutions",
            field: "availableResolutions",
          });
          return;
        }
      });
    } else {
      availableResolutions = [];
    }

    if (error.errorsMessages.length > 0) {
      res.status(Status.BadRequest_400).json(error);
      return;
    }

    const id = new Date().getTime();
    const createdAt = new Date().toISOString();
    const publicationDate = new Date().toISOString();

    const video = {
      id,
      title,
      author,
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt,
      publicationDate,
      availableResolutions,
    };
    db.videos.push(video);
    res.status(Status.Created_201).json(video);
  }
);

app.put(
  "/videos/:id",
  (req: RequestWithBodyAndParams<Params, UpdateVideoType>, res) => {
    let existingVideo = db.videos.find((video) => video.id === +req.params.id);

    if (!existingVideo) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    let {
      title,
      author,
      availableResolutions,
      canBeDownloaded,
      minAgeRestriction,
      publicationDate,
    } = req.body;

    let error: ErrorType = {
      errorsMessages: [],
    };

    if (typeof title !== "string" || title.length > 40) {
      error.errorsMessages.push({
        message: "Incorrect title",
        field: "title",
      });
    }

    if (typeof author !== "string" || author.length > 20) {
      error.errorsMessages.push({
        message: "Incorrect author",
        field: "author",
      });
    }

    if (Array.isArray(availableResolutions)) {
      availableResolutions.forEach((availableResolution) => {
        if (!resolutions.includes(availableResolution)) {
          error.errorsMessages.push({
            message: "Incorrect availableResolution",
            field: "availableResolution",
          });
          return;
        }
      });
    } else {
      availableResolutions = [];
    }

    if (
      typeof minAgeRestriction !== "number" &&
      minAgeRestriction !== null &&
      !(minAgeRestriction <= 1) &&
      !(minAgeRestriction >= 18)
    ) {
      error.errorsMessages.push({
        message: "Incorrect minAgeRestriction",
        field: "minAgeRestriction",
      });
    }

    if (typeof canBeDownloaded !== "boolean") {
      error.errorsMessages.push({
        message: "Incorrect canBeDownloaded",
        field: "canBeDownloaded",
      });
    }

    if (typeof publicationDate !== "string") {
      error.errorsMessages.push({
        message: "Incorrect publicationDate",
        field: "publicationDate",
      });
    }

    if (error.errorsMessages.length > 0) {
      res.status(Status.BadRequest_400).json(error);
      return;
    }

    const updatedVideoData: UpdateVideoType = {
      title,
      author,
      availableResolutions,
      canBeDownloaded,
      minAgeRestriction,
      publicationDate,
    };

    db.videos = db.videos.map((video) =>
      video.id === +req.params.id ? { ...video, ...updatedVideoData } : video
    );

    res.sendStatus(Status.NoContent_204);
  }
);

app.delete("/videos/:id", (req, res) => {
  let existingVideo = db.videos.find((video) => video.id === +req.params.id);

  if (!existingVideo) {
    res.sendStatus(Status.NotFound_404);
    return;
  }

  db.videos = db.videos.filter((video) => video.id !== +req.params.id);
  db.videos.length = 0;
  res.sendStatus(Status.NoContent_204);
});

app.delete("/testing/all-data", (req, res) => {
  db.videos.length = 0;
  res.sendStatus(Status.NoContent_204);
});
