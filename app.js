/**
 * PSG College of Arts & Science Portal - Core Logic Script
 * Handles theme toggles, search filters, modal popups, and the role-based management dashboard.
 */
// Initialize Global State Data
const STATE = {
    theme: localStorage.getItem('psg-theme') || 'dark',
    activeView: 'landing', // 'landing' or 'dashboard'
    activeRole: 'student', // 'student', 'faculty', 'admin'
    
    // Infrastructure Data
    facilities: [
        {
            id: 'grd-library',
            name: 'GRD Memorial Library',
            category: 'academic',
            desc: 'A massive repository housing over 137,500 physical books, standard international journals, and extensive e-learning resource terminals.',
            specs: ['137.5k+ Volumes', 'Air-Conditioned', 'Digital Catalog Access', 'Open until 8 PM'],
            icon: 'library'
        },
        {
            id: 'biotech-lab',
            name: 'Biotechnology Research Labs',
            category: 'academic',
            desc: 'State-of-the-art laboratory environment featuring PCR chambers, high-speed centrifuges, and culture rooms for advanced molecular research.',
            specs: ['PCR Systems', 'Tissue Culture Rooms', 'Research Assistants Available'],
            icon: 'test-tube'
        },
        {
            id: 'viscom-studio',
            name: 'Visual Comm. Media Suite',
            category: 'academic',
            desc: 'Equipped with professional sound-insulated recording booths, high-definition video editing suites, and a spacious green-screen photo studio.',
            specs: ['4K Camera Kits', 'ProTools Suite', 'Foley Sound Stage'],
            icon: 'video'
        },
        {
            id: 'boys-hostel',
            name: 'PSG Boys Hostel Complex',
            category: 'residential',
            desc: 'Comfortable residential rooms (AC & Non-AC options) with continuous security, dynamic study halls, and high-speed Wi-Fi connectivity.',
            specs: ['AC/Non-AC Rooms', 'Wi-Fi Enabled', 'In-house Gym', '24/7 Security'],
            icon: 'home'
        },
        {
            id: 'girls-hostel',
            name: 'PSG Girls Hostel Block',
            category: 'residential',
            desc: 'Safe and secure living quarters with comprehensive amenities, solar hot water, study lounges, and fully equipped laundry modules.',
            specs: ['Solar Hot Water', 'Modern Dining Hall', 'HOPE Care Desk', 'Biometric Entry'],
            icon: 'home'
        },
        {
            id: 'food-courts',
            name: 'Campus Food Courts & Canteens',
            category: 'residential',
            desc: 'Multiple food courts offering multi-cuisine menus (South Indian, North Indian, Continental) maintained under strict hygiene audits.',
            specs: ['Hygiene Audited', 'Vegetarian & Halal', 'Juice Bars', 'Subsidized Prices'],
            icon: 'coffee'
        },
        {
            id: 'hope-center',
            name: '“HOPE” Psychological Counseling Cell',
            category: 'support',
            desc: 'Dedicated campus resource offering confidential psychiatric counseling, emotional support, and self-development modules.',
            specs: ['Licensed Therapists', 'Confidential Rooms', 'Mindfulness Sessions'],
            icon: 'heart'
        },
        {
            id: 'indoor-stadium',
            name: 'Indoor Sports Arena & Gymnasium',
            category: 'support',
            desc: 'A premium 3,000 capacity indoor stadium designed for basketball tournaments, volleyball leagues, badminton court slots, and a full gym.',
            specs: ['3,000 Capacity', 'Multi-Gym Setup', 'Synthetic Courts', 'Dedicated Coaches'],
            icon: 'award'
        }
    ],
    // Faculty Data
    faculty: [
        {
            id: 'fac-priya',
            name: 'Dr. Priya Darshini',
            title: 'Professor & Head',
            dept: 'Computer Science',
            avatar: 'PD',
            bio: 'Over 18 years of teaching experience with research interests focusing on Deep Learning, Cloud Architectures, and full-stack software paradigms. Successfully mentored 12 PhD candidates.',
            papers: [
                '“A Novel CNN Architecture for Agricultural Pest Detection” - IEEE Transactions 2024',
                '“Resource Allocation in Fog Computing Using Genetic Optimization” - Journal of Systems Science 2023'
            ]
        },
        {
            id: 'fac-ramesh',
            name: 'Dr. Ramesh Kumar S',
            title: 'Associate Professor',
            dept: 'Biotechnology',
            avatar: 'RK',
            bio: 'Active researcher in genomics and plant biotechnology. Recipient of DST-SERB research grants focusing on drought-resistant gene pathways.',
            papers: [
                '“CRISPR-Cas9 Editing of Solanum lycopersicum for Salinity Tolerance” - Nature Genetics Letters 2025',
                '“Bio-extraction of Heavy Metals from Textile Effluents using Bacillus subtilis” - Waste Management 2024'
            ]
        },
        {
            id: 'fac-meera',
            name: 'Dr. Meera Nair',
            title: 'Assistant Professor',
            dept: 'Arts & Literature',
            avatar: 'MN',
            bio: 'Specialist in post-colonial literature and creative writing. Published two novels and hosts the annual LitFest at PSG CAS.',
            papers: [
                '“Deconstructing Identity: Subaltern voices in modern Indian Fiction” - Literary Horizons 2023',
                '“Mythology as Metaphor in Modern Malayalam Drama” - Comparative Drama Review 2022'
            ]
        },
        {
            id: 'fac-dinesh',
            name: 'Dr. Dinesh Karthik',
            title: 'Associate Professor',
            dept: 'Commerce',
            avatar: 'DK',
            bio: 'Expert in International Business and GST Policies. Advisory consultant for local MSMEs and corporate tax audits.',
            papers: [
                '“Assessing the Impact of Digital Payments on Rural Retailers” - Indian Journal of Finance 2024',
                '“Corporate Governance and Firm Value: A Panel Data Study of NSE Listed Entities” - GST Journal 2023'
            ]
        }
    ],
    // Mock Database for Management Dashboard
    db: {
        students: [
            { rollNo: '22BCS045', name: 'Sanjay Kumar R', dept: 'Computer Science', active: true, grades: { '22CSC01': 'A+', '22CSC02': 'A', '22CSC03': 'O', '22CSC04': 'B+', '22CSC05': 'A' } },
            { rollNo: '22BCS003', name: 'Ananya Sen', dept: 'Computer Science', active: true, grades: { '22CSC01': 'O', '22CSC02': 'O', '22CSC03': 'A+', '22CSC04': 'A', '22CSC05': 'O' } },
            { rollNo: '22BCS012', name: 'Dinesh K', dept: 'Computer Science', active: true, grades: { '22CSC01': 'B', '22CSC02': 'A', '22CSC03': 'A', '22CSC04': 'B+', '22CSC05': 'B' } },
            { rollNo: '22BCS033', name: 'Pooja M', dept: 'Computer Science', active: true, grades: { '22CSC01': 'A+', '22CSC02': 'B+', '22CSC03': 'O', '22CSC04': 'A', '22CSC05': 'A+' } }
        ],
        facilitiesStatus: [
            { name: 'GRD Library Hall', status: 'Occupied', detail: 'Regular Study Session' },
            { name: 'GRD Auditorium', status: 'Available', detail: 'None scheduled' },
            { name: 'Main Seminar Hall', status: 'Occupied', detail: 'Guest Lecture by Cognizant' },
            { name: 'Biotech Conference room', status: 'Available', detail: 'Post-doc meet completed' },
            { name: 'Indoor Stadium Main', status: 'Occupied', detail: 'Zonal Basketball Practise' }
        ],
        logs: [
            { time: '11:50:11', msg: 'Database synced with central cloud storage.' },
            { time: '11:51:32', msg: 'Backup scheduled: 120GB compiled.' },
            { time: '11:52:05', msg: 'Admin authorized new faculty registration.' }
        ]
    }
};
// Main App Controller
class PSGCASPortal {
    constructor() {
        this.init();
    }
    init() {
        this.registerDOMEvents();
        this.renderInfrastructure('all');
        this.renderFaculty('all');
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }
    // Register DOM Event Listeners
    registerDOMEvents() {
        // Theme Toggle
        const themeBtn = document.getElementById('theme-toggle-btn');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => this.toggleTheme());
        }
        // Hamburger Menu (Mobile Navigation)
        const hamburger = document.getElementById('hamburger-menu');
        const navMenu = document.getElementById('nav-menu');
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
        }
        // Navigation Link Clicks (Single Page Switching/Scrolling)
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const sectionTarget = link.getAttribute('data-section');
                if (sectionTarget === 'landing') {
                    e.preventDefault();
                    this.showLanding();
                    
                    // Smooth scroll to element
                    const targetId = link.getAttribute('href').substring(1);
                    const targetEl = document.getElementById(targetId);
                    if (targetEl) {
                        targetEl.scrollIntoView({ behavior: 'smooth' });
                    }
                    
                    // Mark active navigation link
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                }
            });
        });
        // Logo Brand click -> Reset view to Landing Top
        const navBrand = document.getElementById('nav-brand');
        if (navBrand) {
            navBrand.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLanding();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navLinks.forEach(l => l.classList.remove('active'));
                navLinks[0].classList.add('active');
            });
        }
        // Portal Mode Toggle Button (Navbar)
        const portalToggle = document.getElementById('btn-portal-toggle');
        if (portalToggle) {
            portalToggle.addEventListener('click', () => {
                if (STATE.activeView === 'landing') {
                    this.showDashboard();
                } else {
                    this.showLanding();
                }
            });
        }
        // Logout exit button inside Dashboard
        const logoutBtn = document.getElementById('btn-logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.showLanding());
        }
        // Infrastructure Tab Filters
        const infraTabs = document.getElementById('infra-tabs');
        if (infraTabs) {
            infraTabs.querySelectorAll('.tab-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    infraTabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.renderInfrastructure(btn.getAttribute('data-filter'), document.getElementById('infra-search-input').value);
                });
            });
        }
        // Infrastructure Search input
        const infraSearch = document.getElementById('infra-search-input');
        if (infraSearch) {
            infraSearch.addEventListener('input', (e) => {
                const activeTab = infraTabs.querySelector('.tab-btn.active').getAttribute('data-filter');
                this.renderInfrastructure(activeTab, e.target.value);
            });
        }
        // Faculty Tab Filters
        const facultyTabs = document.getElementById('faculty-tabs');
        if (facultyTabs) {
            facultyTabs.querySelectorAll('.tab-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    facultyTabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.renderFaculty(btn.getAttribute('data-filter'), document.getElementById('faculty-search-input').value);
                });
            });
        }
        // Faculty Search Input
        const facultySearch = document.getElementById('faculty-search-input');
        if (facultySearch) {
            facultySearch.addEventListener('input', (e) => {
                const activeTab = facultyTabs.querySelector('.tab-btn.active').getAttribute('data-filter');
                this.renderFaculty(activeTab, e.target.value);
            });
        }
        // Dashboard Role Switcher Dropdown
        const roleSelect = document.getElementById('role-select');
        if (roleSelect) {
            roleSelect.addEventListener('change', (e) => {
                this.switchDashboardRole(e.target.value);
            });
        }
        // Close Faculty Modal Dialog
        const closeModal = document.getElementById('btn-close-modal');
        if (closeModal) {
            closeModal.addEventListener('click', () => this.toggleModal(false));
        }
        const modalOverlay = document.getElementById('faculty-modal');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) this.toggleModal(false);
            });
        }
        // --- DASHBOARD ACTIONS ---
        // Reserve Library Book (Student Dashboard)
        const libBtn = document.getElementById('btn-lib-reserve');
        if (libBtn) {
            libBtn.addEventListener('click', () => {
                const input = document.getElementById('lib-reserve-input');
                if (input && input.value.trim() !== '') {
                    this.actionSimulator('reserve-book', input.value);
                    input.value = '';
                } else {
                    alert('Please type a book title to reserve.');
                }
            });
        }
        // Load Student Roster for Attendance (Faculty Dashboard)
        const loadRosterBtn = document.getElementById('btn-load-students');
        if (loadRosterBtn) {
            loadRosterBtn.addEventListener('click', () => this.loadAttendanceRoster());
        }
        // Save Attendance Sheet (Faculty Dashboard)
        const saveAttendanceBtn = document.getElementById('btn-save-attendance');
        if (saveAttendanceBtn) {
            saveAttendanceBtn.addEventListener('click', () => this.actionSimulator('save-attendance'));
        }
        // Grade Student Submission (Faculty Dashboard)
        const updateGradeBtn = document.getElementById('btn-update-grade');
        if (updateGradeBtn) {
            updateGradeBtn.addEventListener('click', () => {
                const studentSelect = document.getElementById('grade-student-select');
                const courseSelect = document.getElementById('grade-course-select');
                const scoreInput = document.getElementById('grade-score');
                if (scoreInput && scoreInput.value !== '') {
                    const gradeDetail = {
                        studentRoll: studentSelect.value,
                        courseCode: courseSelect.value,
                        score: scoreInput.value
                    };
                    this.actionSimulator('publish-grade', gradeDetail);
                    scoreInput.value = '';
                } else {
                    alert('Please input a valid test score (0-100).');
                }
            });
        }
        // Broadcast Announcement (Faculty Dashboard)
        const postAnnounceBtn = document.getElementById('btn-post-announcement');
        if (postAnnounceBtn) {
            postAnnounceBtn.addEventListener('click', () => {
                const text = document.getElementById('announcement-text');
                if (text && text.value.trim() !== '') {
                    this.actionSimulator('post-announcement', text.value);
                    text.value = '';
                } else {
                    alert('Please enter a message to broadcast.');
                }
            });
        }
        // Register New Profile (Admin Dashboard)
        const registerUserBtn = document.getElementById('btn-register-user');
        if (registerUserBtn) {
            registerUserBtn.addEventListener('click', () => {
                const name = document.getElementById('reg-name');
                const role = document.getElementById('reg-role');
                const dept = document.getElementById('reg-dept');
                if (name && name.checkValidity()) {
                    const profileData = {
                        name: name.value,
                        role: role.value,
                        dept: dept.value
                    };
                    this.actionSimulator('register-user', profileData);
                    name.value = '';
                } else {
                    alert('Please fill out the full name.');
                }
            });
        }
    }
    // Toggle light/dark themes
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('psg-theme', nextTheme);
        STATE.theme = nextTheme;
    }
    // Switch between Public Landing and Management Portal
    showLanding() {
        document.getElementById('landing-view').classList.add('active');
        document.getElementById('dashboard-view').classList.remove('active');
        
        const portalToggle = document.getElementById('btn-portal-toggle');
        if (portalToggle) {
            portalToggle.textContent = 'Management Portal';
            portalToggle.classList.remove('btn-outline');
            portalToggle.classList.add('btn-primary');
        }
        
        STATE.activeView = 'landing';
    }
    showDashboard() {
        document.getElementById('landing-view').classList.remove('active');
        document.getElementById('dashboard-view').classList.add('active');
        
        const portalToggle = document.getElementById('btn-portal-toggle');
        if (portalToggle) {
            portalToggle.textContent = 'Exit Management';
            portalToggle.classList.remove('btn-primary');
            portalToggle.classList.add('btn-outline');
        }
        
        STATE.activeView = 'dashboard';
        this.switchDashboardRole(STATE.activeRole);
    }
    // Dynamic Live clock
    updateClock() {
        const clockEl = document.getElementById('live-clock');
        if (clockEl) {
            const now = new Date();
            // Format time with IST standards or system local format
            const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            const dateStr = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
            clockEl.innerHTML = `<strong>${dateStr}</strong> | ${timeStr}`;
        }
    }
    // Switch management panel layout relative to active role
    switchDashboardRole(role) {
        STATE.activeRole = role;
        
        // Hide all roles
        document.getElementById('panel-student').classList.remove('active');
        document.getElementById('panel-faculty').classList.remove('active');
        document.getElementById('panel-admin').classList.remove('active');
        
        // Show selected role
        const panelId = `panel-${role}`;
        const targetPanel = document.getElementById(panelId);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
        
        // Update Sidebar User Information
        const avatarEl = document.getElementById('dashboard-user-avatar');
        const nameEl = document.getElementById('dashboard-user-name');
        const badgeEl = document.getElementById('dashboard-user-badge');
        const titleEl = document.getElementById('dashboard-section-title');
        const subtitleEl = document.getElementById('dashboard-section-subtitle');
        const roleDropdown = document.getElementById('role-select');
        
        if (roleDropdown && roleDropdown.value !== role) {
            roleDropdown.value = role;
        }
        if (role === 'student') {
            if (avatarEl) avatarEl.textContent = 'S';
            if (avatarEl) avatarEl.style.background = 'var(--clr-maroon)';
            if (nameEl) nameEl.textContent = 'Sanjay Kumar R';
            if (badgeEl) badgeEl.textContent = 'III B.Sc CS - A';
            if (titleEl) titleEl.textContent = 'Student Terminal';
            if (subtitleEl) subtitleEl.textContent = 'Explore academic scores, manage deadlines, and library reserves.';
            this.renderSidebarNav([
                { name: 'Semester Grades', active: true },
                { name: 'Attendance Record' },
                { name: 'Online Library' },
                { name: 'Feedback Cell' }
            ]);
        } else if (role === 'faculty') {
            if (avatarEl) avatarEl.textContent = 'PD';
            if (avatarEl) avatarEl.style.background = 'var(--clr-gold)';
            if (nameEl) nameEl.textContent = 'Dr. Priya Darshini';
            if (badgeEl) badgeEl.textContent = 'CS Head / Professor';
            if (titleEl) titleEl.textContent = 'Faculty Workstation';
            if (subtitleEl) subtitleEl.textContent = 'Mark daily attendance rosters, upload internal scores, and post advisement alerts.';
            this.renderSidebarNav([
                { name: 'Class Timetables', active: true },
                { name: 'Attendance Marker' },
                { name: 'Grading Assistant' },
                { name: 'My Publications' }
            ]);
            this.loadAttendanceRoster();
        } else if (role === 'admin') {
            if (avatarEl) avatarEl.textContent = 'AD';
            if (avatarEl) avatarEl.style.background = 'linear-gradient(135deg, var(--clr-maroon), var(--clr-gold))';
            if (nameEl) nameEl.textContent = 'Administrator Control';
            if (badgeEl) badgeEl.textContent = 'Systems Office';
            if (titleEl) titleEl.textContent = 'Command Center';
            if (subtitleEl) subtitleEl.textContent = 'Inspect central college statistics, manage infrastructure bookings, and add profiles.';
            this.renderSidebarNav([
                { name: 'Campus Dashboard', active: true },
                { name: 'Facility Allocations' },
                { name: 'Credential Dispatcher' },
                { name: 'Security Logs' }
            ]);
            this.renderAdminFacilities();
            this.updateAdminLog('Systems administrative module loaded successfully.');
        }
    }
    renderSidebarNav(items) {
        const menuContainer = document.getElementById('sidebar-menu');
        if (!menuContainer) return;
        
        menuContainer.innerHTML = '';
        items.forEach((item, idx) => {
            const link = document.createElement('div');
            link.className = `sidebar-link ${item.active ? 'active' : ''}`;
            
            // Simple generic icon representation using CSS pseudo-elements
            link.innerHTML = `
                <span class="nav-indicator">•</span>
                <span>${item.name}</span>
            `;
            link.addEventListener('click', () => {
                menuContainer.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
            menuContainer.appendChild(link);
        });
    }
    // Render Infrastructure Card list dynamically
    renderInfrastructure(filterCategory = 'all', searchQuery = '') {
        const container = document.getElementById('infra-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        const filtered = STATE.facilities.filter(item => {
            const matchesCat = (filterCategory === 'all' || item.category === filterCategory);
            const matchesSearch = (searchQuery === '' || 
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                item.desc.toLowerCase().includes(searchQuery.toLowerCase())
            );
            return matchesCat && matchesSearch;
        });
        if (filtered.length === 0) {
            container.innerHTML = `<div class="no-results">No facilities matching the filters found.</div>`;
            return;
        }
        filtered.forEach(item => {
            const card = document.createElement('article');
            card.className = 'infra-card';
            
            // SVG Icon mappings
            let svgIcon = '';
            if (item.icon === 'library') {
                svgIcon = `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`;
            } else if (item.icon === 'test-tube') {
                svgIcon = `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31M14 2v7.31M8.5 2h7M14 12a4.9 4.9 0 0 1 1.5 3.5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 4.9 4.9 0 0 1 1.5-3.5L10 9.31h4z"></path></svg>`;
            } else if (item.icon === 'video') {
                svgIcon = `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>`;
            } else if (item.icon === 'home') {
                svgIcon = `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`;
            } else if (item.icon === 'coffee') {
                svgIcon = `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>`;
            } else if (item.icon === 'heart') {
                svgIcon = `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
            } else if (item.icon === 'award') {
                svgIcon = `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`;
            }
            // Category display title
            const catTitle = item.category === 'academic' ? 'Academic' : (item.category === 'residential' ? 'Living & Food' : 'Support Desk');
            card.innerHTML = `
                <div class="infra-img-placeholder">
                    ${svgIcon}
                    <span class="badge infra-category-badge">${catTitle}</span>
                </div>
                <div class="infra-info">
                    <h3 class="infra-title">${item.name}</h3>
                    <p class="infra-text">${item.desc}</p>
                    <div class="infra-specs">
                        ${item.specs.map(spec => `<span class="infra-spec-badge">${spec}</span>`).join('')}
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }
    // Render Faculty roster dynamic layout
    renderFaculty(filterDept = 'all', searchQuery = '') {
        const container = document.getElementById('faculty-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        const filtered = STATE.faculty.filter(member => {
            const matchesDept = (filterDept === 'all' || member.dept === filterDept);
            const matchesSearch = (searchQuery === '' || 
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                member.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                member.bio.toLowerCase().includes(searchQuery.toLowerCase())
            );
            return matchesDept && matchesSearch;
        });
        if (filtered.length === 0) {
            container.innerHTML = `<div class="no-results">No faculty members found for this criteria.</div>`;
            return;
        }
        filtered.forEach(member => {
            const card = document.createElement('div');
            card.className = 'faculty-card';
            card.innerHTML = `
                <div class="fac-avatar">${member.avatar}</div>
                <h3 class="fac-name">${member.name}</h3>
                <span class="fac-title">${member.title}</span>
                <div><span class="fac-dept">${member.dept}</span></div>
                <p class="fac-preview-bio">${member.bio}</p>
            `;
            card.addEventListener('click', () => this.showFacultyDetailModal(member));
            container.appendChild(card);
        });
    }
    // Modal popup rendering detailed bio details
    showFacultyDetailModal(member) {
        const bodyEl = document.getElementById('faculty-modal-body');
        if (!bodyEl) return;
        bodyEl.innerHTML = `
            <div style="display: flex; gap: 1.5rem; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap;">
                <div class="fac-avatar" style="width: 90px; height: 90px; font-size: 2rem; margin: 0;">${member.avatar}</div>
                <div>
                    <h2 style="font-size: 1.65rem; margin-bottom: 0.25rem;">${member.name}</h2>
                    <p style="color: var(--clr-gold-light); font-weight: 600; font-size: 0.95rem;">${member.title} - Dept. of ${member.dept}</p>
                    <span class="badge" style="background-color: var(--clr-maroon); color: white; margin-top: 0.5rem;">Verified Faculty</span>
                </div>
            </div>
            <div style="margin-bottom: 1.5rem;">
                <h4 style="margin-bottom: 0.5rem; font-size: 1.1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.35rem;">Biography & Career</h4>
                <p style="font-size: 0.925rem; color: var(--text-secondary); line-height: 1.7;">${member.bio}</p>
            </div>
            <div>
                <h4 style="margin-bottom: 0.75rem; font-size: 1.1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.35rem;">Recent Peer-Reviewed Publications</h4>
                <ul style="padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem;">
                    ${member.papers.map(p => `<li style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; font-style: italic;">${p}</li>`).join('')}
                </ul>
            </div>
        `;
        this.toggleModal(true);
    }
    toggleModal(isOpen) {
        const modal = document.getElementById('faculty-modal');
        if (!modal) return;
        
        if (isOpen) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    // Load Class Roster to Mark Attendance (Faculty View)
    loadAttendanceRoster() {
        const roster = document.getElementById('attendance-roster-body');
        if (!roster) return;
        roster.innerHTML = '';
        STATE.db.students.forEach(student => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${student.rollNo}</strong></td>
                <td>${student.name}</td>
                <td>
                    <label class="inline-form" style="align-items: center; gap: 0.5rem; cursor: pointer;">
                        <input type="checkbox" checked class="attendance-check" data-roll="${student.rollNo}">
                        <span class="badge badge-success status-tag">Present</span>
                    </label>
                </td>
            `;
            
            // Toggle label based on checkbox state
            const checkbox = tr.querySelector('.attendance-check');
            const statusTag = tr.querySelector('.status-tag');
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    statusTag.className = 'badge badge-success status-tag';
                    statusTag.textContent = 'Present';
                } else {
                    statusTag.className = 'badge badge-danger status-tag';
                    statusTag.textContent = 'Absent';
                }
            });
            roster.appendChild(tr);
        });
    }
    // Render Administrator's Facilities bookings list
    renderAdminFacilities() {
        const tbody = document.getElementById('admin-facilities-table');
        if (!tbody) return;
        tbody.innerHTML = '';
        STATE.db.facilitiesStatus.forEach(fac => {
            const tr = document.createElement('tr');
            const statusClass = fac.status === 'Available' ? 'badge-success' : 'badge-warning';
            tr.innerHTML = `
                <td><strong>${fac.name}</strong></td>
                <td><span class="badge ${statusClass}">${fac.status}</span></td>
                <td class="text-secondary">${fac.detail}</td>
                <td>
                    <button class="btn btn-outline btn-xs" onclick="app.actionSimulator('toggle-facility', '${fac.name}')">Toggle Allocation</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
    // Update Live System logs in Administrator View
    updateAdminLog(msg) {
        const logOutput = document.getElementById('admin-log-output');
        if (!logOutput) return;
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];
        
        const line = document.createElement('div');
        line.className = 'log-line';
        line.innerHTML = `<span>[${timeStr}]</span> ${msg}`;
        logOutput.appendChild(line);
        logOutput.scrollTop = logOutput.scrollHeight;
    }
    // Action Simulator Engine - Simulates back-end requests & actions
    actionSimulator(actionType, payload) {
        console.log(`Action dispatched: ${actionType}`, payload);
        const timestamp = new Date().toTimeString().split(' ')[0];
        switch(actionType) {
            case 'reserve-book':
                alert(`SUCCESS: Book "${payload}" has been reserved for pickup!\nReservation Code: PSGLIB-${Math.floor(1000 + Math.random() * 9000)}.`);
                break;
                
            case 'submit-assignment':
                alert(`SUCCESS: Assignment files uploaded and registered under timestamp ${timestamp}.`);
                break;
            case 'save-attendance':
                const checked = document.querySelectorAll('.attendance-check');
                let presentCount = 0;
                checked.forEach(c => { if(c.checked) presentCount++; });
                
                alert(`SUCCESS: Class attendance marked!\nTotal Students Present: ${presentCount} / ${checked.length}.`);
                break;
            case 'publish-grade':
                // Update internal grade in our mock database
                const student = STATE.db.students.find(s => s.rollNo === payload.studentRoll);
                if (student) {
                    let scoreMark = parseInt(payload.score);
                    let finalLetter = 'B';
                    if (scoreMark >= 90) finalLetter = 'O';
                    else if (scoreMark >= 80) finalLetter = 'A+';
                    else if (scoreMark >= 70) finalLetter = 'A';
                    else if (scoreMark >= 60) finalLetter = 'B+';
                    
                    student.grades[payload.courseCode] = finalLetter;
                    alert(`SUCCESS: Marks saved for ${student.name}!\nCourse: ${payload.courseCode} | Grade: ${finalLetter}`);
                }
                break;
            case 'post-announcement':
                alert(`SUCCESS: Broadcasting message to all students registered in B.Sc. Computer Science:\n"${payload}"`);
                break;
            case 'register-user':
                const isFaculty = payload.role === 'faculty';
                if (isFaculty) {
                    const initials = payload.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
                    const newFac = {
                        id: `fac-${Math.floor(Math.random() * 100)}`,
                        name: payload.name,
                        title: 'Assistant Professor',
                        dept: payload.dept,
                        avatar: initials,
                        bio: `Joined PSG College of Arts & Science in 2026. Specializing in ${payload.dept} research workflows.`,
                        papers: ['“Recent Trends in Academic Methodologies” - PSG CAS Journal 2026']
                    };
                    STATE.faculty.push(newFac);
                    this.renderFaculty('all');
                    this.updateAdminLog(`New faculty profile registered: ${payload.name}`);
                } else {
                    const roll = `22BCS${String(Math.floor(100 + Math.random() * 900))}`;
                    const newStud = {
                        rollNo: roll,
                        name: payload.name,
                        dept: payload.dept,
                        active: true,
                        grades: { '22CSC01': 'A', '22CSC02': 'A', '22CSC03': 'A' }
                    };
                    STATE.db.students.push(newStud);
                    const totalStudentsMetric = document.getElementById('admin-stat-students');
                    if (totalStudentsMetric) {
                        const curCount = parseInt(totalStudentsMetric.textContent.replace(/,/g, ''));
                        totalStudentsMetric.textContent = (curCount + 1).toLocaleString();
                    }
                    // Re-add to options dropdown for grading simulator
                    const gradeDropdown = document.getElementById('grade-student-select');
                    if (gradeDropdown) {
                        const opt = document.createElement('option');
                        opt.value = roll;
                        opt.textContent = `${payload.name} (${roll})`;
                        gradeDropdown.appendChild(opt);
                    }
                    this.updateAdminLog(`New student profile registered: ${payload.name} (${roll})`);
                }
                alert(`SUCCESS: Profile successfully added to central registry!\nSystem credentials generated.`);
                break;
            case 'toggle-facility':
                const facility = STATE.db.facilitiesStatus.find(f => f.name === payload);
                if (facility) {
                    facility.status = (facility.status === 'Available') ? 'Occupied' : 'Available';
                    facility.detail = (facility.status === 'Available') ? 'None scheduled' : 'Administrative allocation';
                    this.renderAdminFacilities();
                    this.updateAdminLog(`Facility allocation updated: ${payload} -> ${facility.status}`);
                }
                break;
                
            default:
                console.warn('Unknown simulated action dispatch.');
        }
    }
}
// Instantiate on load
let app;
window.addEventListener('DOMContentLoaded', () => {
    app = new PSGCASPortal();
});
