-- НАЧАЛО СКРИПТА -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

-- Создаем новую БД в соответствии с физической моделью (см. d2.schema.png) файл. 

-- Запустите команду в терминале:  
-- psql -U postgres -d postgres -f /путь/к/файлу/init-db.sql 

-- Если вы находитесь в корне проекта, запустите команду:
-- psql -U postgres -d postgres -f ./init-db.sql

-- Чтобы подключиться к только что созданной БД, запустите команду:
-- psql -U postgres -d npc_irc_db 

CREATE DATABASE npc_irc_db;

-- Подключаемся к только что созданной БД
\c npc_irc_db

-- Создаем таблицу с вакансиями
CREATE TABLE vacancies (
    vacancy_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    is_opened BOOLEAN DEFAULT TRUE,
    name VARCHAR(265) UNIQUE NOT NULL,
    salary NUMERIC(10, 2) CHECK (salary > 0),
    opened_at DATE,
    closed_at DATE
);

-- Создаем таблицу с кандидатами
CREATE TABLE candidates (
    candidate_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    for_vacancy_id INTEGER REFERENCES vacancies(vacancy_id) ON DELETE SET NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    interview_date DATE,
    requested_salary NUMERIC(10, 2) CHECK (requested_salary > 0),
    exp_in_full_years INTEGER
);

-- Заполняем данными (вакансию и кандидатов на нее) 
-- IOS Разработчик (junior)
WITH ios_dev_vacancy AS (
    INSERT INTO vacancies (name, salary, opened_at) 
    VALUES ('IOS Разработчик (junior)', 120000, '2026-06-25')
    RETURNING vacancy_id
)
INSERT INTO candidates (for_vacancy_id, first_name, last_name, surname, interview_date, requested_salary, exp_in_full_years) 
VALUES ((SELECT vacancy_id FROM ios_dev_vacancy), 'Федор', 'Тулапов', 'Михайлович', '2026-08-10', 122000, 2),
       ((SELECT vacancy_id FROM ios_dev_vacancy), 'Дарья', 'Звездова', 'Александровна', '2026-07-21', 112000, 1),
       ((SELECT vacancy_id FROM ios_dev_vacancy), 'Николай', 'Пирогов', 'Лермонтович', '2026-04-21', 151000, 3);

-- Vue.js Frontend Разработчик
WITH vuejs_dev_vacancy AS (
    INSERT INTO vacancies (name, salary, opened_at) 
    VALUES ('Vue.js Frontend Разработчик', 100000, '2026-07-10')
    RETURNING vacancy_id
)
INSERT INTO candidates (for_vacancy_id, first_name, last_name, surname, interview_date, requested_salary, exp_in_full_years) 
VALUES ((SELECT vacancy_id FROM vuejs_dev_vacancy), 'Юлия', 'Утяшина', 'Матвеевна', '2026-04-11', 110000, 2),
       ((SELECT vacancy_id FROM vuejs_dev_vacancy), 'Платон', 'Антоний', 'Николаевич', '2026-07-26', 140000, 4),
       ((SELECT vacancy_id FROM vuejs_dev_vacancy), 'Иван', 'Матвеев', 'Вениаминович', '2026-06-21', 181000, 4);

-- Vibe Coder
WITH vibe_dev_vacancy AS (
    INSERT INTO vacancies (name, salary, opened_at, closed_at, is_opened) 
    VALUES ('Vibe Coder', 87000, '2026-07-10', '2026-07-13', FALSE)
    RETURNING vacancy_id
)
INSERT INTO candidates (for_vacancy_id, first_name, last_name, surname, interview_date, requested_salary, exp_in_full_years) 
VALUES ((SELECT vacancy_id FROM vibe_dev_vacancy), 'Рома', 'Кориков', 'Левович', '2026-04-11', 100000, 1),
       ((SELECT vacancy_id FROM vibe_dev_vacancy), 'Роман', 'Киркоров', 'Валерьевич', '2026-06-16', 170000, 3),
       ((SELECT vacancy_id FROM vibe_dev_vacancy), 'Боря', 'Вирушкин', 'Андреевич', '2026-06-01', 281000, 8);

-- PHP Разработчик (Middle)
WITH php_dev_vacancy AS (
    INSERT INTO vacancies (name, salary, opened_at, closed_at, is_opened) 
    VALUES ('PHP Разработчик (Middle)', 167000, '2026-05-03', '2026-06-01', FALSE)
    RETURNING vacancy_id
)
INSERT INTO candidates (for_vacancy_id, first_name, last_name, surname, interview_date, requested_salary, exp_in_full_years) 
VALUES ((SELECT vacancy_id FROM php_dev_vacancy), 'Геннадий', 'Самохин', 'Федорович', '2026-07-13', 155000, 5),
       ((SELECT vacancy_id FROM php_dev_vacancy), 'Вова', 'Биркутов', 'Савельевич', '2026-06-18', 170000, 6),
       ((SELECT vacancy_id FROM php_dev_vacancy), 'Яша', 'Полюков', 'Миронович', '2026-06-11', 161000, 3);

-- Бухгалтер
WITH accountant_vacancy AS (
    INSERT INTO vacancies (name, salary, opened_at, closed_at, is_opened) 
    VALUES ('Бухгалтер', 95000, '2026-06-13', '2026-07-11', FALSE)
    RETURNING vacancy_id
)
INSERT INTO candidates (for_vacancy_id, first_name, last_name, surname, interview_date, requested_salary, exp_in_full_years) 
VALUES ((SELECT vacancy_id FROM accountant_vacancy), 'Галина', 'Мидюкова', 'Федоровна', '2026-08-13', 105000, 10),
       ((SELECT vacancy_id FROM accountant_vacancy), 'Людмила', 'Яшина', 'Александровна', '2026-07-18', 175000, 11),
       ((SELECT vacancy_id FROM accountant_vacancy), 'Петр', 'Деньжин', 'Нескупович', '2026-12-11', 144000, 5);

-- Сварщик 3 Разряда
WITH welder_3_group_vacancy AS (
    INSERT INTO vacancies (name, salary, opened_at) 
    VALUES ('Сварщик 3 Разряда', 265000, '2026-06-13')
    RETURNING vacancy_id
)
INSERT INTO candidates (for_vacancy_id, first_name, last_name, surname, interview_date, requested_salary, exp_in_full_years) 
VALUES ((SELECT vacancy_id FROM welder_3_group_vacancy), 'Виталий', 'Свичнов', 'Максимович', '2026-11-14', 205000, 9),
       ((SELECT vacancy_id FROM welder_3_group_vacancy), 'Александр', 'Лагов', 'Львович', '2026-07-18', 245000, 20),
       ((SELECT vacancy_id FROM welder_3_group_vacancy), 'Валентин', 'Салов', 'Сварович', '2026-09-21', 124000, 4);

-- Электрик до 1000 В
WITH electrician_1000V_vacancy AS (
    INSERT INTO vacancies (name, salary, opened_at) 
    VALUES ('Электрик до 1000 В', 115000, '2026-06-13')
    RETURNING vacancy_id
)
INSERT INTO candidates (for_vacancy_id, first_name, last_name, surname, interview_date, requested_salary, exp_in_full_years) 
VALUES ((SELECT vacancy_id FROM electrician_1000V_vacancy), 'Эдик', 'Парков', 'Иванович', '2026-07-17', 167000, 7),
       ((SELECT vacancy_id FROM electrician_1000V_vacancy), 'Стас', 'Токов', 'Лиманович', '2026-02-10', 3175000, 31),
       ((SELECT vacancy_id FROM electrician_1000V_vacancy), 'Андрей', 'Стерликов', 'Бровинуваркач', '2026-12-31', 210000, 15);

-- Node.js Разработчик
WITH nodejs_dev_vacancy AS (
    INSERT INTO vacancies (name, salary, opened_at) 
    VALUES ('Node.js Разработчик', 122000, '2026-04-21')
    RETURNING vacancy_id
)
INSERT INTO candidates (for_vacancy_id, first_name, last_name, surname, interview_date, requested_salary, exp_in_full_years) 
VALUES ((SELECT vacancy_id FROM nodejs_dev_vacancy), 'Светлана', 'Тихая', 'Евлатовна', '2026-08-13', 199000, 12),
       ((SELECT vacancy_id FROM nodejs_dev_vacancy), 'Jason', 'Michael', 'Statham', '2027-09-18', 275000, 9),
       ((SELECT vacancy_id FROM nodejs_dev_vacancy), 'Christian', 'Charles Philip', 'Bale', '2026-12-11', 144000, 5);

-- После успешного запуска скрипта и инициализации БД, можно билдить проект и запускать сервер Node.js.

-- КОНЕЦ СКРИПТА -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


