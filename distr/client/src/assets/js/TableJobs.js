import Network from "./Network";

class TableJobs extends Network {
    
    setRowsOfCandidates
    setRowsOfVacancies

    constructor() {
        super();
        this.preloadDataFromServer();
    }

    async preloadDataFromServer() {
        // Both functions start executing immediately at the same time
        await Promise.all([
            this.getCandidates(),
            this.getVacancies()
        ]);
    }

    // Get all vacancies
    getVacancies() {

        console.log("get vacancies!");
        const successFunc = (resp) => {
            const parsedData = JSON.parse(resp.responseText);
            const vacancies = JSON.parse(parsedData.vacancies);
            console.log("vacancies success!");
            // Code for filling vacancy table
            this.setRowsOfVacancies(vacancies);
        }

        const errorFunc = (resp) => {
            console.log("...:::Error Occured!:::...");
            console.log("Ответ от сервера: ", resp.response);
            window.alert(`Ошибка получения вакансий, попробуйте перезагрузить страницу. Текст ошибки: ${resp.response}`);
        }

        this.sendAjax("/api/vacancies", "GET", "", successFunc, errorFunc);
    }

    // Get part of vacacies, from, to
    getPartOfVacancies(from, to, done) {
        console.log(`get vacancies from=${from}&to=${to}!`);
        const successFunc = (resp) => {
            const parsedData = JSON.parse(resp.responseText);
            const vacancies = JSON.parse(parsedData.vacancies);
            console.log(`vacancies part from=${from}&to=${to} success!`);
            done(vacancies);
        }

        const errorFunc = (resp) => {
            console.log("...:::Error Occured!:::...");
            console.log("Ответ от сервера: ", resp.response);
            window.alert(`Ошибка получения вакансий, попробуйте перезагрузить страницу. Текст ошибки: ${resp.response}`);
        }
        this.sendAjax("/api/vacancies", "GET", `from=${from}&to=${to}`, successFunc, errorFunc);
    }

    // Get all candidates
    getCandidates() {
        console.log("get candidates!");
        const successFunc = (resp) => {
            
            let parsedData = JSON.parse(resp.responseText);
            let candidates = JSON.parse(parsedData.candidates);
            console.log("candidates success!");
            // Code for filling candidates table
            this.setRowsOfCandidates(candidates);
        }

        const errorFunc = (resp) => {
            console.log("...:::Error Occured!:::...");
            console.log("Ответ от сервера:", resp.response);
            window.alert(`Ошибка получения кандидатов, попробуйте перезагрузить страницу. Текст ошибки: ${resp.response}`);
        }

        this.sendAjax("/api/candidates", "GET", "", successFunc, errorFunc);
    }
}

export default TableJobs