// import express from "express";
// import { param } from "express-validator";
// import RestaurantController from "../controllers/RestaurantController";

// const router = express.Router();

// router.get("/:restaurantId",  )
//     param("restaurantId")
//     .isString()
//     .trim()
//     .notEmpty()
//     .withMessage("restaurantId parameter must be a valid string"),
//     RestaurantController.getRestaurant

// router.get("/search/:city", 
//     param("city")
//     .isString()
//     .trim()
//     .notEmpty()
//     .withMessage("City parameter must be a valid string"),
//     RestaurantController.searchRestaurant
// );

// export default router;

import express from "express";
import { param, validationResult } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = express.Router();

// Middleware to handle validation errors
const validate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get(
    "/:restaurantId",
    param("restaurantId")
        .isString()
        .trim()
        .notEmpty()
        .withMessage("restaurantId parameter must be a valid string"),
    validate,
    RestaurantController.getRestaurant
);

router.get(
    "/search/:city",
    param("city")
        .isString()
        .trim()
        .notEmpty()
        .withMessage("City parameter must be a valid string"),
    validate,
    RestaurantController.searchRestaurant
);

export default router;
