// API ROUTES
import express from "express";
import Candidate from "../models/Candidate.js";
import Vacancy from "../models/Vacancy.js";
const router = express.Router();
// --- VACANCIES API ROUTES ---
// GET /api/vacancies - Returns all vacancies
router.get('/vacancies', async (req, res) => {
    try {
        // Find all vacancies within RAW SQL QUERY
        const vacancies = await Vacancy.getAll();
        const stringifiedVacancies = JSON.stringify(vacancies);
        return res.send({ vacancies: stringifiedVacancies });
    }
    catch (err) {
        return res.send({ error: err }).status(500);
    }
});
// GET /api/vacancies/:id - Returns specific vacancy by passed ID
router.get('/vacancies/:id', async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ error: 'Missing required URL parameter "id"' });
        }
        const vacancyID = +req.params.id;
        // Get specific vacancy by its ID within RAW SQL QUERY
        const vacancy = await Vacancy.getByID(vacancyID);
        if (vacancy.length == 0) {
            return res.send({ candidate: "Vacancy with provided ID not found" });
        }
        const stringifiedVacancy = JSON.stringify(vacancy[0]);
        return res.send({ vacancy: stringifiedVacancy });
    }
    catch (err) {
        return res.send({ error: err }).status(500);
    }
});
// POST /api/vacancies/create - Create new vacancy with passed attributes
router.post('/vacancies/create', async (req, res) => {
    try {
        const { is_opened, name, salary } = req.body.data;
        if (!is_opened) {
            return res.status(400).json({ error: 'Missing required property "is_opened"' });
        }
        else if (!name) {
            return res.status(400).json({ error: 'Missing required property "name"' });
        }
        else if (!salary) {
            return res.status(400).json({ error: 'Missing required property "salary"' });
        }
        // Create new vacancy with passed attributes within RAW SQL QUERY
        const newVacancy = await Vacancy.createNew(is_opened, name, salary, new Date());
        const stringifiedNewVacancy = JSON.stringify(newVacancy);
        return res.send({
            message: 'OK',
            newVacancy: stringifiedNewVacancy
        });
    }
    catch (err) {
        return res.send({ error: err }).status(500);
    }
});
// POST /api/vacancies/update - Update specific vacancy with passed id
router.post('/vacancies/update', async (req, res) => {
    try {
        const { id, is_opened, name, salary, opened_at, closed_at } = req.body.data;
        if (!id) {
            return res.status(400).json({ error: 'Missing required body parameter "ID"' });
        }
        // Update attributes of the vacancy within RAW SQL QUERY
        const result = await Vacancy.updateSpecific(id, is_opened, name, salary, opened_at, closed_at);
        const stringifiedResult = JSON.stringify(result);
        return res.send({
            message: 'OK',
            newVacancy: stringifiedResult
        });
    }
    catch (err) {
        return res.send({ error: err }).status(500);
    }
});
// POST /api/vacancies/remove - Remove specific vacancy by passed ID
router.post('/vacancies/remove', async (req, res) => {
    try {
        const { id } = req.body.data;
        if (!id) {
            return res.status(400).json({ error: 'Missing required body parameter "ID"' });
        }
        // Remove specific vacancy by passed ID within RAW SQL QUERY
        const result = await Vacancy.removeByID(id);
        const stringifiedResult = JSON.stringify(result);
        return res.send({
            message: 'REMOVED',
            newVacancy: stringifiedResult
        });
    }
    catch (err) {
        return res.send({ error: err }).status(500);
    }
});
// --- END VACANCIES API ROUTES ---
// ************************************
// --- CANDIDATES API ROUTES ---
// GET /api/candidates - Returns all candidates
router.get('/candidates', async (req, res) => {
    try {
        // Find all candidates within RAW SQL QUERY
        const candidates = await Candidate.getAll();
        const stringifiedCandidates = JSON.stringify(candidates);
        return res.send({ candidates: stringifiedCandidates });
    }
    catch (err) {
        return res.send({ error: err }).status(500);
    }
});
// GET /api/candidates/:id - Returns specific candidate by passed ID
router.get('/candidates/:id', async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ error: 'Missing required URL parameter "id"' });
        }
        const candidateID = +req.params.id;
        // Get specific candidate by its ID within RAW SQL QUERY
        const candidate = await Candidate.getByID(candidateID);
        if (candidate.length == 0) {
            return res.send({ candidate: "Candidate with provided ID not found" });
        }
        const stringifiedCandidate = JSON.stringify(candidate[0]);
        return res.send({ candidate: stringifiedCandidate });
    }
    catch (err) {
        return res.send({ error: err }).status(500);
    }
});
// POST /api/candidates/create - Create new candidate with passed attributes
router.post('/candidates/create', async (req, res) => {
    try {
        const { for_vacancy_id, first_name, last_name, surname, interview_date, requested_salary, exp_in_full_years } = req.body.data;
        if (!for_vacancy_id) {
            return res.status(400).json({ error: 'Missing required property "for_vacancy_id"' });
        }
        else if (!first_name) {
            return res.status(400).json({ error: 'Missing required property "first_name"' });
        }
        else if (!last_name) {
            return res.status(400).json({ error: 'Missing required property "last_name"' });
        }
        else if (!surname) {
            return res.status(400).json({ error: 'Missing required property "surname"' });
        }
        else if (!interview_date) {
            return res.status(400).json({ error: 'Missing required property "interview_date"' });
        }
        else if (!requested_salary) {
            return res.status(400).json({ error: 'Missing required property "requested_salary"' });
        }
        else if (!exp_in_full_years) {
            return res.status(400).json({ error: 'Missing required property "exp_in_full_years"' });
        }
        // Create new candidate with passed attributes within RAW SQL QUERY
        const newCandidate = await Candidate.createNew(for_vacancy_id, first_name, last_name, surname, interview_date, requested_salary, exp_in_full_years);
        const stringifiedNewCandidate = JSON.stringify(newCandidate);
        return res.send({
            message: 'OK',
            newCandidate: stringifiedNewCandidate
        });
    }
    catch (err) {
        return res.send({ error: err }).status(500);
    }
});
// POST /api/candidates/update - Update specific candidate with passed ID
router.post('/candidates/update', async (req, res) => {
    try {
        const { id, for_vacancy_id, first_name, last_name, surname, interview_date, requested_salary, exp_in_full_years } = req.body.data;
        if (!id) {
            return res.status(400).json({ error: 'Missing required body parameter "ID"' });
        }
        // Update attributes of the candidate within RAW SQL QUERY
        const result = await Candidate.updateSpecific(id, for_vacancy_id, first_name, last_name, surname, interview_date, requested_salary, exp_in_full_years);
        const stringifiedResult = JSON.stringify(result);
        return res.send({
            message: 'OK',
            newVacancy: stringifiedResult
        });
    }
    catch (err) {
        return res.send({ error: err }).status(500);
    }
});
// POST /api/candidates/remove - Remove specific candidate by passed ID
router.post('/candidates/remove', async (req, res) => {
    try {
        const { id } = req.body.data;
        if (!id) {
            return res.status(400).json({ error: 'Missing required body parameter "ID"' });
        }
        // Remove specific candidate by passed ID within RAW SQL QUERY
        const result = await Candidate.removeByID(id);
        const stringifiedResult = JSON.stringify(result);
        return res.send({
            message: 'REMOVED',
            newVacancy: stringifiedResult
        });
    }
    catch (err) {
        return res.send({ error: err }).status(500);
    }
});
// --- END CANDIDATES API ROUTES ---
// ************************************
export default router;
