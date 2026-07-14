// --- CANDIDATE API ROUTES ---
import express from "express";
import Candidate from "../../models/Candidate.js";
const router = express.Router();
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
export default router;
