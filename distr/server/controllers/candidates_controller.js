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
        const { first_name, last_name, surname, for_vacancy_id, interview_date, requested_salary, exp_in_full_years } = req.body;
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
        const numOfInsertedRows = await Candidate.createNew(for_vacancy_id, first_name, last_name, surname, interview_date, requested_salary, exp_in_full_years);
        return numOfInsertedRows;
    }
    // Process request to POST /api/candidates/update
    async processCandidatesUpdateRequest(req) {
        const { candidate_id, for_vacancy_id, first_name, last_name, surname, interview_date, requested_salary, exp_in_full_years } = req.body;
        if (!candidate_id) {
            throw new RequestError(400, 'Missing required body parameter "candidate_id"');
        }
        // Update attributes of the candidate within RAW SQL QUERY
        const numOfRowsAffected = await Candidate.updateSpecific(candidate_id, for_vacancy_id, first_name, last_name, surname, interview_date, requested_salary, exp_in_full_years);
        return numOfRowsAffected;
    }
    // Process request to POST /api/candidates/remove
    async processCandidatesRemoveRequest(req) {
        const { id } = req.body;
        if (!id) {
            throw new RequestError(400, 'Missing required body parameter "ID"');
        }
        // Remove specific candidate by passed ID within RAW SQL QUERY
        const results = await Candidate.removeByID(id);
        return results;
    }
}
const vacanciesCT = new VacanciesController();
export default vacanciesCT;
