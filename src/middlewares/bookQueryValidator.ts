import {query, validationResult} from "express-validator";
import {Request, Response, NextFunction} from "express";
import {DATE_PATTERN} from "./validationConstants";

export const validateBookQueryParams = [
    query("title").optional().isString().trim().isLength({min: 1}).withMessage("Title must be a non-empty string"),
    query("author").optional().isString().trim().isLength({min: 1}).withMessage("Author must be a non-empty string"),
    query("genre").optional().isString().trim().isLength({min: 1}).withMessage("Genre must be a non-empty string"),
    query("publishedFrom")
        .optional()
        .matches(DATE_PATTERN)
        .toDate()
        .withMessage("publishedFrom must be a valid date in YYYY-MM-DD format"),
    query("publishedTo")
        .optional()
        .matches(DATE_PATTERN)
        .toDate()
        .withMessage("publishedTo must be a valid date in YYYY-MM-DD format"),
    query("page").optional().isInt({min: 1}).toInt().withMessage("Page must be an integer greater than 0"),
    query("limit").optional().isInt({
        min: 1,
        max: 1000
    }).toInt().withMessage("Limit must be between 1 and 1000"),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    },
];


