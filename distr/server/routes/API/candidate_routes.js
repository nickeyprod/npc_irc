// --- CANDIDATE API ROUTES ---
import express from "express";
import cc from "../../controllers/candidates_controller.js";
import RequestError from "../../custom_errors/request_error.js";
const router = express.Router();
// GET /api/candidates - Returns all candidates
router.get('/candidates', async (req, res) => {
    try {
        // Process request in Candidates Controller
        const stringifiedCandidates = await cc.processCandidatesRequest(req);
        return res.send({ candidates: stringifiedCandidates });
    }
    catch (err) {
        if (err instanceof RequestError) {
            return res.send({ error: err }).status(err.code);
        }
        return res.send({ error: err }).status(500);
    }
});
// GET /api/candidates/:id - Returns specific candidate by passed ID
router.get('/candidates/:id', async (req, res) => {
    try {
        // Process request in Candidates Controller
        const candidates = await cc.processCandidatesIdRequest(req);
        if (candidates.length == 0) {
            return res.send({ candidate: "Candidate with provided ID not found" });
        }
        const stringifiedCandidate = JSON.stringify(candidates[0]);
        return res.send({ candidate: stringifiedCandidate });
    }
    catch (err) {
        if (err instanceof RequestError) {
            return res.send({ error: err }).status(err.code);
        }
        return res.send({ error: err }).status(500);
    }
});
// POST /api/candidates/create - Create new candidate with passed attributes
router.post('/candidates/create', async (req, res) => {
    try {
        // Process request in Candidates Controller
        const numOfInsertedRows = await cc.processCandidatesCreateRequest(req);
        return res.send({ message: 'OK', newCandidate: numOfInsertedRows });
    }
    catch (err) {
        if (err instanceof RequestError) {
            return res.send({ error: err }).status(err.code);
        }
        return res.send({ error: err }).status(500);
    }
});
// POST /api/candidates/update - Update specific candidate with passed ID
router.post('/candidates/update', async (req, res) => {
    try {
        // Process request in Candidates Controller
        const stringifiedResult = cc.processCandidatesUpdateRequest(req);
        return res.send({ message: 'OK', newVacancy: stringifiedResult });
    }
    catch (err) {
        if (err instanceof RequestError) {
            return res.send({ error: err }).status(err.code);
        }
        return res.send({ error: err }).status(500);
    }
});
// POST /api/candidates/remove - Remove specific candidate by passed ID
router.post('/candidates/remove', async (req, res) => {
    try {
        // Process request in Candidates Controller
        const results = await cc.processCandidatesRemoveRequest(req);
        return res.send({ message: 'OK', result: results });
    }
    catch (err) {
        if (err instanceof RequestError) {
            return res.send({ error: err }).status(err.code);
        }
        return res.send({ error: err }).status(500);
    }
});
export default router;
