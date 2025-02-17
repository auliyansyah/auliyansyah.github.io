// Work and Experience Data will be loaded from Jekyll's data files
const workData = window.siteData ? window.siteData.projects : [];
const experienceData = window.siteData ? window.siteData.experiences : [];

// Populate Work Section
function populateWork() {
    const workGrid = document.querySelector('.work-grid');
    
    workData.forEach((project, index) => {
        const workItem = document.createElement('div');
        workItem.className = 'work-item';
        workItem.innerHTML = `
            <img src="${project.image}" alt="${project.title}" loading="lazy">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <button class="project-link" data-project="${index}">View Project</button>
        `;
        workGrid.appendChild(workItem);
    });

    // Add modal event listeners
    document.querySelectorAll('.project-link').forEach(button => {
        button.addEventListener('click', (e) => {
            const projectIndex = e.target.getAttribute('data-project');
            const project = workData[projectIndex];
            showProjectModal(project);
        });
    });
}

function showProjectModal(project) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-header">
                <h2>${project.title}</h2>
            </div>
            <div class="modal-body">
                <div class="project-gallery">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-details">
                    <h3>Project Overview</h3>
                    <p>${project.description}</p>
                    <h3>Technologies Used</h3>
                    <div class="tech-stack">
                        ${project.tags.map(tag => `
                            <div class="tech-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tag.toLowerCase()}/${tag.toLowerCase()}-original.svg" alt="${tag}" onerror="this.onerror=null; this.src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'">
                                <span>${tag}</span>
                            </div>
                        `).join('')}
                    </div>
                    ${project.link ? `<a href="${project.link}" class="live-link" target="_blank" rel="noopener">Visit Live Site</a>` : ''}
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);

    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// Populate Experience Section
function populateExperience() {
    const timeline = document.querySelector('.timeline');
    
    experienceData.forEach(exp => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <h3>${exp.role}</h3>
                <h4>${exp.company}</h4>
                <p class="period">${exp.period}</p>
                <p>${exp.description}</p>
            </div>
        `;
        timeline.appendChild(timelineItem);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateWork();
    populateExperience();

    // Add smooth scroll behavior for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Add additional styles for work items
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .work-item {
        background: white;
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: var(--transition);
    }

    .work-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }

    .work-item img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    .work-item h3 {
        padding: 1.5rem 1.5rem 0.5rem;
        color: var(--text-color);
    }

    .work-item p {
        padding: 0 1.5rem;
        color: #4b5563;
    }

    .tags {
        padding: 1rem 1.5rem;
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    .tag {
        background: var(--light-gray);
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.875rem;
    }

    .project-link {
        display: inline-block;
        margin: 0 1.5rem 1.5rem;
        color: var(--primary-color);
        text-decoration: none;
        font-weight: 500;
    }

    .timeline-item {
        border-left: 2px solid var(--primary-color);
        padding: 0 0 2rem 2rem;
        position: relative;
    }

    .timeline-item::before {
        content: '';
        width: 12px;
        height: 12px;
        background: var(--primary-color);
        border-radius: 50%;
        position: absolute;
        left: -7px;
        top: 0;
    }

    .timeline-content h3 {
        color: var(--text-color);
        margin-bottom: 0.5rem;
    }

    .timeline-content h4 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
    }

    .timeline-content .period {
        color: #4b5563;
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
    }
`;

document.head.appendChild(additionalStyles);