// Vacancy Model
import sq from "../controllers/sequelize/sequelize_controller.js";
import MainModel from "../models/MainModel.js";
// CREATE TABLE vacancies (
//     vacancy_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
//     is_opened BOOLEAN DEFAULT TRUE,
//     name VARCHAR(265) UNIQUE NOT NULL,
//     salary NUMERIC(10, 2) CHECK (salary > 0),
//     opened_at DATE,
//     closed_at DATE
// );
class Vacancy extends MainModel {
    // Returns all vacancies
    static async getAll() {
        const vacancies = await sq.query("SELECT * FROM vacancies", {
            type: sq.QueryTypes.SELECT
        });
        return vacancies;
    }
    // Returns specific vacancy by passed ID
    static async getByID(id) {
        const vacancy = await sq.query(`SELECT * FROM vacancies WHERE vacancy_id = '${id}'`, {
            type: sq.QueryTypes.SELECT
        });
        return vacancy;
    }
    // Get vacancies by limit & offest
    static async getPart(from, to) {
        const vacancies = await sq.query(`SELECT * FROM vacancies 
            ORDER BY vacancy_id 
            LIMIT ${to} OFFSET ${from}`, {
            type: sq.QueryTypes.SELECT
        });
        return vacancies;
    }
    // Create new vacancy with passed attributes
    static async createNew(is_opened, name, salary, opened_at, closed_at = undefined) {
        const newVacancy = await sq.query(`INSERT INTO vacancies (
                is_opened, 
                name, 
                salary, 
                opened_at, 
                closed_at
            ) 
            VALUES (
                ${is_opened}, 
                ${name}, 
                ${salary}, 
                ${opened_at}, 
                ${closed_at}
            )`, {
            type: sq.QueryTypes.INSERT
        });
        return newVacancy;
    }
    // Update attributes of the vacancy
    static async updateSpecific(id, is_opened, name, salary, opened_at, closed_at) {
        const updationParts = [];
        if (is_opened) {
            updationParts.push(`is_opened = ${is_opened}`);
        }
        if (name) {
            updationParts.push(`name = ${name}`);
        }
        if (salary) {
            updationParts.push(`salary = ${salary}`);
        }
        if (opened_at) {
            updationParts.push(`opened_at = ${opened_at}`);
        }
        if (closed_at) {
            updationParts.push(`closed_at = ${closed_at}`);
        }
        const result = await sq.query(`UPDATE vacancies 
            SET ${updationParts.join(", ")} 
            WHERE vacancy_id = ${id}`, {
            type: sq.QueryTypes.UPDATE
        });
        return result;
    }
    // Remove specific vacancy by passed ID
    static async removeByID(id) {
        const vacancy = await sq.query(`DELETE FROM vacancies WHERE vacancy_id = '${id}'`, {
            type: sq.QueryTypes.DELETE
        });
        return vacancy;
    }
}
Vacancy.init({
    vacancy_id: {
        type: sq.Types.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    is_opened: {
        type: sq.Types.BOOLEAN,
        defaultValue: true
    },
    name: {
        type: sq.Types.STRING,
        allowNull: false
    },
    salary: {
        type: sq.Types.DECIMAL(10, 2),
        validate: {
            min: 0.01 // Ensures the value is > 0 before Sequelize saves it
        }
    },
    opened_at: {
        type: sq.Types.DATE,
    },
    closed_at: {
        type: sq.Types.DATE,
    },
}, {
    // Other model options go here
    sequelize: sq.sequelize, // We need to pass the connection instance
    modelName: "Vacancy", // We need to choose the model name
    tableName: 'vacancies',
    timestamps: false
});
export default Vacancy;
