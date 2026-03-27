INSERT INTO Assistance (Assistance_Type, Assistance_Name) VALUES
('Physical Support', 'Wheelchair Access'),
('Physical Support', 'Mobility Aid Assistance'),
('Visual Support', 'Screen Reader Software'),
('Visual Support', 'Large Print Materials'),
('Hearing Support', 'Sign Language Interpreter'),
('Hearing Support', 'Hearing Loop System'),
('Learning Support', 'Extra Exam Time'),
('Learning Support', 'Note Taking Assistance'),
('Mental Health Support', 'Counselling Services'),
('Mental Health Support', 'Quiet Study Room');

INSERT INTO Disability (Disability_Type, Disability_Name, Disability_Desc) VALUES
('Physical', 'Paraplegia', 'Loss of movement in lower limbs'),
('Physical', 'Arthritis', 'Joint inflammation causing pain and stiffness'),
('Visual', 'Blindness', 'Complete loss of vision'),
('Visual', 'Partial Sight', 'Reduced vision not correctable by glasses'),
('Hearing', 'Deafness', 'Complete hearing loss'),
('Hearing', 'Hard of Hearing', 'Partial hearing loss'),
('Learning', 'Dyslexia', 'Difficulty reading and processing text'),
('Learning', 'ADHD', 'Attention deficit hyperactivity disorder'),
('Mental Health', 'Anxiety Disorder', 'Persistent excessive worry'),
('Mental Health', 'Depression', 'Persistent low mood and loss of interest');

INSERT INTO Student (Forename, Surname, Email, Emergency_Contact,DOB) VALUES
('James', 'O\'Connor', 'j.oconnor@student.edu', 'Anne O\'Connor - 07700123456','2015-01-01'),
('Emma', 'McBride', 'e.mcbride@student.edu', 'John McBride - 07700987654','2008-02-01'),
('Liam', 'Murphy', 'l.murphy@student.edu', 'Sarah Murphy - 07700345678','2009-01-06'),
('Sophie', 'Kelly', 's.kelly@student.edu', 'Paul Kelly - 07700234567','2010-04-13'),
('Noah', 'Campbell', 'n.campbell@student.edu', 'Mary Campbell - 07700876543','2011-02-22'),
('Olivia', 'Stewart', 'o.stewart@student.edu', 'David Stewart - 07700111222','2012-10-10'),
('Jack', 'Wilson', 'j.wilson@student.edu', 'Linda Wilson - 07700999111','2013-11-25'),
('Ava', 'Brown', 'a.brown@student.edu', 'Chris Brown - 07700444555','2014-07-06'),
('Charlie', 'Davis', 'c.davis@student.edu', 'Emma Davis - 07700666777','2010-01-04'),
('Grace', 'Evans', 'g.evans@student.edu', 'Mark Evans - 07700888999','2010-09-01');

INSERT INTO Subject (Subject_Name, Subject_Desc, Required_Subject) VALUES
('Mathematics', 'Core mathematics including algebra and calculus', NULL),
('English Literature', 'Study of prose, poetry and drama', NULL),
('Computer Science', 'Programming and computational theory', 'Mathematics'),
('Biology', 'Study of living organisms', NULL),
('Chemistry', 'Study of matter and reactions', NULL),
('Physics', 'Study of forces, energy and motion', 'Mathematics'),
('History', 'Study of past events', NULL),
('Geography', 'Study of Earth and environments', NULL),
('Psychology', 'Study of mind and behaviour', 'Biology'),
('Business Studies', 'Fundamentals of business and management', NULL);

INSERT INTO Class (Class_Name, Subject_ID) VALUES
('Maths Year 1 - A', 1),
('Maths Year 1 - B', 1),
('English Lit - A', 2),
('Computer Science - A', 3),
('Biology - A', 4),
('Chemistry - A', 5),
('Physics - A', 6),
('History - A', 7),
('Geography - A', 8),
('Psychology - A', 9),
('Business - A', 10);

INSERT INTO Test (Subject_ID, Name, Percent_of_subject, Total_Marks, Pass_Marks) VALUES
(1, 'Maths Test - 1A',40.00, 100, 40),
(1, 'Maths Test - 2A',60.00, 100, 50),
(2, 'Maths Test - 1B',100.00, 100, 50),
(3, 'CS Test - 1A',50.00, 100, 50),
(3, 'CS Test - 2A',50.00, 100, 50),
(4, 'Biology Test - 1A',100.00, 100, 45),
(5, 'Chemistry Test - 1A',100.00, 100, 50),
(6, 'Physics Test - 1A',100.00, 100, 50),
(7, 'History Test - 1A',100.00, 100, 45),
(8, 'Geography Test - 1A',100.00, 100, 45),
(9, 'Psychology Test - 1A',100.00, 100, 50),
(10, 'Business Test - 1A',100.00, 100, 50);

INSERT INTO Student_Disability_Support (Student_ID, Disability_ID, Assistance_ID) VALUES
(1, 1, 1),
(2, 7, 7),
(2, 7, 8),
(3, 8, 9),
(4, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 9, 9),
(7, 2, 2),
(8, 6, 6),
(9, 10, 9),
(10, 7, 7);

INSERT INTO Test_Student (Student_ID, Test_ID, Grade, Pass_Fail) VALUES
(1, 1, 65.00, TRUE),
(1, 2, 70.00, TRUE),
(2, 3, 55.00, TRUE),
(3, 4, 48.00, FALSE),
(3, 5, 60.00, TRUE),
(4, 6, 72.00, TRUE),
(5, 7, 66.00, TRUE),
(6, 8, 58.00, TRUE),
(7, 9, 49.00, TRUE),
(8, 10, 52.00, TRUE),
(9, 11, 45.00, FALSE),
(10, 12, 61.00, TRUE);
INSERT INTO Test_Student (Name) VALUES 
SELECT Name FROM Test WHERE Test_Student(Test_ID) = Test(Test_ID)
