import Network from "./Network";

class TableJobs extends Network {
    
    setRowsOfCandidates;
    setRowsOfVacancies;

    candidateNameInpt;
    candidateLastNameInpt;
    candidateSurameInpt;
    candidatevIDInpt;
    candidateExpInpt;
    candidateSalaryInpt;
    candidateInterviewDateInpt;

    candidteToRemoveIdInpt
     
    purgeCacheOfVacancyTable

    constructor() {
        super();
        this.preloadDataFromServer();
    }

    async preloadDataFromServer() {
        // Both functions start executing immediately at the same time
        await Promise.all([
            this.getCandidates(),
            // this.getVacancies()
        ]);
    }

    // Get all vacancies
    getVacancies() {

        console.log("get vacancies!");
        const successFunc = (resp) => {
            const parsedData = JSON.parse(resp.responseText);
            const vacancies = JSON.parse(parsedData.vacancies);
            console.log("get vacancies success!");
            // Code for filling vacancy table with ALL of the vacancies
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

        const successFunc = (resp) => {
            const parsedData = JSON.parse(resp.responseText);
            const vacancies = JSON.parse(parsedData.vacancies);
            done(vacancies);
        }

        const errorFunc = (resp) => {
            console.log("...:::Error Occured!:::...");
            console.log("Ответ от сервера: ", resp.response);
            window.alert(`Ошибка получения вакансий, попробуйте перезагрузить страницу. Текст ошибки: ${resp.response}`);
        }
        this.sendAjax("/api/vacancies", "GET", `from=${from}&to=${to}&cd_count=1`, successFunc, errorFunc);
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

    // Create new candidate on the server and add it to table
    createNewCandidate() {
        const newCandidate = {
            name: this.candidateNameInpt.value,
            last_name: this.candidateLastNameInpt.value,
            surname: this.candidateSurameInpt.value,
            for_vacancy_id: this.candidatevIDInpt.value,
            salary: this.candidateSalaryInpt.value,
            exp_in_full_years: this.candidateExpInpt.value,
            interview_date: this.candidateInterviewDateInpt.value
        };

        if (!newCandidate.name) {
            return window.alert("Вы не указали имя кандидата!");
        }
        if (!newCandidate.last_name) {
            return window.alert("Вы не указали фамилию кандидата!");
        }
        if (!newCandidate.surname) {
            return window.alert("Вы не указали Отчество кандидата!");
        }
        if (!newCandidate.for_vacancy_id) {
            return window.alert("Вы не указали ID вакансии!");
        }
        if (!newCandidate.salary) {
            return window.alert("Вы не указали Желаемую З/П кандидата!");
        }
        if (!newCandidate.exp_in_full_years) {
            return window.alert("Вы не указали Опыт кандидата!");
        }
        if (!newCandidate.interview_date) {
            return window.alert("Вы не указали Дату интервью кандидата!");
        }

        const successFunc = (resp) => {
            
            let parsedData = JSON.parse(resp.responseText);
            let {message, newCandidate} = parsedData;
            if (message == "OK" && newCandidate == 1) {
                // purge for updating
                this.purgeCacheOfVacancyTable();
                console.log("candidate creation success!");
                window.alert("Новый кандидат успешно добавлен!");
            } else {
                console.log("error creating candidate!");
                window.alert("Ошибка добавления нового кандидата! Попробуйте еще раз.");
            }

            // Update table here
            this.getCandidates();
        }

        const errorFunc = (resp) => {
            console.log("...:::Error Occured!:::...");
            console.log("Ответ от сервера:", resp.response);
            window.alert(`Ошибка добавления нового кандидата! Попробуйте еще раз. Текст ошибки: ${resp.response}`);
        }
        const queryStr = `first_name=${newCandidate.name}&last_name=${newCandidate.last_name}&surname=${newCandidate.surname}&for_vacancy_id=${newCandidate.for_vacancy_id}&requested_salary=${newCandidate.salary}&exp_in_full_years=${newCandidate.exp_in_full_years}&interview_date=${newCandidate.interview_date}`;

        this.sendAjax("/api/candidates/create", "POST", queryStr, successFunc, errorFunc);

    }

    // Remove candidate by ID
    removeCandidate() {
        const id = this.candidteToRemoveIdInpt.value;
        
        if (!id) {
            return window.alert("Вы не указали ID кандидата!");
        }
        console.log("rm: ID:", id);
        const successFunc = (resp) => {
            
            let parsedData = JSON.parse(resp.responseText);
            let {message, newCandidate} = parsedData;
            if (message == "OK") {
                // purge for updating
                this.purgeCacheOfVacancyTable();
                console.log("candidate deletion success!");
                window.alert(`Кандидат с ID ${id} был удален!`);
            } else {
                console.log("error creating candidate!");
                window.alert("Ошибка удаления кандидата! Попробуйте еще раз.");
            }

            // Update table here
            this.getCandidates();
        }

        const errorFunc = (resp) => {
            console.log("...:::Error Occured!:::...");
            console.log("Ответ от сервера:", resp.response);
            window.alert(`Ошибка удаления кандидата! Попробуйте еще раз. Текст ошибки: ${resp.response}`);
        }

        const queryStr = `id=${id}`;

        this.sendAjax("/api/candidates/remove", "POST", queryStr, successFunc, errorFunc);

    }
}

export default TableJobs