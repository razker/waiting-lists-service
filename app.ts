import * as bodyParser from "body-parser";
const path = require("path");
import * as express from "express";
import { APILogger } from "./logger/api.logger";
import swaggerUi = require("swagger-ui-express");
import fs = require("fs");
import { EventController } from "./controller/event.controller";
import { WaitingListController } from "./controller/waitingList.controller";

class App {
  public express: express.Application;
  public logger: APILogger;
  public eventController: EventController;
  public waitingListController: WaitingListController;

  /* Swagger files start */
  // private swaggerFile: any = (process.cwd()+"/swagger/swagger.json");
  // private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
  // private customCss: any = fs.readFileSync((process.cwd()+"/swagger/swagger.css"), 'utf8');
  // private swaggerDocument = JSON.parse(this.swaggerData);
  /* Swagger files end */

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.logger = new APILogger();
    this.eventController = new EventController();
    this.waitingListController = new WaitingListController();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(express.static(path.join(__dirname, "../ui/build")));
  }

  private routes(): void {
    this.express.get("/api/events", async (req, res) => {
      this.logger.info("GET /api/events ");

      try {
        //TODO: fix any type
        const response: any = await this.eventController.getEvents();
        res.json(response);
      } catch (error) {
        this.logger.error(error);
        res.status(500).json(error);
      }
    });

    this.express.post("/api/event", async (req, res) => {
      try {
        this.logger.info("POST /api/event | body: ", req.body);
        //TODO: fix any type
        const response: any = await this.eventController.createEvent(req.body);
        if (response?.error) {
          res.status(409).json(response?.error);
        } else {
          res.json(response);
        }
      } catch (error) {
        this.logger.error(error);
        res.status(500).json(error);
      }
    });

    this.express.get("/api/waiting-list/:eventId", async (req, res) => {
      try {
        this.logger.info(`GET /api/waitng-list/${req.params.eventId}`);
        //TODO: fix any type
        const response: any = await this.waitingListController.getWaitingList(
          req.params.eventId
        );
        if (response?.error) {
          res.status(404).json(response?.error);
        } else {
          res.json(response);
        }
      } catch (error) {
        this.logger.error(error);
        res.status(500).json(error);
      }
    });

    this.express.post("/api/waiting-list/:eventId", async (req, res) => {
      try {
        this.logger.info(`POST /api/waitng-list/${req.params.eventId}`);
        //TODO: fix any type
        const response: any =
          await this.waitingListController.createWaitingListNode({
            ...req.body,
            eventId: req.params.eventId,
          });
        if (response?.error) {
          res.status(500).json(response?.error);
        } else {
          res.json(response);
        }
      } catch (error) {
        this.logger.error(error);
        res.status(500).json(error);
      }
    });

    this.express.put("/api/waiting-list/:id", async (req, res) => {
      this.logger.info("PUT /api/waiting-list/:id | body: ", req.body);
      try {
        //TODO: fix any type
        const response: any =
          await this.waitingListController.updateWaitingListNode(
            req.params.id,
            req.body
          );
        if (response?.error) {
          res.status(500).json(response?.error);
        } else {
          res.json(response);
        }
      } catch (error) {
        this.logger.error(error);
        res.status(500).json(error);
      }
    });

    // swagger docs
    //this.express.use('/api/docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocument, null, null, this.customCss));

    // handle undefined routes
    this.express.use("*", (req, res, next) => {
      res.status(404).send("Make sure url is correct!!!");
    });
  }
}

export default new App().express;
