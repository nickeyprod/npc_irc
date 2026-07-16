// VACANCY API ROUTES
import express from "express";
import vc from "../../controllers/vacancies_controller.js";
import RequestError from "../../custom_errors/request_error.js";
const router = express.Router();
// GET /api/vacancies - Returns all vacancies
router.get('/vacancies', async (req, res) => {
    try {
        // Process request in Vacancies Controller
        const stringifiedVacancies = await vc.processVacanciesRequest(req);
        return res.send({ vacancies: stringifiedVacancies });
    }
    catch (err) {
        if (err instanceof RequestError) {
            return res.send({ error: err }).status(err.code);
        }
        return res.send({ error: err }).status(500);
    }
});
// GET /api/vacancies/:id - Returns specific vacancy by passed ID
router.get('/vacancies/:id', async (req, res) => {
    try {
        // Process request in Vacancies Controller
        const stringifiedVacancy = await vc.processVacanciesIdRequest(req);
        return res.send({ vacancy: stringifiedVacancy });
    }
    catch (err) {
        if (err instanceof RequestError) {
            return res.send({ error: err }).status(err.code);
        }
        return res.send({ error: err }).status(500);
    }
});
// POST /api/vacancies/create - Create new vacancy with passed attributes
router.post('/vacancies/create', async (req, res) => {
    try {
        // Process request in Vacancies Controller
        const stringifiedNewVacancy = await vc.processVacanciesCreateRequest(req);
        return res.send({
            message: 'OK',
            newVacancy: stringifiedNewVacancy
        });
    }
    catch (err) {
        if (err instanceof RequestError) {
            return res.send({ error: err }).status(err.code);
        }
        return res.send({ error: err }).status(500);
    }
});
// POST /api/vacancies/update - Update specific vacancy with passed id
router.post('/vacancies/update', async (req, res) => {
    try {
        // Process request in Vacancies Controller
        const stringifiedResult = await vc.processVacanciesUpdateRequest(req);
        return res.send({ message: 'OK', newVacancy: stringifiedResult });
    }
    catch (err) {
        if (err instanceof RequestError) {
            return res.send({ error: err }).status(err.code);
        }
        return res.send({ error: err }).status(500);
    }
});
// POST /api/vacancies/remove - Remove specific vacancy by passed ID
router.post('/vacancies/remove', async (req, res) => {
    try {
        // Process request in Vacancies Controller
        const stringifiedResult = await vc.processVacanciesRemoveRequest(req);
        return res.send({ message: 'REMOVED', result: stringifiedResult });
    }
    catch (err) {
        if (err instanceof RequestError) {
            return res.send({ error: err }).status(err.code);
        }
        return res.send({ error: err }).status(500);
    }
});
export default router;
