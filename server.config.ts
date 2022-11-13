import * as cors from "cors";

import CORS_WHITELIST from "./constants/frontend";

export const corsOption = {
  origin: (origin, callback) =>
    CORS_WHITELIST.indexOf(origin) !== -1
      ? callback(null, true)
      : callback(new Error("Not allowed by CORS")),
};
