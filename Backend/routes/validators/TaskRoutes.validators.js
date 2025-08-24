import { check } from "express-validator";

const saveValidator = [
    check('title')
        .notEmpty().withMessage("The Title is Required"),
    check('description')
        .isLength({ max: 150 }).withMessage("The Description should not mbe more than 50 words"),
    check('project_id')
        .notEmpty().withMessage("Project ID not provided"),
    check("deadline")
        .notEmpty().withMessage("deadline Date not provided")
        .isDate({ format : "DD/MM/YYYY", strictMode : true }).withMessage("Not a Valid date")
];

const getvalidator = [
        check('project_id')
            .notEmpty().withMessage("Project Id is not Provided"),
];

const updateValidator = [
    check('description')
        .isLength({ max: 150 }).withMessage("The Description should not mbe more than 50 words"),
        check('task_id')
            .notEmpty().withMessage("Task Id is not Provided"),
        check("deadline")
            .isDate({ format : "DD/MM/YYYY", strictMode : true}).withMessage("Not a Valid date")
];

const deleteValidator = [
        check('task_id')
            .notEmpty().withMessage("Task Id is not Provided"),
];

export default {
    saveValidator,
    getvalidator,
    updateValidator,
    deleteValidator,
}