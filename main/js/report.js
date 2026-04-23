<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Disabilities in Education</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/reportStyling.css">
    <link rel="stylesheet" href="css/tableStyling.css">
</head>
<body>
    <div class="content">
        <div class="banner">
            <h1>Disabilities in Education</h1>
            <p>The effects on learning and development for students with disabilities</p>
        </div>
        <div class="nav">
            <p>
                <a href="index.html">Home</a> |
                <a href="addRecord.html">Add new Student Record</a> |
                <a href="readRecords.html">Read Student Records</a> |
                <a href="changeRecords.html">Edit/Delete Student Details</a> | 
                <a href="addNewTestResult.html">Add New Test Result</a> |
                <a href="reports.html">Reports</a>
            </p>
        </div>
        <div class="main">
            <h2>Reports</h2>
            <label class="select-label" for="reportSelector">Select a report to view:</label>
            <select name="report" id="reportSelector" default="Choose an option">
                <option value="">Choose an option</option>
                <option value="report1">Average Grade by Disability</option>
                <option value="report2">Number of Students by Disability Type</option>
                <option value="report3">Grade Distribution for each Test</option>
                <option value="report4">Average Marks with and without Assistance</option>
                <option value="report5">Find an individual student report</option>
                <option value="report6">Find a selected class-test grades</option>
                <option value="report7">Students that have Failed atleast 1 Test</option>
                <option value="report8">Test Pass Rates</option>
                <option value="report9">Disabilities by Gender Split</option>
                <option value="report10">Top 10 Students with Disabilities</option>
                <option value="report11">Performance by Credential Type</option>
                <option value="report12">Teacher Workload for SEN Classes</option>
            </select>

            <div id="tableContainer"></div>
            <canvas id="chartContainer"></canvas>

            <div class="message"></div>
        </div>
    </div>

    <script src="js/useSQL.js"></script>
    <script src="js/SQL_possible_methods/student.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="js/report.js"></script>
    <script src="js/SQL_possible_methods/test.js"></script>
    <script>
        const showMessage = (message, type) => {
          messageDiv.textContent = message;
          messageDiv.className   = `message ${type}`;
        };

        const selectTag = document.querySelector('#reportSelector');
        const reportOutput = document.querySelector('#chartContainer');
        const tableContainer = document.querySelector('#tableContainer');
        let reportSelected;
        let chart;

        selectTag.addEventListener('change', async (event) => {
            event.preventDefault();

            if (chart) {
                chart.destroy();
            }
            
            tableContainer.innerHTML = '<canvas id="reportOutput"></canvas>';


            reportSelected = event.target.value;

            switch (reportSelected) {
                case 'report1': {
                    const sql = 'SELECT AVG((ts.Score / t.Total_Marks) * 100) AS Grade, d.Disability_Type FROM Student s JOIN Test_Student ts ON ts.Student_ID = s.Student_ID JOIN Test t ON t.Test_ID = ts.Test_ID JOIN Student_Disability_Support sds ON sds.Student_ID = s.Student_ID JOIN Disability d ON d.Disability_ID = sds.Disability_ID GROUP BY d.Disability_Type;';
    
                    const data = await getReportData(sql);

                    let labels = [];
                    let grades = [];

                    for (let row of data) {
                        labels.push(row.Disability_Type);
                        grades.push(row.Grade);
                    }

                    chart = new Chart(reportOutput, {
                        type: 'bar',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Average Grade',
                                data: grades,
                                backgroundColor: '#2C666E'
                            }]
                        },
                        options: {
                            responsive: true,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    max: 100
                                }
                            }
                        }
                    });

                    reportOutput.style.width = '1800px';
                    reportOutput.style.height = '700px';

                    break;
                }
                    case 'report2': {
                        const sql = "SELECT COUNT(s.Student_ID) AS numStudents, COALESCE(d.Disability_Type, 'None') AS Disability FROM Student s LEFT JOIN Student_Disability_Support sds ON sds.Student_ID = s.Student_ID LEFT JOIN Disability d ON sds.Disability_ID = d.Disability_ID GROUP BY Disability;";
                        
                        const data = await getReportData(sql);

                        let chartLabels = [];
                        let numStudents = [];

                        for (let row of data) {
                            chartLabels.push(row.Disability);
                            numStudents.push(row.numStudents);
                        }
                        
                        chart = new Chart(reportOutput, {
                            type: 'pie',
                            data: {
                                labels: chartLabels,
                                datasets: [{
                                    label: 'Number of Students',
                                    data: numStudents,
                                    backgroundColor: [
                                        '#1A6FBF',
                                        '#F57500',
                                        '#D42020',
                                        '#2AB5AD',
                                        '#2E9E42',
                                        '#F0C400',
                                        '#9B3D9B',
                                        '#FF6B7A']
                                }]
                            },
                            options: {
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'left',
                                    },
                                    title: {
                                        display: true,
                                        text: 'Number of Students by Disability Type'
                                    }
                                }
                        }                    
                    });

                    reportOutput.style.width = '900px';
                    reportOutput.style.height = '900px';
                    break;
                }
                case 'report3': {
                    const sql = 'SELECT t.Test_ID, t.Name, MIN(ts.Score) AS minGrade, MAX(ts.Score) AS maxGrade, AVG(ts.Score) AS avgGrade, t.Total_Marks FROM Test t LEFT JOIN Test_Student ts ON t.Test_ID = ts.Test_ID GROUP BY t.Test_ID;';
                        
                    const data = await getReportData(sql);

                    let chartLabels = [];
                    let minGrades = [];
                    let maxGrades = [];
                    let avgGrades = [];

                    for (let row of data) {
                        chartLabels.push(row.Name);
                        minGrades.push((row.minGrade / row.Total_Marks) * 100);
                        maxGrades.push((row.maxGrade / row.Total_Marks) * 100);
                        avgGrades.push((row.avgGrade / row.Total_Marks) * 100);
                    }
                        
                    chart = new Chart(reportOutput, {
                        type: 'line',
                        data: {
                            labels: chartLabels,
                            datasets: [
                                {
                                    label: 'Maximum Grade',
                                    data: maxGrades
                                },
                                {
                                    label: 'Minimum Grade',
                                    data: minGrades
                                },
                                {
                                    label: 'Average Grade',
                                    data: avgGrades
                                }
                            ]
                        },
                            options: {
                                responsive: true,
                                plugins: {
                                    legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'Grade Range by Test'
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    max: 105,
                                    gace: '5%'
                                },
                                x: {
                                    offset: true,
                                    ticks: {
                                        autoSkip: false,
                                        maxRotation: 45,
                                        minRotation: 45
                                    }
                                }
                            }
                        }                    
                    });

                    reportOutput.style.width = '1800px';
                    reportOutput.style.height = '1000px';
                    
                    break;
                }
                /* My reports (Jack)*/
                case 'report4': {
                    // With assistance
                    const marks = await getAverageMarksOfAssistanceAndNonAssistance();
                    const markData = marks.data;

                    const label = markData.map(r => r.Has_Assistance === 'True' ? 'With Assistance' : 'Without Assistance');
                    const data = markData.map(r => parseFloat(r.Average_Mark_As_Precentage));
                    // Without assistance

                    //Chart
                    chart = new Chart(reportOutput, {
                        type: 'bar',
                        data:{
                            labels: label,
                            datasets:[{
                                label:'Average mark',
                                data: data,
                                backgroundColor:'#2C666E'
                            }]
                        },
                        options: { 
                            responsive: true, 
                            scales: 
                            { y: 
                                { beginAtZero: true, max: 100 }
                            } 
                        }
                    });

                    reportOutput.style.width = '600px'; 
                    reportOutput.style.height = '400px';
                    break;
                }
                    // code to generate report 4
                case 'report5':
                    await createOptions(); // generates the select boxes and there labels

                    // ================
                    //  Combo-box name 
                    // ================
                    //selectAssistance
                    //selectStudent
                    selectStudent.addEventListener('change', async (event) => {
                        selectedStudentId = event.target.value;

                        allTest = await getAllTestResultsForAStudent(selectedStudentId);

                        const allTestData = allTest.data;
                        
                        const testNames = allTestData.map(n => n.Name);
                        const marks = allTestData.map(m => parseFloat(m.Mark_Percent));

                        const hightlightColours = marks.map(score => {
                            
                            if((score) == 100) return '#FFD93D';
                            if((score) >= 80) return '#00C853';
                            if((score) >= 70) return '#3A86FF';
                            if((score) >= 60) return '#FF9671';
                            if((score) < 60) return '#FF6B6B'
                        });

                        chart = new Chart(reportOutput, {
                            type: 'bar',
                            data: {
                                labels: testNames,
                                datasets: [{
                                    data: marks,
                                    backgroundColor: hightlightColours
                                }]
                            },
                            options: {
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        max: 100
                                    }
                                },
                                plugins: {
                                    legend: {
                                        position: 'top',
                                        labels: {
                                            generateLabels: function() {
                                                return [
                                                    { text: '100%',      fillStyle: '#FFD93D', strokeStyle: '#FFD93D' },
                                                    { text: '80-99%',    fillStyle: '#00C853', strokeStyle: '#00C853' },
                                                    { text: '70-79%',    fillStyle: '#3A86FF', strokeStyle: '#3A86FF' },
                                                    { text: '60-69%',    fillStyle: '#FF9671', strokeStyle: '#FF9671' },
                                                    { text: 'Below 60%', fillStyle: '#FF6B6B', strokeStyle: '#FF6B6B' }
                                                ];
                                            }
                                        }
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: function(context) {
                                                const value = context.parsed.y;
                                                return `${value}%`;
                                            }
                                        }
                                    }
                                }
                            }
                        });

                        reportOutput.style.width = '1000px'; 
                        reportOutput.style.height = '700px';
                    });



                    // code to generate report 5
                    break;
                case 'report6':

                    tableContainer.innerHTML = '<div id="class-select-wrapper"></div> <div id="charts-container" class="charts-container"></div>';

                    createClassOptions();

                    // ================
                    //  Combo-box name
                    // ================
                    //
                    //  selectClass
                    //

                    selectClass.addEventListener('change', async (event) => {
                        const classId = event.target.value;

                        const classTest = await getStudentTestsDataBasedOnAClass(classId);
                        console.log(classTest);
                        const classTestData = classTest.data;
                        console.log(classTestData);

                        const testGroups = {};
                        classTestData.forEach(row => {
                            if(!testGroups[row.Test_Name]) {
                                testGroups[row.Test_Name] = [];
                            }
                            testGroups[row.Test_Name].push(row);
                        })

                        const gradeOrder = ['A*', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'U'];

                        const pieChartData = Object.keys(testGroups).map(testName => {
                            const selectedStudent = testGroups[testName];

                            const gradeCounts = {};
                            selectedStudent.forEach(s => {
                                if(!gradeCounts[s.Grade]) {
                                    gradeCounts[s.Grade] = [];
                                }
                                const has_Assistance = s.Has_Assistance === 'True' ? ' (SEN)' : '';
                                gradeCounts[s.Grade].push(`ID:${s.Student_ID} ${s.Forename} ${s.Surname}${has_Assistance}`);
                            });

                            const labels = Object.keys(gradeCounts).sort(
                                (a,b) => gradeOrder.indexOf(a) - gradeOrder.indexOf(b)
                            );

                            return {testName : testName, labels: labels, data: labels.map(g => gradeCounts[g].length), studentNames: labels.map(g => gradeCounts[g])};
                        })


                        const container = document.getElementById('charts-container');

                        container.innerHTML = '';
                        const wrapper = document.createElement('div');
                        wrapper.classList.add('chart-wrapper');
                        pieChartData.forEach((test, index) =>{
                            console.log(test.data);
                            const chartDiv = document.createElement('div');
                            chartDiv.classList.add('chart-box');

                            const canvas = document.createElement('canvas');
                            canvas.classList.add('canvas-class')
                            canvas.id = `chart-${index}`;

                            wrapper.appendChild(canvas);



                            new Chart(canvas, {
                                type: 'pie',
                                data: {
                                    labels: test.labels,
                                    datasets: [{
                                        data: test.data,
                                        backgroundColor: [
                                            '#FF6384', 
                                            '#FF9F40',
                                            '#FFCD56', 
                                            '#4BC078', 
                                            '#36A2EB', 
                                            '#9966FF', 
                                            '#FF63C8', 
                                            '#64DCDC'
                                        ]
                                    }]
                                },
                                options: {
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        tooltip: {
                                            callbacks: {
                                                title: function(context) {
                                                    if (!context || !context.length) return '';
                                                   const count = context[0].parsed;
                                                   return `${context[0].label} (${count} student${count === 1 ? '' : 's'})`;
                                                },
                                                label: function(context) {
                                                    if (!context) return '';
                                                    return test.studentNames[context.dataIndex];
                                                }
                                            }
                                        },
                                        title: {
                                            display: true,
                                            text: test.testName 
                                        }
                                    }
                                }
                                
                            });
                        });
                        container.appendChild(wrapper);
                    });

                    // code to generate report 6
                    break;
                case 'report7':
                    //-- Report Title: Students at risk
                    //-- Business Question: What students are at risk of failling specific subjects
                    //-- Why this report is useful: Allows a view on students which may require more assistance in tests
                    //-- Tables used: Student, Test, Test-Student
                    // Ask the database for the three fields we want to show.



                    const sql = 'SELECT DISTINCT s.Student_ID, s.Forename, s.Surname FROM Student s JOIN Test_Student ts ON s.Student_ID = ts.Student_ID JOIN Test t ON ts.Test_ID = t.Test_ID WHERE ts.Score < t.Pass_Marks ;';

                    const data = await getReportData(sql);

                    const table = document.createElement('table');
                    const thead = document.createElement('thead');
                    const tbody = document.createElement('tbody');

                    const headerRow = document.createElement('tr');
                    const headers = ['Student ID', 'Forename', 'Surname'];

                    for (let header of headers) {
                        const th = document.createElement('th');
                        th.textContent = header;
                        headerRow.appendChild(th);
                    }
                    thead.appendChild(headerRow);
                    table.appendChild(thead);
                    table.appendChild(tbody);

                    for (let row of data) {
                        const tr = document.createElement('tr');
                        const tdId = document.createElement('td');
                        tdId.textContent = row.Student_ID;
                        const tdForename = document.createElement('td');
                        tdForename.textContent = row.Forename;
                        const tdSurname = document.createElement('td');
                        tdSurname.textContent = row.Surname;

                        tr.appendChild(tdId);
                        tr.appendChild(tdForename);
                        tr.appendChild(tdSurname);
                        tbody.appendChild(tr);
                    }

                    tableContainer.appendChild(table);

                    console.log('got here');
                    break;
                case 'report8':
                    //-- Report Title: Test pass rates
                    //-- Business Question: What is the most difficult test?
                    //-- Why this report is useful: Allows a view on test past rates
                    //-- Tables used: Test, Test-Student
                    // Ask the database for the three fields we want to show.
                    const pass_Sql = 'SELECT t.Test_ID, t.Name, COUNT(ts.Score) AS Total_Pass_Fail, 100 * AVG( (CASE WHEN ts.Score > t.Pass_Marks THEN 1.0 ELSE 0.0 END) ) AS Percentage_Pass FROM Test t LEFT JOIN Test_Student ts ON t.Test_ID = ts.Test_ID GROUP BY t.Test_ID;';

                    const pass_Data = await getReportData(pass_Sql);

                    console.log(pass_Data);

                    let chart_Labels = [];
                    let pass_Rate = [];

                    for (let row of pass_Data) {
                        chart_Labels.push(row.Name);
                        pass_Rate.push(row.Percentage_Pass);
                    }

                    chart = new Chart(reportOutput, {
                        type: 'line',
                        data: {
                            labels: chart_Labels,
                            datasets: [
                                {
                                    label: 'Pass Rate',
                                    data: pass_Rate
                                }
                            ]
                        },
                            options: {
                                responsive: true,
                                plugins: {
                                    legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'Percentage Pass Rate by Test'
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    max: 100
                                }
                            }
                        }                    
                    });

                    reportOutput.style.width = '1000px';
                    reportOutput.style.height = '500px';

                    break;
                case 'report9':
                    //-- Report Title: Disability Gender Split
                    //-- Business Question: What disabilities are more common in what gender
                    //-- Why this report is useful: Allows the ability to view trends of disability development in students
                    //-- Tables used: Student, Disability, Student_Disability_Support
                    
                    const gender_Sql = 'SELECT d.Disability_Name, s.Gender, COUNT(*) AS Total FROM Student s JOIN Student_Disability_Support sds ON s.Student_ID = sds.Student_ID JOIN Disability d ON sds.Disability_ID = d.Disability_ID GROUP BY d.Disability_Name, s.Gender ORDER BY d.Disability_Name, s.Gender;';

                    const gender_Data = await getReportData(gender_Sql);

                    console.log(gender_Data);

                    let chartLabels = [];
                    let Total = [];

                    for (let row of gender_Data) {
                        chartLabels.push(row.Disability_Name +" (" + row.Gender +")");
                        Total.push(row.Total);
                    }

                    chart = new Chart(reportOutput, {
                            type: 'pie',
                            data: {
                                labels: chartLabels,
                                datasets: [{
                                    data: Total
                                }]
                            },
                            options: {
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'left',
                                    },
                                    title: {
                                        display: true,
                                        text: 'Number of Students by Gender and Disability'
                                    }
                                }
                        }
                    });


                    reportOutput.style.width = '500px';
                    reportOutput.style.height = '500px';
                break;
                case 'report10': {
                    //-- Report Title: Top 10 Performing Students with Disabilities
                    //-- Business Question: Which students with disabilities have the highest average scores?
                    const sql10 = 'SELECT s.Forename, s.Surname, d.Disability_Name, d.Category, ROUND(AVG(ts.Score), 2) AS Average_Score FROM Student s INNER JOIN Test_Student ts ON s.Student_ID = ts.Student_ID INNER JOIN Student_Disability_Support sds ON s.Student_ID = sds.Student_ID INNER JOIN Disability d ON sds.Disability_ID = d.Disability_ID GROUP BY s.Student_ID, s.Forename, s.Surname, d.Disability_Name, d.Category ORDER BY Average_Score DESC LIMIT 10;';

                    const data10 = await getReportData(sql10);

                    const table10 = document.createElement('table');
                    const thead10 = document.createElement('thead');
                    const tbody10 = document.createElement('tbody');

                    const headerRow10 = document.createElement('tr');
                    const headers10 = ['First Name', 'Surname', 'Disability', 'Category', 'Average Score'];
                    for (let header of headers10) {
                        const th = document.createElement('th');
                        th.textContent = header;
                        headerRow10.appendChild(th);
                    }
                    thead10.appendChild(headerRow10);
                    table10.appendChild(thead10);

                    for (let row of data10) {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `<td>${row.Forename}</td><td>${row.Surname}</td><td>${row.Disability_Name}</td><td>${row.Category}</td><td>${row.Average_Score}</td>`;
                        tbody10.appendChild(tr);
                    }
                    table10.appendChild(tbody10);
                    tableContainer.appendChild(table10);

                    const labels10 = data10.map(row => `${row.Forename} ${row.Surname}`);
                    const scores10 = data10.map(row => row.Average_Score);

                    chart = new Chart(reportOutput, {
                        type: 'bar',
                        data: {
                            labels: labels10,
                            datasets: [{
                                label: 'Average Score',
                                data: scores10,
                                backgroundColor: '#2C666E'
                            }]
                        },
                        options: {
                            responsive: true,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Top 10 Performing Students with Disabilities'
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    max: 100
                                },
                                x: {
                                    ticks: {
                                        autoSkip: false,
                                        maxRotation: 45,
                                        minRotation: 45
                                    }
                                }
                            }
                        }
                    });

                    reportOutput.style.width = '1000px';
                    reportOutput.style.height = '500px';
                    break;
                }
                case 'report11': {
                    //-- Report Title: Performance by Credential Type for Students with Disabilities
                    //-- Business Question: Which qualification level do disabled students struggle with most?
                    const sql11 = 'SELECT sub.Credential_Type, COUNT(DISTINCT ts.Student_ID) AS Total_Students, ROUND(AVG(ts.Score), 2) AS Average_Score, ROUND(100 * SUM(CASE WHEN ts.Score >= t.Pass_Marks THEN 1 ELSE 0 END) / COUNT(*), 2) AS Pass_Rate FROM Subject sub INNER JOIN Test t ON sub.Subject_ID = t.Subject_ID INNER JOIN Test_Student ts ON t.Test_ID = ts.Test_ID INNER JOIN Student_Disability_Support sds ON ts.Student_ID = sds.Student_ID GROUP BY sub.Credential_Type ORDER BY Average_Score DESC;';

                    const data11 = await getReportData(sql11);

                    // Filter dropdown
                    const filter11Label = document.createElement('label');
                    filter11Label.textContent = 'Filter by Credential Type: ';
                    filter11Label.className = 'select-label';
                    filter11Label.htmlFor = 'credentialFilter';

                    const filter11 = document.createElement('select');
                    filter11.id = 'credentialFilter';
                    filter11.className = 'select-dropdown';

                    for (let option of ['All', 'A-level', 'GCSE', 'BTEC', 'Key Stage']) {
                        const opt = document.createElement('option');
                        opt.value = option;
                        opt.textContent = option;
                        filter11.appendChild(opt);
                    }

                    tableContainer.appendChild(filter11Label);
                    tableContainer.appendChild(filter11);

                    // Table
                    const table11 = document.createElement('table');
                    const thead11 = document.createElement('thead');
                    const tbody11 = document.createElement('tbody');

                    const headerRow11 = document.createElement('tr');
                    const headers11 = ['Credential Type', 'Total Students', 'Average Score', 'Pass Rate'];
                    for (let header of headers11) {
                        const th = document.createElement('th');
                        th.textContent = header;
                        headerRow11.appendChild(th);
                    }
                    thead11.appendChild(headerRow11);
                    table11.appendChild(thead11);
                    table11.appendChild(tbody11);
                    tableContainer.appendChild(table11);

                    const buildTable11 = (filterValue) => {
                        tbody11.innerHTML = '';
                        const filtered = filterValue === 'All'
                            ? data11
                            : data11.filter(row => row.Credential_Type === filterValue);
                        for (let row of filtered) {
                            const tr = document.createElement('tr');
                            tr.innerHTML = `<td>${row.Credential_Type}</td><td>${row.Total_Students}</td><td>${row.Average_Score}</td><td>${row.Pass_Rate}%</td>`;
                            tbody11.appendChild(tr);
                        }
                    };

                    buildTable11('All');

                    filter11.addEventListener('change', (event) => {
                        buildTable11(event.target.value);
                    });

                    break;
                }
                case 'report12': {
                    //-- Report Title: Teacher Workload for SEN Classes
                    //-- Business Question: How many classes supporting students with disabilities does each teacher have?
                    const sql12 = 'SELECT t.Title, t.Forename, t.Surname, COUNT(DISTINCT tc.Class_ID) AS Total_Classes, COUNT(DISTINCT sds.Student_ID) AS Total_SEN_Students FROM Teacher t LEFT JOIN Teacher_Class tc ON t.Teacher_ID = tc.Teacher_ID LEFT JOIN Student_Class sc ON tc.Class_ID = sc.Class_ID LEFT JOIN Student_Disability_Support sds ON sc.Student_ID = sds.Student_ID GROUP BY t.Teacher_ID, t.Title, t.Forename, t.Surname ORDER BY Total_SEN_Students DESC;';

                    const data12 = await getReportData(sql12);

                    const table12 = document.createElement('table');
                    const thead12 = document.createElement('thead');
                    const tbody12 = document.createElement('tbody');

                    const headerRow12 = document.createElement('tr');
                    const headers12 = ['Title', 'First Name', 'Surname', 'Total Classes', 'Total SEN Students'];
                    for (let header of headers12) {
                        const th = document.createElement('th');
                        th.textContent = header;
                        headerRow12.appendChild(th);
                    }
                    thead12.appendChild(headerRow12);
                    table12.appendChild(thead12);

                    for (let row of data12) {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `<td>${row.Title}</td><td>${row.Forename}</td><td>${row.Surname}</td><td>${row.Total_Classes}</td><td>${row.Total_SEN_Students}</td>`;
                        tbody12.appendChild(tr);
                    }
                    table12.appendChild(tbody12);
                    tableContainer.appendChild(table12);
                    break;
                }
                default: 
                    tableContainer.textContent = 'Please select a report to view.';
            }
        });

        const getReportData = async (sql) => {
            const result = await runQuery(sql);

            if (!result || !result.success) {
                showMessage('Error fetching report data: ' + (result ? result.error : 'No result returned'), 'error');
                return null;
            }

            return result.data;
        }

        const getReportDataFromSqlData = (sqlData) => {
            let data = [];
            let labels = [];

            for (let row of sqlData.data) {
                labels.push(Object.values(row)[1]);
                data.push(Object.values(row)[0]);
            }

            return { labels: labels, data: data };
        }

        const getAverageMarksFromStudentIds = async (studentIds) => {
            
            const studentTestResults = await Promise.all(
                studentIds.map(studentId => getStudentMarksForTest(studentId))
            );
            const testResultsByStudent = studentTestResults.map(result => result.data);
            const averageMarksPerStudent = studentIds.map((studentId, index) => {
                const studentArray = testResultsByStudent[index];

                if(!studentArray || studentArray.length === 0){
                    return {
                        studentId,
                        average: 0
                    };
                }

                const total = studentArray.reduce(
                    (sum, r) => sum + parseFloat(r.Score),
                    0
                );

                const ave = Number((total / studentArray.length).toFixed(2));

                return {
                    studentId,
                    average: ave
                };
            });
                    
            const marks = averageMarksPerStudent.map(r => parseFloat(r.average));
                    
            const totalAverageMarks = marks.reduce((sum, average) => sum + average, 0).toFixed(2);

            const averageMark = totalAverageMarks / studentIds.length;

            return averageMark;
        };

        let selectAssistance;
        let selectStudent;

        const createOptions = async () => {

            /* Create a div wrapper */
            const wrapper = document.createElement('div');
            wrapper.className = 'select-wrapper';

            const textwrapper = document.createElement('div');
            textwrapper.className = 'text-wrapper';

            const label1 = document.createElement('label');
            label1.textContent = 'Select student or filter a student based on assistance or non-assistance:';
            label1.className = 'select-label';
            label1.htmlFor = 'selectAssistanceOrNot';

            /* Combo-box 1 for chosing assistance */
            selectAssistance = document.createElement('select');
            selectAssistance.id = 'selectAssistanceOrNot';
            selectAssistance.className = 'select-dropdown';

            const defaultChoice1 = document.createElement('option');
            defaultChoice1.value = '';
            defaultChoice1.textContent = 'Select assistance or non-assistance';
            selectAssistance.appendChild(defaultChoice1);

            const optionAssistance = document.createElement('option');
            optionAssistance.value = 'Assistance';
            optionAssistance.textContent = 'Assistance';
            selectAssistance.appendChild(optionAssistance);

            const optionNonAssistance = document.createElement('option');
            optionNonAssistance.value = 'Non-assistance';
            optionNonAssistance.textContent = 'NonAssistance';
            selectAssistance.appendChild(optionNonAssistance);


            /* Combo-box 2 for student*/

            selectStudent = document.createElement('select');
            selectStudent.id = 'selectStudent';
            selectStudent.className = 'select-dropdown';

            const defaultChoice2 = document.createElement('option');
            defaultChoice2.value = '';
            defaultChoice2.textContent = 'Select a student';
            selectStudent.appendChild(defaultChoice2);

            const noFilter = await getAllStudents();
            await populateStudentSelect(noFilter.data);

            selectAssistance.addEventListener('change', async (event) => {
                const selected = event.target.value;

                let result;

                if (selected === 'Assistance') {
                    result = await getStudentsWithAssistance();
                } else if (selected === 'Non-assistance') {
                    result = await getStudentsWithoutAssistance();
                } else {
                    result = await getAllStudents();
                }

                await populateStudentSelect(result.data);
            });
            

            wrapper.appendChild(selectAssistance);
            wrapper.appendChild(selectStudent);
            textwrapper.appendChild(label1);
            textwrapper.appendChild(wrapper);
            addElement(textwrapper);
        };

        let selectClass;

        const createClassOptions = async () => {

            const wrapper = document.createElement('div');
            wrapper.className = 'select-wrapper';

            selectClass = document.createElement('select');
            selectClass.id = 'selectClass';
            selectClass.className = 'select-dropdown';

            const allClasses = await getEveryClassNoDups();
            populateClassSelect(allClasses.data);

            wrapper.appendChild(selectClass);
            const selectWrapper = document.getElementById('class-select-wrapper');
            if(selectWrapper) {
                selectWrapper.appendChild(wrapper);
            } else {
                addElement(wrapper);
            }
        };

        const populateClassSelect = async (classes) => {
            selectClass.innerHTML = '';
            const startOption = document.createElement('option');
            startOption.value = '';
            startOption.textContent = 'Select a class to view:';

            selectClass.appendChild(startOption);

            for(let row of classes) {
                const option = document.createElement('option');
                option.value = row.Class_ID;
                const name = await getNameOfAClass(row.Class_ID);
                const className = name.data;
                option.textContent = `Class: ${row.Class_ID}, Title: ${className[0].Class_Name}`;
                selectClass.appendChild(option);
            }
        };

        const populateStudentSelect = async (students) => {
            selectStudent.innerHTML = '';
            const startOption = document.createElement('option');
            startOption.value = '';
            startOption.textContent = 'Select a student bellow:';
            selectStudent.appendChild(startOption);

            for (let row of students) {
                const option = document.createElement('option');
                option.value = row.Student_ID;
                option.textContent = `ID:${row.Student_ID} ${row.Forename} ${row.Surname}`;
                selectStudent.appendChild(option);
            }
        }

        const addElement = (element) => {
            tableContainer.appendChild(element);
        };

        
    </script>
</body>
</html>