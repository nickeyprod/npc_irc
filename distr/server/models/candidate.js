// Candidate Model
import sq from "../controllers/sequelize_controller.js";
// CREATE TABLE candidates (
//     candidate_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
//     for_vacancy_id INTEGER REFERENCES vacancies(vacancy_id) ON DELETE SET NULL,
//     first_name VARCHAR(255) NOT NULL,
//     last_name VARCHAR(255) NOT NULL,
//     surname VARCHAR(255) NOT NULL,
//     interview_date DATE,
//     requested_salary NUMERIC(10, 2) CHECK (requested_salary > 0),
//     exp_in_full_years INTEGER
// );
class Candidate extends sq.Model {
    // Returns all candidates
    static async getAll() {
        const candidates = await sq.query("SELECT * FROM candidates", {
            type: sq.QueryTypes.SELECT
        });
        return candidates;
    }
    // Returns specific candidate by passed ID
    static async getByID(id) {
        const candidate = await sq.query(`SELECT * FROM candidates WHERE candidate_id = '${id}'`, {
            type: sq.QueryTypes.SELECT
        });
        return candidate;
    }
    // Create new candidate with passed attributes
    static async createNew(for_vacancy_id, first_name, last_name, surname, interview_date, requested_salary, exp_in_full_years) {
        const newCandidate = await sq.query(`INSERT INTO candidates (
                for_vacancy_id, 
                first_name, 
                last_name, 
                surname, 
                interview_date, 
                requested_salary, 
                exp_in_full_years
            ) 
            VALUES (
                ${for_vacancy_id}, 
                ${first_name}, 
                ${last_name}, 
                ${surname}, 
                ${interview_date}, 
                ${requested_salary}, 
                ${exp_in_full_years}
            )`, {
            type: sq.QueryTypes.INSERT
        });
        return newCandidate;
    }
    // Update attributes of the candidate
    static async updateSpecific(id, for_vacancy_id, first_name, last_name, surname, interview_date, requested_salary, exp_in_full_years) {
        const updationParts = [];
        if (for_vacancy_id) {
            updationParts.push(`for_vacancy_id = ${for_vacancy_id}`);
        }
        if (first_name) {
            updationParts.push(`first_name = ${first_name}`);
        }
        if (last_name) {
            updationParts.push(`last_name = ${last_name}`);
        }
        if (surname) {
            updationParts.push(`surname = ${surname}`);
        }
        if (interview_date) {
            updationParts.push(`interview_date = ${interview_date}`);
        }
        if (requested_salary) {
            updationParts.push(`requested_salary = ${requested_salary}`);
        }
        if (exp_in_full_years) {
            updationParts.push(`exp_in_full_years = ${exp_in_full_years}`);
        }
        const result = await sq.query(`UPDATE candidates 
            SET ${updationParts.join(", ")} 
            WHERE candidate_id = ${id}`, {
            type: sq.QueryTypes.UPDATE
        });
        return result;
    }
    // Remove specific candidate by passed ID
    static async removeByID(id) {
        const vacancy = await sq.query(`DELETE FROM candidates WHERE candidate_id = '${id}'`, {
            type: sq.QueryTypes.DELETE
        });
        return vacancy;
    }
}
Candidate.init({
    candidate_id: {
        type: sq.Types.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    for_vacancy_id: {
        type: sq.Types.INTEGER,
        references: {
            model: 'Vacancies', // Target table name (Note: Sequelize tables are usually plural)
            key: 'vacancy_id' // Target column name
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    first_name: {
        type: sq.Types.STRING,
        allowNull: false
    },
    last_name: {
        type: sq.Types.STRING,
        allowNull: false
    },
    surname: {
        type: sq.Types.STRING,
        allowNull: false
    },
    interview_date: {
        type: sq.Types.DATE,
    },
    requested_salary: {
        type: sq.Types.DECIMAL(10, 2),
        validate: {
            min: 0.01 // Ensures the value is > 0 before Sequelize saves it
        }
    },
    exp_in_full_years: {
        type: sq.Types.INTEGER
    },
}, {
    // Other model options go here
    sequelize: sq.sequelize, // We need to pass the connection instance
    modelName: 'Candidate', // We need to choose the model name
    tableName: 'candidates',
    timestamps: false
});
export default Candidate;
