import {body, validationResult} from "express-validator";
import {Request, Response, NextFunction} from "express";

// Middleware for validating user registration
export const validateUserRegistration = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isLength({min: 3})
        .withMessage("Username must be at least 3 characters"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({min: 6})
        //TODO: validate pattern as well
        .withMessage("Password must be at least 6 characters"),
    (req: Request, res: Response, next: NextFunction) => {
        console.log("Incoming req body", req.body);
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
