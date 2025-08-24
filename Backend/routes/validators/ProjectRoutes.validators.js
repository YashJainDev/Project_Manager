import { check } from "express-validator";

const saveValidator = [
    check('title')
        .notEmpty().withMessage("The Title is Required")
        .isLength({ max: 35 }).withMessage("The title should not be more than 20 words"),
    check('description')
        .isLength({ max: 150 }).withMessage("The Description should not mbe more than 50 words"),
];

const getValidator = [];

const getValidatorById = [
    check('project_id')
        .notEmpty().withMessage("Project ID is not Provided"),
];

const updatValidator = [
        check('project_id')
            .notEmpty().withMessage("Id is not Provided"),
];

const deleValidator = [
        check('project_id')
            .notEmpty().withMessage("Id is not Provided"),
];

export default {
    saveValidator,
    getValidator,
    getValidatorById,
    updatValidator,
    deleValidator,
}