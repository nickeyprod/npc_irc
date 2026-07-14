// VACANCY API ROUTES
import express from "express";
import Vacancy from "../../models/Vacancy.js";

const router = express.Router();

// GET /api/vacancies - Returns all vacancies
router.get('/vacancies', async (req, res) => {
    try {
        // Find all vacancies within RAW SQL QUERY
        const vacancies = await Vacancy.getAll();
        const stringifiedVacancies = JSON.stringify(vacancies);

        return res.send({ vacancies: stringifiedVacancies });
    } 
    catch (err) {
        return res.send({error: err }).status(500);
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
        return res.send({error: err }).status(500);
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
	catch(err) {
		return res.send({error: err}).status(500); 
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
	catch(err) {
		return res.send({error: err}).status(500); 
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
	catch(err) {
		return res.send({error: err}).status(500); 
	}
});

export default router
