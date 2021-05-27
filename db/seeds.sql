INSERT INTO department (id, name)
VALUES
    (1, 'Sales'),    
    (2, 'Engineering'), 
    (3, 'Finance'), 
    (4, 'Legal');

INSERT INTO role (id, title, salary, department_id)
VALUES
    (1, 'Sales Lead', 100000, 1),
    (2, 'Sales person', 80000, 1),
    (3, 'Lead engineer', 150000, 2),
    (4, 'Software engineer', 120000, 2),
    (5, 'Accountant', 125000, 3),
    (6, 'Legal team lead', 250000, 4),
    (7, 'Lawyer', 250000, 4);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES
    (1, 'John', 'Doe', 1),
    (2, 'Mike', 'Chan', 2),
    (3, 'Ashley', 'Rodriquez', 3),
    (4, 'Kevin', 'Tupile', 4),
    (5, 'Malia', 'Brown', 5),
    (6, 'Sarah', 'Lourd', 6),
    (7, 'Tom', 'Allen', 7),
    (8, 'Tammer', 'Galal', 4);


UPDATE employee SET manager_id = 3 WHERE id in (1,4,8); 
UPDATE employee SET manager_id = 1 WHERE id in (2);
UPDATE employee SET manager_id = 6 WHERE id in (7);


