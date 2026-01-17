document.addEventListener('DOMContentLoaded', () => {
    // --- DOM ELEMENTS ---
    const landingScreen = document.getElementById('landingScreen');
    const loginScreen = document.getElementById('loginScreen');
    const appContainer = document.getElementById('appContainer');
    const startProgramBtn = document.getElementById('startProgram');
    const loginForm = document.getElementById('loginForm');
    const loginPassword = document.getElementById('loginPassword');
    const loginError = document.getElementById('loginError');

    // Views
    const cardsView = document.getElementById('cardsView');
    const ganttView = document.getElementById('ganttView');
    const calendarView = document.getElementById('calendarView');
    const viewTabs = document.querySelectorAll('.view-tab');

    // Filter Elements
    const searchInput = document.getElementById('searchInput');
    const filterTool = document.getElementById('filterTool');
    const filterWith = document.getElementById('filterWith');
    const filterStatus = document.getElementById('filterStatus');
    const btnReset = document.getElementById('btnReset');

    // KPI Container
    const kpisContainer = document.getElementById('kpisContainer');

    // Modal Elements
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const btnCancelEdit = document.getElementById('btnCancelEdit');
    const btnSaveEdit = document.getElementById('btnSaveEdit');
    const btnDeleteTask = document.getElementById('btnDeleteTask');
    const btnAddTask = document.getElementById('btnAddTask');
    const modalTitle = document.getElementById('modalTitle');

    // Edit Form Elements
    const editIndex = document.getElementById('editIndex');
    const editTool = document.getElementById('editTool'); // Tarea
    const editGroup = document.getElementById('editGroup'); // Categoria
    const editWhy = document.getElementById('editWhy');
    const editDate = document.getElementById('editDate');
    const editDuration = document.getElementById('editDuration');
    const editStatus = document.getElementById('editStatus');
    const editHStart = document.getElementById('editHStart');
    const editHEnd = document.getElementById('editHEnd');
    const editHow = document.getElementById('editHow');
    const editWith = document.getElementById('editWith');
    const editHelp = document.getElementById('editHelp');
    const editVideos = document.getElementById('editVideos');
    const editFact = document.getElementById('editFact');
    const editProfile = document.getElementById('editProfile');

    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');

    // --- DATA STORE ---
    let tasks = []; // Will be populated on login
    let currentUser = null;

    // Default Tasks (Template)
    const baseTasks = [
        {
            category: "Partir",
            tool: "Meet",
            why: "Punto de encuentro",
            date: "2026-01-19",
            hStart: "09:00",
            hEnd: "09:10",
            how: "Google meet",
            duration: "0:10",
            with: "Tobías",
            help: "Intro basica, botones, accesos, configuraciones.",
            videos: "",
            fact: "",
            profile: "",
            status: "Pendiente"
        },
        // ... (truncated for brevity, logic will clone this)
    ];

    // Full Dataset for Rafael (Original)
    const rafaTasks = [
        {
            category: "Partir",
            tool: "Meet",
            why: "Punto de encuentro",
            date: "2026-01-19",
            hStart: "09:00",
            hEnd: "09:10",
            how: "Google meet",
            duration: "0:10",
            with: "Tobías",
            help: "Intro basica, botones, accesos, configuraciones.",
            videos: "",
            fact: "",
            profile: "",
            status: "Pendiente"
        },
        {
            category: "Partir",
            tool: "Notion",
            why: "Banco de trabajo",
            date: "2026-01-19",
            hStart: "09:10",
            hEnd: "09:35",
            how: "Google meet",
            duration: "0:25",
            with: "Tobías",
            help: "Intro, asistir a crear cuenta, primer pagina",
            videos: "",
            fact: "",
            profile: "",
            status: "Pendiente"
        },
        {
            category: "Partir",
            tool: "Gmail",
            why: "Necesaria para todas las demas herramientas",
            date: "2026-01-19",
            hStart: "09:35",
            hEnd: "09:45",
            how: "Google meet",
            duration: "0:10",
            with: "Tobias",
            help: "Explicar el porque es necesario y que es el punto de entrada al ecosistema de google",
            videos: "",
            fact: "",
            profile: "",
            status: "Pendiente"
        },
        {
            category: "Partir",
            tool: "Calendar",
            why: "Organizar tu tiempo",
            date: "2026-01-19",
            hStart: "09:45",
            hEnd: "09:50",
            how: "Google meet",
            duration: "0:05",
            with: "Tobias",
            help: "Explicar porque es fundamental para modelo GTD, mirar videos de como funciona calendar autonomo.",
            videos: "",
            fact: "",
            profile: "",
            status: "Pendiente"
        },
        {
            category: "Aprendiendo",
            tool: "Youtube",
            why: "Aprende NOTION la navaja suiza de las herramientas",
            date: "2026-01-19",
            hStart: "09:50",
            hEnd: "11:20",
            how: "Youtube",
            duration: "1:30",
            with: "Autonomo",
            help: "Busca videos relacionados a los temas vistos",
            videos: "https://www.youtube.com/watch?v=hBomH8TZwQo&list=PLWji3OEqhByRc2fq-E4roydyZrzutZtyw\nhttps://www.youtube.com/watch?v=WL88GdC073E&list=PLWji3OEqhByRc2fq-E4roydyZrzutZtyw&index=4\nhttps://www.youtube.com/watch?v=0QOyEIKDIoc&list=PLWji3OEqhByRc2fq-E4roydyZrzutZtyw&index=5\nhttps://www.youtube.com/watch?v=KB4_BD4DKkY&list=PLWji3OEqhByRc2fq-E4roydyZrzutZtyw&index=6\nhttps://www.youtube.com/watch?v=911ZGBQiKyc&list=PLWji3OEqhByStF5muPTKFpeVkulI29Q5y\nhttps://www.youtube.com/watch?v=mZY5AmMHwws&t=4s",
            fact: "",
            profile: "",
            status: "Pendiente"
        },
        {
            category: "Aprendiendo",
            tool: "GTD",
            why: "Despeja su cerebro",
            date: "2026-01-20",
            hStart: "09:00",
            hEnd: "09:20",
            how: "Youtube",
            duration: "0:20",
            with: "Autonomo",
            help: "Aprender la metodologia",
            videos: "https://www.youtube.com/watch?v=QBzmMrxTxWw",
            fact: "",
            profile: "",
            status: "Pendiente"
        },
        {
            category: "Practicando",
            tool: "Resumen GTD en Notion",
            why: "Internalizar la metodología",
            date: "2026-01-20",
            hStart: "09:20",
            hEnd: "10:20",
            how: "Notion",
            duration: "1:00",
            with: "Autonomo",
            help: "Que pueda poner en practica la técnica, crea una pagina, incluye un resumen, imagenes, links....lo que quieras! ponle ganas!!",
            videos: "",
            fact: "",
            profile: "",
            status: "Pendiente"
        },
        {
            category: "Guia Asistida",
            tool: "Herramienta GTD Sheet",
            why: "Aprende como poner en practica",
            date: "2026-01-20",
            hStart: "16:00",
            hEnd: "16:15",
            how: "Google meet",
            duration: "0:15",
            with: "Tobias",
            help: "Introduccion al uso de la herramienta",
            videos: "",
            fact: "",
            profile: "",
            status: "Pendiente"
        },
        {
            category: "Practicando",
            tool: "Practica GTD",
            why: "Organiza tu agenda real",
            date: "2026-01-20",
            hStart: "10:20",
            hEnd: "11:05",
            how: "Google Sheet",
            duration: "0:45",
            with: "Autonomo",
            help: "Que pueda poner en practica la técnica",
            videos: "",
            fact: "",
            profile: "",
            status: "Pendiente"
        },
        {
            category: "Aprendiendo",
            tool: "Ingenieria de Contexto",
            why: "Es el secreto de como \"Pedir\" a la IA",
            date: "2026-01-21",
            hStart: "14:00",
            hEnd: "14:45",
            how: "Youtube",
            duration: "0:45",
            with: "Autonomo",
            help: "Que pueda poner en practica la técnica",
            videos: "https://www.youtube.com/watch?v=Ukp4-EP24ns",
            fact: "",
            profile: "",
            status: "Pendiente"
        },
        {
            category: "Practicando",
            tool: "Practica Prompt vs Contexto",
            why: "Practica con IA",
            date: "2026-01-21",
            hStart: "14:45",
            hEnd: "15:30",
            how: "Gemini",
            duration: "0:45",
            with: "Autonomo",
            help: "Pone en practica lo aprendido sobre promt vs ingenieria de contexto, practica busqueda de resultados con ambos estilos de promtp y un mismo objetivo, por ejemplo \"Anlisis abreviado del ultimo partido del Atleti, desde la vision del Cholo Simeone",
            videos: "",
            fact: "fanatico del Atletico de Madrid",
            profile: "Pasion",
            status: "Pendiente"
        },
        {
            category: "Practicando",
            tool: "Documentar en notion lo aprendido",
            why: "Para tener una Bitacora de prompts utiles",
            date: "2026-01-21",
            hStart: "15:30",
            hEnd: "16:00",
            how: "Notion",
            duration: "0:30",
            with: "Autonomo",
            help: "crea una pagina en notion y documenta los prompts",
            videos: "",
            fact: "",
            profile: "",
            status: "Pendiente"
        },
        {
            category: "Guia Asistida",
            tool: "Llamada de seguimiento",
            why: "Analisamos ultimos objetivos",
            date: "2026-01-21",
            hStart: "16:00",
            hEnd: "16:10",
            how: "Google meet",
            duration: "0:10",
            with: "Tobias",
            help: "Evaluar si la ingenieria de contexto se entendio de manera adecuada",
            videos: "",
            fact: "",
            profile: "",
            status: "Pendiente"
        },
        {
            category: "Aprendiendo",
            tool: "Notebook llm",
            why: "La herramienta por excelencia para estudiantes",
            date: "2026-01-22",
            hStart: "14:00",
            hEnd: "16:00",
            how: "Youtube",
            duration: "2:00",
            with: "Autonomo",
            help: "Ver tutorial al ritmo propio de la herramienta",
            videos: "https://youtu.be/oxa2hLljQUk?si=xE6Rs-QNDSwZDZrq",
            fact: "",
            profile: "",
            status: "Pendiente"
        },
        {
            category: "Practicando",
            tool: "Notebook llm",
            why: "Practica con Notebook LLM",
            date: "2026-01-23",
            hStart: "14:00",
            hEnd: "15:00",
            how: "Notebook LLM",
            duration: "1:00",
            with: "Autonomo",
            help: "Poner en practica el uso de todas las herramientas que ofrece la Plataforma, usando temas de interes como autos o deporte.",
            videos: "",
            fact: "fanatico del Atletico de Madrid",
            profile: "Pasion",
            status: "Pendiente"
        },
        {
            category: "Practicando",
            tool: "Notion",
            why: "Puesta en practica",
            date: "2026-01-23",
            hStart: "15:00",
            hEnd: "16:00",
            how: "Notion",
            duration: "1:00",
            with: "Autonomo",
            help: "Armar una pagina completa en notion, utilizando todo el material que se genero con Notebook LLM del tema de interes.",
            videos: "",
            fact: "fanatico del Atletico de Madrid",
            profile: "Pasion",
            status: "Pendiente"
        },
        {
            category: "Guia Asistida",
            tool: "AppScript",
            why: "Te enseño como Crear una applicacion",
            date: "2026-01-26",
            hStart: "14:00",
            hEnd: "14:45",
            how: "AppScript",
            duration: "0:45",
            with: "Tobias",
            help: "Crear applicacion de toma de notas registro de imagenes",
            videos: "",
            fact: "",
            profile: "",
            status: "Pendiente"
        },
        {
            category: "Practicando",
            tool: "AppScript",
            why: "Crear applicacion",
            date: "2026-01-26",
            hStart: "14:45",
            hEnd: "16:05",
            how: "AppScript",
            duration: "1:20",
            with: "Autonomo",
            help: "Crear app de registro de rutinas de gym",
            videos: "",
            fact: "Va al GYM",
            profile: "Hobby",
            status: "Pendiente"
        },
        {
            category: "Guia Asistida",
            tool: "AppScript",
            why: "Que aprendiste?",
            date: "2026-01-27",
            hStart: "14:00",
            hEnd: "14:45",
            how: "Google meet",
            duration: "0:45",
            with: "Tobias",
            help: "Repasemos todo lo aprendido y descubramos para donde quiere seguir.",
            videos: "",
            fact: "",
            profile: "",
            status: "Pendiente"
        }
    ];

    // USERS DATABASE with Full Profiles
    const USERS = {
        'Madrid': {
            // Basic Info
            id: 'user_rafael',
            username: 'Rafael',
            fullName: 'Rafael García',
            password: 'Madrid',
            age: 25,
            profilePicture: null, // Will store base64 or blob URL
            bio: 'Fanático del Atleti, aprendiendo IA para automatizar mi vida',

            // Interests
            passion: 'Atletico de Madrid',
            hobby: 'GYM',
            learningGoal: 'Dominar IA y automatización',

            // Skills (tool: level)
            skills: {
                'Notion': 'intermedio',
                'ChatGPT': 'avanzado',
                'Google Sheets': 'basico',
                'Google Calendar': 'intermedio'
            },

            // Preferences
            preferences: {
                learningStyle: 'practico',
                sessionDuration: '1hr',
                preferredTime: 'tarde',
                availableDays: ['lun', 'mie', 'vie'],
                theme: 'dark',
                language: 'es',
                notifications: 'whatsapp',
                timezone: 'America/Santiago'
            },

            // Contact
            contact: {
                email: 'rafael@example.com',
                whatsapp: '+56949111755',
                linkedin: ''
            },

            // Metadata
            metadata: {
                createdAt: '2026-01-17',
                lastLogin: new Date().toISOString(),
                tasksCompleted: 0,
                totalHours: 0
            },

            // Legacy fields
            name: 'Rafael',
            subtitle: 'Ecosistema Google + Notion + IA',
            description: 'Un programa diseñado especialmente para ti, Rafael. Aprenderás a usar el ecosistema de Google, Notion, e Inteligencia Artificial para potenciar tu productividad.',
            tasks: JSON.parse(JSON.stringify(rafaTasks))
        },
        'Papu': {
            // Basic Info
            id: 'user_brayan',
            username: 'Brayan',
            fullName: 'Brayan Rodríguez',
            password: 'Papu',
            age: 28,
            profilePicture: null,
            bio: 'Maestro de la parrilla y fanático de los autos',

            // Interests
            passion: 'Autos de carrera',
            hobby: 'Parrilladas',
            learningGoal: 'Usar IA para optimizar recetas y mecánica',

            // Skills
            skills: {
                'YouTube': 'avanzado',
                'Google Meet': 'intermedio',
                'ChatGPT': 'basico'
            },

            // Preferences
            preferences: {
                learningStyle: 'visual',
                sessionDuration: '30min',
                preferredTime: 'noche',
                availableDays: ['mar', 'jue', 'sab'],
                theme: 'dark',
                language: 'es',
                notifications: 'email',
                timezone: 'America/Santiago'
            },

            // Contact
            contact: {
                email: 'brayan@example.com',
                whatsapp: '',
                linkedin: ''
            },

            // Metadata
            metadata: {
                createdAt: '2026-01-17',
                lastLogin: new Date().toISOString(),
                tasksCompleted: 0,
                totalHours: 0
            },

            // Legacy fields
            name: 'Brayan',
            subtitle: 'Parrilladas + Autos de carrera',
            description: 'Un programa diseñado especialmente para ti, Brayan. Analizaremos técnicas de cocina al aire libre y optimización de vehículos de alta velocidad.',
            tasks: JSON.parse(JSON.stringify(rafaTasks)).map(t => {
                if (t.category === 'Practicando') {
                    return { ...t, help: t.help + " (Enfocado en Parrilladas o Autos)" };
                }
                return t;
            })
        }
    };

    // --- THEME LOGIC ---
    const themeBtn = document.getElementById('themeToggleBtn');

    if (themeBtn) {
        const sunIcon = themeBtn.querySelector('.sun-icon');
        const moonIcon = themeBtn.querySelector('.moon-icon');

        // Load Theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeBtn.addEventListener('click', () => {
            const current = document.body.getAttribute('data-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            if (theme === 'dark') {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            } else {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            }
        }
    }

    // --- NAVIGATION LOGIC ---
    if (startProgramBtn) {
        startProgramBtn.addEventListener('click', () => {
            landingScreen.style.display = 'none';
            loginScreen.style.display = 'flex';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = loginPassword.value.trim();

            if (USERS[password]) {
                // AUTH SUCCESS
                currentUser = USERS[password];

                // Load tasks from localStorage or use default
                const savedTasks = localStorage.getItem(`tasks_${currentUser.id}`);
                if (savedTasks) {
                    tasks = JSON.parse(savedTasks);
                } else {
                    tasks = JSON.parse(JSON.stringify(currentUser.tasks)); // Clone default tasks
                }

                // Update UI with User Info
                const headerName = document.getElementById('headerUserName');
                const headerSubtitle = document.getElementById('headerUserSubtitle');
                const headerUserNameShort = document.getElementById('headerUserNameShort');
                const userAvatarSmall = document.getElementById('userAvatarSmall');
                const landingDesc = document.getElementById('landingDescription');

                if (headerName) headerName.textContent = currentUser.name; // e.g. "Brayan"
                if (headerSubtitle) headerSubtitle.textContent = currentUser.name + ' — ' + currentUser.subtitle;
                if (headerUserNameShort) headerUserNameShort.textContent = currentUser.name; // FIX: Update short name
                if (userAvatarSmall) userAvatarSmall.textContent = currentUser.name.charAt(0).toUpperCase(); // FIX: Update avatar initial
                if (landingDesc) landingDesc.textContent = currentUser.description;

                loginScreen.style.display = 'none';
                appContainer.style.display = 'block';
                // Ensure background follows theme, not hardcoded
                // document.body.style.backgroundColor = 'var(--bg-dark)'; 

                initApp();

                // Show welcome popup if first visit
                checkAndShowWelcome();
            } else {
                loginError.style.display = 'block';
                loginForm.classList.add('shake');
                setTimeout(() => loginForm.classList.remove('shake'), 500);
            }
        });
    }

    if (loginPassword) {
        loginPassword.addEventListener('input', () => {
            loginError.style.display = 'none';
        });
    }


    // --- APP LOGIC ---

    function initApp() {
        populateFilters();
        renderAll();
        updateKPIs();

        // Event Listeners for Filters
        searchInput.addEventListener('input', renderAll);
        filterTool.addEventListener('change', renderAll);
        filterWith.addEventListener('change', renderAll);
        filterStatus.addEventListener('change', renderAll);
        btnReset.addEventListener('click', resetFilters);

        // View Tabs
        viewTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                viewTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const viewType = tab.dataset.view;
                if (viewType === 'cards') {
                    cardsView.classList.add('active');
                    ganttView.style.display = 'none';
                    calendarView.style.display = 'none';
                    renderCards(getFilteredTasks());
                } else if (viewType === 'gantt') {
                    cardsView.classList.remove('active');
                    ganttView.style.display = 'block';
                    calendarView.style.display = 'none';
                    renderGantt(getFilteredTasks());
                } else if (viewType === 'calendar') {
                    cardsView.classList.remove('active');
                    ganttView.style.display = 'none';
                    calendarView.style.display = 'block';
                    renderCalendar(getFilteredTasks());
                }
            });
        });

        // Add Task Button
        btnAddTask.addEventListener('click', () => {
            openModal(null);
        });

        // Modal Actions
        modalClose.addEventListener('click', closeModal);
        btnCancelEdit.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });

        btnSaveEdit.addEventListener('click', saveTask);
        btnDeleteTask.addEventListener('click', deleteTask);
    }

    function populateFilters() {
        // Unique Tools
        const tools = [...new Set(tasks.map(t => t.tool))].sort();
        filterTool.innerHTML = '<option value="(Todos)">(Todos)</option>' +
            tools.map(t => `<option value="${t}">${t}</option>`).join('');

        // Unique People
        const people = [...new Set(tasks.map(t => t.with))].sort();
        filterWith.innerHTML = '<option value="(Todos)">(Todos)</option>' +
            people.map(p => `<option value="${p}">${p}</option>`).join('');
    }

    function getFilteredTasks() {
        const term = searchInput.value.toLowerCase();
        const fTool = filterTool.value;
        const fWith = filterWith.value;
        const fStatus = filterStatus.value;

        return tasks.filter(task => {
            const matchesTerm = (
                task.tool.toLowerCase().includes(term) ||
                task.category.toLowerCase().includes(term) ||
                task.why.toLowerCase().includes(term) ||
                task.help.toLowerCase().includes(term)
            );
            const matchesTool = fTool === '(Todos)' || task.tool === fTool;
            const matchesWith = fWith === '(Todos)' || task.with === fWith;
            const matchesStatus = fStatus === '(Todos)' || task.status === fStatus;

            return matchesTerm && matchesTool && matchesWith && matchesStatus;
        });
    }

    function renderAll() {
        const filtered = getFilteredTasks();
        renderCards(filtered);
        // Only render active view to save resources, but for simplicity:
        if (ganttView.style.display !== 'none') renderGantt(filtered);
        if (calendarView.style.display !== 'none') renderCalendar(filtered);
        updateKPIs(filtered);
    }

    function resetFilters() {
        searchInput.value = '';
        filterTool.value = '(Todos)';
        filterWith.value = '(Todos)';
        filterStatus.value = '(Todos)';
        renderAll();
    }

    function updateKPIs(filteredTasks = tasks) {
        const total = filteredTasks.length;
        const pending = filteredTasks.filter(t => t.status === 'Pendiente').length;
        const inProgress = filteredTasks.filter(t => t.status === 'En curso').length;
        const completed = filteredTasks.filter(t => t.status === 'Completada').length;
        // Calculate completion %
        const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

        kpisContainer.innerHTML = `
            <div class="kpi-card">
                <div class="kpi-value">${total}</div>
                <div class="kpi-label">Total Tareas</div>
            </div>
             <div class="kpi-card">
                <div class="kpi-value">${percent}%</div>
                <div class="kpi-label">Progreso</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-value" style="color: var(--warning)">${pending}</div>
                <div class="kpi-label">Pendientes</div>
            </div>
             <div class="kpi-card">
                <div class="kpi-value" style="color: var(--success)">${completed}</div>
                <div class="kpi-label">Completadas</div>
            </div>
        `;
    }

    // --- RENDERERS ---

    function renderCards(taskList) {
        cardsView.innerHTML = '';
        if (taskList.length === 0) {
            cardsView.innerHTML = '<p style="color:var(--text-muted); text-align:center; grid-column: 1/-1;">No se encontraron tareas.</p>';
            return;
        }

        // Group by Date
        const byDate = {};
        taskList.forEach(task => {
            if (!byDate[task.date]) byDate[task.date] = [];
            byDate[task.date].push(task);
        });

        // Sort Dates
        const sortedDates = Object.keys(byDate).sort();

        sortedDates.forEach(dateStr => {
            const dateTasks = byDate[dateStr];

            // Date Header
            const header = document.createElement('div');
            header.style.gridColumn = "1 / -1";
            header.style.marginTop = "1rem";
            header.style.marginBottom = "0.5rem";
            header.innerHTML = `<h3 style="color:var(--text-light); font-size:1.1rem; border-bottom:1px solid var(--border); padding-bottom:0.5rem;">${formatDateHeader(dateStr)}</h3>`;
            cardsView.appendChild(header);

            dateTasks.forEach(task => {
                // Find actual index
                const realIndex = tasks.indexOf(task);

                // Determine Status Color/Class
                let statusClass = 'status-pending'; // Default
                let statusLabel = task.status;

                if (task.status === 'Completada') {
                    statusClass = 'status-completed';
                } else if (task.status === 'En curso') { // Corrected from 'En Curso' to 'En curso' to match data
                    statusClass = 'status-in-progress';
                } else {
                    // Check Overdue
                    const now = new Date();
                    const taskEnd = new Date(`${task.date}T${task.hEnd}:00`);
                    if (now > taskEnd) {
                        statusLabel = 'Vencida'; // Or keep 'Pendiente' but color red
                        statusClass = 'status-overdue';
                    }
                }

                const videoLinks = task.videos ? task.videos.split('\n').length : 0;
                const hasVideos = videoLinks > 0 ? `<span>📹 ${videoLinks}</span>` : '';

                const card = document.createElement('div');
                // Use new status classes for border
                card.className = `task-card status-card-${statusClass.replace('status-', '')}`;

                card.innerHTML = `
                <div class="card-header">
                    <div>
                        <div class="card-subtitle" style="text-transform:uppercase; font-size:0.75rem; color:var(--primary); margin-bottom:4px;">${task.category}</div>
                        <div class="card-title">${task.tool}</div>
                         <div class="card-subtitle">${task.why}</div>
                    </div>
                    <div class="card-tool-icon" title="${task.how}">
                       ${getToolIcon(task.tool)}
                    </div>
                </div>
                <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:1rem;">
                    ${task.help.substring(0, 100)}${task.help.length > 100 ? '...' : ''}
                </div>
                <div class="card-meta">
                    <span>⏰ ${task.hStart} - ${task.hEnd}</span>
                    <span>👤 ${task.with}</span>
                </div>
                <div style="margin-top:1rem; display:flex; justify-content:space-between; align-items:center">
                     ${hasVideos}
                     <span class="status-badge ${statusClass}">${statusLabel}</span>
                </div>
            `;

                card.style.cursor = 'pointer';
                card.addEventListener('click', () => openModal(realIndex));
                cardsView.appendChild(card);
            });
        });
    }

    function formatDateHeader(dateStr) {
        const d = new Date(dateStr + 'T00:00:00'); // Force local
        return d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
    }

    // --- HELPER: Tool Icons ---
    function getToolIcon(toolName) {
        const tool = toolName.toLowerCase();
        const iconStyle = 'width="24" height="24"';

        if (tool.includes('meet')) {
            return `<svg ${iconStyle} viewBox="0 0 24 24" fill="#00897b"><path d="M12 0C6.186 0 1.322 4.09.19 9.525h4.25c.989-2.57 3.456-4.4 6.373-4.4 2.917 0 5.384 1.83 6.373 4.4h4.25C20.305 4.09 15.814 0 12 0zm8.623 10.65H15v2.7h5.623c.246-.87.377-1.77.377-2.7 0-.93-.13-1.83-.377-2.7H15v2.7h5.623zM12 24c5.814 0 10.678-4.09 11.81-9.525h-4.25c-.989 2.57-3.456 4.4-6.373 4.4-2.917 0-5.384-1.83-6.373-4.4H.19C1.322 19.91 6.186 24 12 24z" /><path d="M16 12l5-3v6z" /></svg>`;
        } else if (tool.includes('notion')) {
            return `<svg ${iconStyle} viewBox="0 0 24 24" fill="white"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.886l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.22.186c-.094-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.886.747-.933z"/></svg>`;
        } else if (tool.includes('gmail')) {
            return `<svg ${iconStyle} viewBox="0 0 24 24" fill="#ea4335"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" /></svg>`;
        } else if (tool.includes('calendar')) {
            return `<svg ${iconStyle} viewBox="0 0 24 24" fill="#4285f4"><path d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zm-10.5 15H6v-3h3v3zm0-4.5H6v-3h3v3zm0-4.5H6V6h3v3zm4.5 9h-3v-3h3v3zm0-4.5h-3v-3h3v3zm0-4.5h-3V6h3v3zm4.5 9h-3v-3h3v3zm0-4.5h-3v-3h3v3zm0-4.5h-3V6h3v3z" /></svg>`;
        } else if (tool.includes('youtube')) {
            return `<svg ${iconStyle} viewBox="0 0 24 24" fill="#ff0000"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>`;
        } else if (tool.includes('gemini') || tool.includes('gema')) {
            return `<svg ${iconStyle} viewBox="0 0 24 24" fill="none"><path d="M12 2C12 2 12.5 9 19 12C12.5 15 12 22 12 22C12 22 11.5 15 5 12C11.5 9 12 2 12 2Z" fill="url(#gemini-gradient-card)"/><defs><linearGradient id="gemini-gradient-card" x1="5" y1="2" x2="19" y2="22" gradientUnits="userSpaceOnUse"><stop stop-color="#4E8BF5"/><stop offset="1" stop-color="#DB4437"/></linearGradient></defs></svg>`;
        } else if (tool.includes('chatgpt')) {
            return `<svg ${iconStyle} viewBox="0 0 24 24" fill="#10A37F"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a1.54 1.54 0 0 1 .8312 1.32v5.6418a4.4992 4.4992 0 0 1-5.2877 3.1673zm6.241-3.2725-.1656-.0927-4.7551-2.7424v-.0023l-.0303-.0176v-5.523a4.4992 4.4992 0 0 1 2.9806 1.8383 1.5416 1.5416 0 0 1 1.9702 3.3768zM4.68 14.8493a4.1915 4.1915 0 0 1 .134-2.986 1.5416 1.5416 0 0 1 2.2238-2.18l4.8913 2.8256-.0023 5.518-.1355.0784-.0161.0094-1.92 1.114a4.4992 4.4992 0 0 1-5.1751-4.3802zm9.743-11.232a4.4992 4.4992 0 0 1 2.969 4.3013l-4.6381 2.6738-.002-.5603v-4.6865l-4.7513-2.7471.1637-.0951a4.4992 4.4992 0 0 1 6.2587 1.1139z"/></svg>`;
        }

        // Default fallback: initial letter
        return `<strong>${toolName.charAt(0)}</strong>`;
    }

    // --- GANTT LOGIC ---
    let currentGanttView = 'day'; // 'day' | 'week'
    let ganttCurrentDate = null; // Date object for Day View

    function renderGantt(taskList) {
        ganttView.innerHTML = '';
        if (taskList.length === 0) {
            ganttView.innerHTML = '<p style="text-align:center; padding:2rem; color:var(--text-muted)">No hay tareas para mostrar.</p>';
            return;
        }

        // Initialize Date if null (use first task date)
        if (!ganttCurrentDate) {
            // Find earliest date
            const earliest = taskList.reduce((min, p) => p.date < min ? p.date : min, taskList[0].date);
            ganttCurrentDate = new Date(earliest + 'T12:00:00');
        }

        const dateStr = ganttCurrentDate.toISOString().split('T')[0];
        const displayDate = formatDate(dateStr);

        // --- Controls ---
        const controls = document.createElement('div');
        controls.className = 'gantt-controls';

        let navHtml = '';
        if (currentGanttView === 'day') {
            navHtml = `
            <div class="gantt-nav-controls">
                <button class="gantt-nav-btn" onclick="window.changeGanttDate(-1)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>
                <div class="gantt-current-date">${displayDate}</div>
                <button class="gantt-nav-btn" onclick="window.changeGanttDate(1)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>
            </div>
            `;
        } else {
            navHtml = `<div></div>`; // Spacer
        }

        controls.innerHTML = `
            ${navHtml}
            <div>
                <button class="gantt-view-btn ${currentGanttView === 'day' ? 'active' : ''}" onclick="window.setGanttView('day')">Vista Diaria (Horas)</button>
                <button class="gantt-view-btn ${currentGanttView === 'week' ? 'active' : ''}" onclick="window.setGanttView('week')">Vista Semanal (Días)</button>
            </div>
        `;
        ganttView.appendChild(controls);

        // Wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'gantt-chart-wrapper';

        let columns = [];
        let colWidth = 60;
        let startHour = 8;

        if (currentGanttView === 'day') {
            // Day View: Hour Columns
            colWidth = 100;
            for (let i = startHour; i < 22; i++) {
                columns.push({ label: `${i}:00`, value: i });
            }
        } else {
            // Week View: Day Columns (Full Range)
            colWidth = 150;

            // Calc Min and Max Dates from Full Dataset
            const dates = taskList.map(t => new Date(t.date));
            const minDate = new Date(Math.min(...dates));
            const maxDate = new Date(Math.max(...dates));

            // Adjust to start on Mon and end on Sun
            const startDay = minDate.getDay() || 7;
            minDate.setDate(minDate.getDate() - startDay + 1);

            const endDay = maxDate.getDay() || 7;
            maxDate.setDate(maxDate.getDate() + (7 - endDay));

            // Create range
            for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
                const dStr = d.toISOString().split('T')[0];
                const dLabel = d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
                columns.push({ label: dLabel, value: dStr });
            }
        }

        // --- Header Row ---
        const headerRow = document.createElement('div');
        headerRow.className = 'gantt-header-row';
        headerRow.innerHTML = `<div class="gantt-sidebar-cell">Tarea</div>`;
        columns.forEach(col => {
            headerRow.innerHTML += `<div class="gantt-header-cell" style="width:${colWidth}px">${col.label}</div>`;
        });
        wrapper.appendChild(headerRow);

        // --- Body ---
        const body = document.createElement('div');
        body.className = 'gantt-body';

        // Group by Category
        const byTool = {};
        taskList.forEach(t => {
            // For Day View, FILTER by Date!
            if (currentGanttView === 'day' && t.date !== dateStr) return;

            if (!byTool[t.category]) byTool[t.category] = [];
            byTool[t.category].push(t);
        });

        const sortedCats = Object.keys(byTool).sort();

        sortedCats.forEach(cat => {
            const catTasks = byTool[cat];

            // --- OVERLAP STACKING LOGIC ---
            // Sort by start time
            catTasks.sort((a, b) => {
                if (currentGanttView === 'day') {
                    return a.hStart.localeCompare(b.hStart);
                }
                return a.date.localeCompare(b.date);
            });

            // Calculate Lanes
            const lanes = []; // Array of end values for each lane
            // Helper to get task visual range [start, end]
            const getTaskRange = (t) => {
                if (currentGanttView === 'day') {
                    const [h, m] = t.hStart.split(':').map(Number);
                    const start = h + m / 60;
                    const [dH, dM] = t.duration.split(':').map(Number);
                    const end = start + dH + dM / 60;
                    return [start, end];
                } else {
                    const idx = columns.findIndex(c => c.value === t.date);
                    if (idx === -1) return [-1, -1];
                    return [idx, idx + 1];
                }
            };

            const taskLanes = [];
            catTasks.forEach(t => {
                const [start, end] = getTaskRange(t);
                let placed = false;
                for (let i = 0; i < lanes.length; i++) {
                    // Check if this lane is free greater than start (add small buffer?)
                    if (lanes[i] <= start) {
                        taskLanes.push(i);
                        lanes[i] = end;
                        placed = true;
                        break;
                    }
                }
                if (!placed) {
                    taskLanes.push(lanes.length);
                    lanes.push(end);
                }
            });

            const rowHeight = Math.max(50, lanes.length * 40 + 10);

            // Create Row
            const row = document.createElement('div');
            row.className = 'gantt-row';
            row.style.height = `${rowHeight}px`;
            row.style.minWidth = `${200 + (columns.length * colWidth)}px`;

            row.innerHTML = `<div class="gantt-sidebar-cell" title="${cat}">${cat}</div>`;

            // Grid
            columns.forEach(col => {
                const cell = document.createElement('div');
                cell.className = 'gantt-time-cell';
                cell.style.width = `${colWidth}px`;
                row.appendChild(cell);
            });

            // Render Bars
            catTasks.forEach((t, i) => {
                const lane = taskLanes[i];
                const top = 7 + (lane * 40);

                let left = 200;
                let width = 0;

                if (currentGanttView === 'day') {
                    const [h, m] = t.hStart.split(':').map(Number);
                    const startVal = h + (m / 60);
                    if (startVal >= startHour) {
                        left += (startVal - startHour) * colWidth;
                        const [durH, durM] = t.duration.split(':').map(Number);
                        const durVal = durH + (durM / 60);
                        width = durVal * colWidth;
                    }
                } else {
                    const colIndex = columns.findIndex(c => c.value === t.date);
                    if (colIndex !== -1) {
                        left += colIndex * colWidth;
                        width = colWidth - 10;
                        left += 5;
                    }
                }

                if (width > 0) {
                    const bar = document.createElement('div');
                    bar.className = `gantt-bar status-${t.status.replace(' ', '-')}`;
                    bar.style.left = `${left}px`;
                    bar.style.top = `${top}px`;
                    bar.style.width = `${width}px`;
                    bar.innerText = t.tool;
                    bar.title = `${t.tool}: ${t.why} (${t.hStart}-${t.hEnd})`;

                    // DnD setup
                    bar.dataset.index = tasks.indexOf(t);
                    bar.dataset.origLeft = left;
                    bar.onmousedown = (e) => startDrag(e, bar, colWidth, startHour, columns);

                    row.appendChild(bar);
                }
            });
            body.appendChild(row);
        });

        wrapper.appendChild(body);
        ganttView.appendChild(wrapper);
    }

    // --- Global Helpers ---
    window.setGanttView = (view) => {
        currentGanttView = view;
        renderGantt(tasks);
    };

    window.changeGanttDate = (days) => {
        if (!ganttCurrentDate) return;
        ganttCurrentDate.setDate(ganttCurrentDate.getDate() + days);
        renderGantt(tasks);
    };

    function startDrag(e, bar, colWidth, startHour, columns) {
        e.preventDefault();
        const startX = e.clientX;
        const initialLeft = parseFloat(bar.style.left);
        const taskIndex = bar.dataset.index;

        // Create Overlay for smoother drag if needed, or drag directly
        bar.style.opacity = '0.8';
        bar.style.zIndex = '100';
        bar.style.cursor = 'grabbing';

        function onMove(moveEvent) {
            const delta = moveEvent.clientX - startX;
            bar.style.left = `${initialLeft + delta}px`;
        }

        function onUp(upEvent) {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
            bar.style.opacity = '1';
            bar.style.zIndex = '';
            bar.style.cursor = 'grab';

            // Calculate Snap
            const finalLeft = parseFloat(bar.style.left);
            const offset = finalLeft - 200; // Remove sidebar

            // Apply Logic
            const task = tasks[taskIndex];

            if (currentGanttView === 'day') {
                // Snap to 15 mins (colWidth = 60 mins) -> 1/4 colWidth
                const slots = Math.round(offset / (colWidth / 4));
                const hours = Math.floor(slots / 4) + startHour;
                const minutes = (slots % 4) * 15;

                // Update Time
                // Note: This needs valid hour/min string formatting
                const newH = String(hours).padStart(2, '0');
                const newM = String(minutes).padStart(2, '0');

                // Update Task
                const [durH, durM] = task.duration.split(':').map(Number);

                task.hStart = `${newH}:${newM}`;
                // Recalc hEnd
                let endTotalMins = (hours * 60) + minutes + (durH * 60) + durM;
                let endH = Math.floor(endTotalMins / 60);
                let endM = endTotalMins % 60;
                task.hEnd = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;

            } else {
                // Week View: Snap to Column Index
                const colIndex = Math.round(offset / colWidth);
                if (colIndex >= 0 && colIndex < columns.length) {
                    const newDate = columns[colIndex].value;
                    task.date = newDate;
                }
            }

            // Re-Render to snap visually
            renderGantt(tasks);
        }

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    }

    function renderCalendar(taskList) {
        calendarView.innerHTML = '';
        if (taskList.length === 0) {
            calendarView.innerHTML = '<p style="text-align:center; padding:2rem; color:var(--text-muted)">No hay tareas para mostrar.</p>';
            return;
        }

        // Determine Month (Use first task or Jan 2026 as per user data)
        // Ideally we should have a month picker, but for now we auto-detect
        const firstDate = new Date(taskList[0].date + 'T12:00:00');
        const year = firstDate.getFullYear();
        const month = firstDate.getMonth(); // 0-indexed

        // Header
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const header = document.createElement('div');
        header.className = 'calendar-header';
        header.innerHTML = `<div class="calendar-title">${monthNames[month]} ${year}</div>`;
        calendarView.appendChild(header);

        // Grid
        const grid = document.createElement('div');
        grid.className = 'calendar-grid';

        // Headers (Mon-Sun)
        const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
        days.forEach(d => {
            grid.innerHTML += `<div class="calendar-day-header">${d}</div>`;
        });

        // Days Logic
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        let startDay = firstDayOfMonth.getDay(); // 0=Sun, 1=Mon
        if (startDay === 0) startDay = 7; // Fix to Mon-Sun (1-7)

        const totalDays = lastDayOfMonth.getDate();

        // Padding Days (Empty)
        for (let i = 1; i < startDay; i++) {
            grid.innerHTML += `<div class="calendar-day empty"></div>`;
        }

        // Actual Days
        for (let day = 1; day <= totalDays; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const todaysTasks = taskList.filter(t => t.date === dateStr);

            let dayHtml = `
            <div class="calendar-day ${dateStr === new Date().toISOString().split('T')[0] ? 'today' : ''}">
                <span class="calendar-date-number">${day}</span>
                ${todaysTasks.map(t => {
                const realIndex = tasks.indexOf(t);
                return `
                    <div class="calendar-event status-${t.status.replace(' ', '-')}" 
                         title="${t.hStart} - ${t.tool} (${t.category})"
                         onclick="event.stopPropagation(); document.dispatchEvent(new CustomEvent('openModal', {detail: ${realIndex}}))">
                        ${t.hStart} ${t.tool}
                    </div>
                    `;
            }).join('')}
            </div>
            `;
            grid.innerHTML += dayHtml;
        }

        calendarView.appendChild(grid);
    }

    // LISTENER FOR CUSTOM MODAL EVENT (needed for innerHTML onclicks)
    document.addEventListener('openModal', (e) => {
        openModal(e.detail);
    });

    // --- MODAL & CRUD ---

    function openModal(index) {
        modalOverlay.style.display = 'flex';
        editIndex.value = index !== null ? index : -1;

        if (index !== null && index !== -1) {
            const t = tasks[index];
            modalTitle.innerText = 'Editar tarea';
            editTool.value = t.tool;
            editGroup.value = t.category;
            editWhy.value = t.why; // Categoria -> Why? No, Category->Group. Why->Why.
            editDate.value = t.date;
            editDuration.value = t.duration;
            editStatus.value = t.status;
            editHStart.value = t.hStart;
            editHEnd.value = t.hEnd;
            editHow.value = t.how;
            editWith.value = t.with;
            editHelp.value = t.help;
            editVideos.value = t.videos;
            editFact.value = t.fact;
            editProfile.value = t.profile;
            btnDeleteTask.style.display = 'block';
        } else {
            modalTitle.innerText = 'Nueva tarea';
            // Clear form
            editTool.value = '';
            editGroup.value = '';
            editWhy.value = '';
            editDate.value = new Date().toISOString().split('T')[0];
            editDuration.value = '';
            editStatus.value = 'Pendiente';
            editHStart.value = '';
            editHEnd.value = '';
            editHow.value = '';
            editWith.value = '';
            editHelp.value = '';
            editVideos.value = '';
            editFact.value = '';
            editProfile.value = '';
            btnDeleteTask.style.display = 'none';
        }
    }

    function closeModal() {
        modalOverlay.style.display = 'none';
    }

    // Save tasks to localStorage
    function saveTasksToLocalStorage() {
        if (currentUser) {
            localStorage.setItem(`tasks_${currentUser.id}`, JSON.stringify(tasks));
        }
    }

    function saveTask() {
        const index = parseInt(editIndex.value);
        const newTask = {
            category: editGroup.value,
            tool: editTool.value,
            why: editWhy.value,
            date: editDate.value,
            hStart: editHStart.value,
            hEnd: editHEnd.value,
            how: editHow.value,
            duration: editDuration.value,
            with: editWith.value,
            help: editHelp.value,
            videos: editVideos.value,
            fact: editFact.value,
            profile: editProfile.value,
            status: editStatus.value
        };

        if (index >= 0) {
            // Update
            tasks[index] = newTask;
            showToast('Tarea actualizada');
        } else {
            // Create
            tasks.push(newTask);
            showToast('Tarea creada');
        }

        saveTasksToLocalStorage(); // Save to localStorage
        closeModal();
        populateFilters(); // Re-populate filters in case new categories/people
        renderAll();
    }

    function deleteTask() {
        if (confirm('¿Estás seguro de eliminar esta tarea?')) {
            const index = parseInt(editIndex.value);
            if (index >= 0) {
                tasks.splice(index, 1);
                saveTasksToLocalStorage(); // Save to localStorage
                showToast('Tarea eliminada');
                closeModal();
                renderAll();
            }
        }
    }

    function showToast(msg) {
        toastMsg.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    function formatDate(dateStr) {
        if (!dateStr) return '';
        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        // Fix timezone issue by appending time
        return new Date(dateStr + 'T12:00:00').toLocaleDateString('es-ES', options);
    }

    // --- PROFILE MANAGEMENT ---
    const profileModal = document.getElementById('profileModal');
    const btnSettings = document.getElementById('btnSettings');
    const profileModalClose = document.getElementById('profileModalClose');
    const btnCancelProfile = document.getElementById('btnCancelProfile');
    const btnSaveProfile = document.getElementById('btnSaveProfile');
    const profilePictureInput = document.getElementById('profilePictureInput');
    const avatarImage = document.getElementById('avatarImage');
    const avatarInitial = document.getElementById('avatarInitial');
    const skillsContainer = document.getElementById('skillsContainer');

    // Available skills list
    const AVAILABLE_SKILLS = [
        'Notion', 'Google Calendar', 'Google Sheets', 'Google Docs', 'Gmail', 'Google Meet',
        'ChatGPT', 'Claude', 'Google Gemini', 'Perplexity', 'Notebook LLM',
        'Cursor AI', 'GitHub Copilot', 'Antigravity',
        'Google Apps Script', 'Python', 'JavaScript',
        'Zapier', 'Make', 'n8n',
        'Canva', 'Figma', 'Midjourney', 'DALL-E',
        'Supabase', 'Netlify', 'Vercel', 'Airtable', 'YouTube'
    ];

    if (btnSettings) {
        btnSettings.addEventListener('click', openProfileModal);
    }
    if (profileModalClose) {
        profileModalClose.addEventListener('click', closeProfileModal);
    }
    if (btnCancelProfile) {
        btnCancelProfile.addEventListener('click', closeProfileModal);
    }
    if (btnSaveProfile) {
        btnSaveProfile.addEventListener('click', saveProfile);
    }
    if (profilePictureInput) {
        profilePictureInput.addEventListener('change', handleProfilePictureUpload);
    }

    function openProfileModal() {
        if (!currentUser) return;

        // Populate form with current user data
        document.getElementById('profileFullName').value = currentUser.fullName || '';
        document.getElementById('profileUsername').value = currentUser.username || '';
        document.getElementById('profileAge').value = currentUser.age || '';
        document.getElementById('profileBio').value = currentUser.bio || '';
        document.getElementById('profilePassion').value = currentUser.passion || '';
        document.getElementById('profileHobby').value = currentUser.hobby || '';
        document.getElementById('profileGoal').value = currentUser.learningGoal || '';
        document.getElementById('profileEmail').value = currentUser.contact?.email || '';
        document.getElementById('profileWhatsapp').value = currentUser.contact?.whatsapp || '';

        // Update avatar preview
        updateAvatarPreview(currentUser.profilePicture, currentUser.username);

        // Render skills selector
        renderSkillsSelector(currentUser.skills || {});

        profileModal.style.display = 'flex';
    }

    function closeProfileModal() {
        profileModal.style.display = 'none';
    }

    function handleProfilePictureUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64 = event.target.result;
            avatarImage.src = base64;
            avatarImage.style.display = 'block';
            avatarInitial.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }

    function updateAvatarPreview(pictureData, username) {
        if (pictureData) {
            avatarImage.src = pictureData;
            avatarImage.style.display = 'block';
            avatarInitial.style.display = 'none';
        } else {
            avatarImage.style.display = 'none';
            avatarInitial.style.display = 'block';
            avatarInitial.textContent = username ? username[0].toUpperCase() : 'U';
        }
    }

    function renderSkillsSelector(currentSkills) {
        skillsContainer.innerHTML = '';
        AVAILABLE_SKILLS.forEach(skill => {
            const currentLevel = currentSkills[skill] || 'ninguno';
            const skillDiv = document.createElement('div');
            skillDiv.style.cssText = 'background:var(--bg-card); padding:0.75rem; border-radius:8px; border:1px solid var(--border);';
            skillDiv.innerHTML = `
                <div style="font-weight:500; margin-bottom:0.5rem; font-size:0.9rem;">${skill}</div>
                <select data-skill="${skill}" style="width:100%; padding:0.4rem; font-size:0.85rem;">
                    <option value="ninguno" ${currentLevel === 'ninguno' ? 'selected' : ''}>Ninguno</option>
                    <option value="basico" ${currentLevel === 'basico' ? 'selected' : ''}>Básico</option>
                    <option value="intermedio" ${currentLevel === 'intermedio' ? 'selected' : ''}>Intermedio</option>
                    <option value="avanzado" ${currentLevel === 'avanzado' ? 'selected' : ''}>Avanzado</option>
                </select>
            `;
            skillsContainer.appendChild(skillDiv);
        });
    }

    function saveProfile() {
        if (!currentUser) return;

        // Update user object
        currentUser.fullName = document.getElementById('profileFullName').value;
        currentUser.username = document.getElementById('profileUsername').value;
        currentUser.age = parseInt(document.getElementById('profileAge').value) || 0;
        currentUser.bio = document.getElementById('profileBio').value;
        currentUser.passion = document.getElementById('profilePassion').value;
        currentUser.hobby = document.getElementById('profileHobby').value;
        currentUser.learningGoal = document.getElementById('profileGoal').value;

        // Update contact
        currentUser.contact = currentUser.contact || {};
        currentUser.contact.email = document.getElementById('profileEmail').value;
        currentUser.contact.whatsapp = document.getElementById('profileWhatsapp').value;

        // Update password if provided
        const newPassword = document.getElementById('profilePassword').value;
        if (newPassword) {
            currentUser.password = newPassword;
        }

        // Update profile picture
        if (avatarImage.style.display === 'block') {
            currentUser.profilePicture = avatarImage.src;
        }

        // Update skills
        const skillSelects = skillsContainer.querySelectorAll('select[data-skill]');
        currentUser.skills = {};
        skillSelects.forEach(select => {
            const skill = select.dataset.skill;
            const level = select.value;
            if (level !== 'ninguno') {
                currentUser.skills[skill] = level;
            }
        });

        // Update header display
        updateHeaderAvatar();
        document.getElementById('headerUserNameShort').textContent = currentUser.username;

        // Save to localStorage (for persistence across sessions)
        try {
            localStorage.setItem(`user_${currentUser.id}`, JSON.stringify(currentUser));
        } catch (e) {
            console.warn('Could not save to localStorage:', e);
        }

        showToast('Perfil actualizado correctamente');
        closeProfileModal();
    }

    function updateHeaderAvatar() {
        const avatarSmall = document.getElementById('userAvatarSmall');
        if (!avatarSmall || !currentUser) return;

        if (currentUser.profilePicture) {
            avatarSmall.style.backgroundImage = `url(${currentUser.profilePicture})`;
            avatarSmall.style.backgroundSize = 'cover';
            avatarSmall.textContent = '';
        } else {
            avatarSmall.style.backgroundImage = 'none';
            avatarSmall.textContent = currentUser.username ? currentUser.username[0].toUpperCase() : 'U';
        }
    }

    // --- WELCOME POPUP (First Visit) ---
    const welcomeModal = document.getElementById('welcomeModal');
    const btnCloseWelcome = document.getElementById('btnCloseWelcome');
    const welcomeUserName = document.getElementById('welcomeUserName');

    if (btnCloseWelcome) {
        btnCloseWelcome.addEventListener('click', closeWelcomeModal);
    }

    function checkAndShowWelcome() {
        if (!currentUser) return;

        const hasVisited = localStorage.getItem(`welcomed_${currentUser.id}`);

        if (!hasVisited) {
            // First visit!
            if (welcomeUserName) {
                welcomeUserName.textContent = currentUser.username || currentUser.name;
            }
            welcomeModal.style.display = 'flex';
        }
    }

    function closeWelcomeModal() {
        // Check if user wants to hide the welcome message permanently
        const dontShowAgain = document.getElementById('dontShowWelcomeAgain');

        if (currentUser && dontShowAgain && dontShowAgain.checked) {
            // Only save preference if checkbox is checked
            localStorage.setItem(`welcomed_${currentUser.id}`, 'true');
        }

        welcomeModal.style.display = 'none';

        // Reset checkbox for next time
        if (dontShowAgain) {
            dontShowAgain.checked = false;
        }
    }
});
