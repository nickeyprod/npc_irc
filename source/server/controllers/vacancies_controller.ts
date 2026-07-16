// Vacancies Controller
import { Request } from "express";
import Vacancy from "../models/Vacancy.js";
import RequestError from "../custom_errors/request_error.js"

class VacanciesController {

    // Process request to GET /api/vacancies 
    async processVacanciesRequest(req: Request) {

        // If from and to, then get part of vacancies
		if (req.query.from && req.query.to) {
			const partOfVacancies = await Vacancy.getPart(+req.query.from, +req.query.to);
			const stringifiedVacancies = JSON.stringify(partOfVacancies);
			return stringifiedVacancies
		}

        // Find all vacancies within RAW SQL QUERY
        const vacancies = await Vacancy.getAll();
        const stringifiedVacancies = JSON.stringify(vacancies);
        return stringifiedVacancies;
    }

    // Process request to GET /api/vacancies/:id 
    async processVacanciesIdRequest(req: Request) {
        
        if (!req.params.id) {
            throw new RequestError(400, 'Missing required URL parameter "id"');
		}

		const vacancyID = +req.params.id;

        // Get specific vacancy by its ID within RAW SQL QUERY
        const vacancy = await Vacancy.getByID(vacancyID);

		if (vacancy.length == 0) {
			throw new RequestError(400, "Vacancy with provided ID not found" );
		}

        const stringifiedVacancy = JSON.stringify(vacancy[0]);
        return stringifiedVacancy;
    }

    // Process request to POST /api/vacancies/create
    async processVacanciesCreateRequest(req: Request) {

        const { is_opened, name, salary } = req.body.data;
		
		if (!is_opened) {
            throw new RequestError(400, 'Missing required property "is_opened"');
		}
		else if (!name) {
            throw new RequestError(400, 'Missing required property "name"');
		}
		else if (!salary) {
            throw new RequestError(400, 'Missing required property "salary"');
		}

		// Create new vacancy with passed attributes within RAW SQL QUERY
		const newVacancy = await Vacancy.createNew(is_opened, name, salary, new Date());

		const stringifiedNewVacancy = JSON.stringify(newVacancy);
        return stringifiedNewVacancy;
    }

    // Process request to POST /api/vacancies/update
    async processVacanciesUpdateRequest(req: Request) {

        const { id, is_opened, name, salary, opened_at, closed_at } = req.body.data;
		
		if (!id) {
            throw new RequestError(400, 'Missing required body parameter "ID"');
		}

		// Update attributes of the vacancy within RAW SQL QUERY
		const result = await Vacancy.updateSpecific(id, is_opened, name, salary, opened_at, closed_at);

		const stringifiedResult = JSON.stringify(result);
        return stringifiedResult;
    }

    // Process request to POST /api/vacancies/remove
    async processVacanciesRemoveRequest(req: Request) {
        const { id } = req.body.data;
		
		if (!id) {
            throw new RequestError(400, 'Missing required body parameter "ID"');
		}

		// Remove specific vacancy by passed ID within RAW SQL QUERY
		const result = await Vacancy.removeByID(id);

		const stringifiedResult = JSON.stringify(result);
        return stringifiedResult;
    }
}

const vacanciesCT = new VacanciesController();

export default vacanciesCT