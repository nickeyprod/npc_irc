import Candidate from "../models/Candidate.js";
import RequestError from "../custom_errors/request_error.js";
class VacanciesController {
    // Process request to GET /api/candidates 
    async processCandidatesRequest(_) {
        // Find all candidates within RAW SQL QUERY
        const candidates = await Candidate.getAll();
        const stringifiedCandidates = JSON.stringify(candidates);
        return stringifiedCandidates;
    }
    // Process request to GET /api/candidates/:id 
    async processCandidatesIdRequest(req) {
        if (!req.params.id) {
            throw new RequestError(400, 'Missing required URL parameter "id"');
        }
        const candidateID = +req.params.id;
        // Get specific candidate by its ID within RAW SQL QUERY
        const candidate = await Candidate.getByID(candidateID);
        return candidate;
    }
    // Process request to POST /api/candidates/create
    async processCandidatesCreateRequest(req) {
        const { for_vacancy_id, first_name, last_name, surname, interview_date, requested_salary, exp_in_full_years } = req.body.data;
        if (!for_vacancy_id) {
            throw new RequestError(400, 'Missing required property "for_vacancy_id"');
        }
        else if (!first_name) {
            throw new RequestError(400, 'Missing required property "first_name"');
        }
        else if (!last_name) {
            throw new RequestError(400, 'Missing required property "last_name"');
        }
        else if (!surname) {
            throw new RequestError(400, 'Missing required property "surname"');
        }
        else if (!interview_date) {
            throw new RequestError(400, 'Missing required property "interview_date"');
        }
        else if (!requested_salary) {
            throw new RequestError(400, 'Missing required property "requested_salary"');
        }
        else if (!exp_in_full_years) {
            throw new RequestError(400, 'Missing required property "exp_in_full_years"');
        }
        // Create new candidate with passed attributes within RAW SQL QUERY
        const newCandidate = await Candidate.createNew(for_vacancy_id, first_name, last_name, surname, interview_date, requested_salary, exp_in_full_years);
        const stringifiedNewCandidate = JSON.stringify(newCandidate);
        return stringifiedNewCandidate;
    }
    // Process request to POST /api/candidates/update
    async processCandidatesUpdateRequest(req) {
        const { id, for_vacancy_id, first_name, last_name, surname, interview_date, requested_salary, exp_in_full_years } = req.body.data;
        if (!id) {
            throw new RequestError(400, 'Missing required body parameter "ID"');
        }
        // Update attributes of the candidate within RAW SQL QUERY
        const result = await Candidate.updateSpecific(id, for_vacancy_id, first_name, last_name, surname, interview_date, requested_salary, exp_in_full_years);
        const stringifiedResult = JSON.stringify(result);
        return stringifiedResult;
    }
    // Process request to POST /api/candidates/remove
    async processCandidatesRemoveRequest(req) {
        const { id } = req.body.data;
        if (!id) {
            throw new RequestError(400, 'Missing required body parameter "ID"');
        }
        // Remove specific candidate by passed ID within RAW SQL QUERY
        const result = await Candidate.removeByID(id);
        const stringifiedResult = JSON.stringify(result);
        return stringifiedResult;
    }
}
const vacanciesCT = new VacanciesController();
export default vacanciesCT;
