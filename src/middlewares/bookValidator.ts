import {body, validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";

export const validateBook = [
    body("title")
        .trim()
        .notEmpty().withMessage("Title is required")
        .isLength({max: 50}).withMessage("Title must be at most 50 characters"),

    body("author")
        .trim()
        .notEmpty().withMessage("Author is required")
        .isLength({max: 50}).withMessage("Author must be at most 50 characters"),

    body("publishedDate")
        .notEmpty().withMessage("Published date is required")
        .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("Published date must be in YYYY-MM-DD format"),

    body("genre")
        .trim()
        .notEmpty().withMessage("Genre is required")
        .isLength({max: 20}).withMessage("Genre must be at most 20 characters"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next({
                status: 400,
                message: "Validation error",
                errors: errors.array()
            });
        }
        next();
    },
];
