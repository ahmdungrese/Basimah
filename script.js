// بيانات المبادرة
const initiativeData = {
    months: ['كانون الثاني', 'شباط', 'آذار', 'نيسان', 'أيار', 'حزيران',
            'تموز', 'آب', 'أيلول', 'تشرين الأول', 'تشرين الثاني', 'كانون الأول'],
            
    goals: [
        { id: 'humanitarian', title: 'الدعم الإنساني العاجل', details: 'توزيع سلل غذائية وإغاثية للعائلات المحتاجة' },
        { id: 'medical', title: 'الرعاية الصحية الطارئة', details: 'تقديم المساعدات المالية للحالات المرضية المستعجلة' },
        { id: 'infrastructure', title: 'تطوير البنية التحتية', details: 'إصلاح وتحسين الخدمات العامة' }
    ],

    countries: {
        germany: {
            name: 'ألمانيا',
            flag: '🇩🇪',
            coordinator: 'محمد احسان دالاتي',
            phone: '‪+49 176 72742271‬',
            whatsapp: '‪+49 176 72742271‬',
            iban: 'DE05 000',
            paypal: 'Mohamadmalekdalati@gmail.com',
            groupLink: 'https://chat.whatsapp.com/BAYkTdVdAOPGPE5I36LBX3',
            contactPerson: {
                name: 'أحمد تحسين نصرالله',
                phone: '+49 1525 4165330'
            }
        },
        austria: {
            name: 'النمسا',
            flag: '🇦🇹',
            coordinator: 'طارق انور الشعيري',
            phone: '+43 681 20522580',
            whatsapp: '+43 681 20522580',
            groupLink: 'https://chat.whatsapp.com/BAYkTdVdAOPGPE5I36LBX3'
        },
        belgium: {
            name: 'بلجيكا',
            flag: '🇧🇪',
            coordinator: 'ماجد محمد دالاتي',
            phone: '+32 465 64 76 30',
            whatsapp: '+32 465 64 76 30',
            groupLink: 'https://chat.whatsapp.com/BAYkTdVdAOPGPE5I36LBX3'
        }
    },

    teamMembers: [
        {
            name: "الأستاذ أحمد قاسم أبو خليل",
            title: "خطيب مسجد عين الخضراء",
            role: "عضو الفريق الإداري",
            description: "أستاذ في الشريعة من كلية الدعوة والإرشاد",
            facebook: "https://www.facebook.com/profile.php?id=100004099421683"
        },
        {
            name: "الأستاذ ايمن شعيري أبو طريف",
            title: "مدير الجمعية الخيرية",
            role: "مسؤول إدارة وتنسيق الأعمال",
            description: "خبرة طويلة في العمل الخيري",
            facebook: "https://www.facebook.com/profile.php?id=100026230099984"
        },
        {
            name: "الأستاذ بشير نصر الله أبو منذر",
            title: "مؤسس الجمعية الخيرية",
            role: "رئيس مجلس الإدارة",
            description: "خريج كلية الحقوق",
            facebook: "https://www.facebook.com/profile.php?id=100028583169906"
        },
        {
            name: "الأستاذ سالم نصر الله",
            title: "عضو الفريق الإداري",
            role: "مسؤول التنسيق والمتابعة",
            description: "خريج جامعة دمشق - كلية التربية",
            facebook: "https://www.facebook.com/profile.php?id=100044893625281"
        },
        {
            name: "الأستاذ نزار السمرة أبو أنس",
            title: "عضو الفريق الإداري",
            role: "مسؤول التنسيق والمتابعة",
            description: "مسؤول المشاريع",
            facebook: "https://chat.whatsapp.com/BAYkTdVdAOPGPE5I36LBX3"
        },
        {
            name: "الأستاذ وفيق نصر الله أبو عمر",
            title: "عضو الفريق الإداري",
            role: "مسؤول المشاريع والتطوير",
            description: "مسؤول تطوير المشاريع",
            facebook: "https://chat.whatsapp.com/BAYkTdVdAOPGPE5I36LBX3"
        }
    ]
};

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupVisitorCounter();
    setupNavigation();
    setupTransparencyTable();
    setupDonationSystem();
    setupGoalsSection();
    setupContactForm();
    setupWhatsAppGroups();
    setupTeamSection();
    setupModals();
}

// عداد الزيارات
function setupVisitorCounter() {
    const visitorCount = parseInt(localStorage.getItem('visitorCount') || '0');
    localStorage.setItem('visitorCount', (visitorCount + 1).toString());
    updateVisitorDisplay();
}

function updateVisitorDisplay() {
    const counter = document.getElementById('visitorCount');
    if (counter) {
        counter.textContent = localStorage.getItem('visitorCount');
    }
}

// نظام التبرعات
function setupDonationSystem() {
    const donateButtons = document.querySelectorAll('[data-action="donate"]');
    donateButtons.forEach(button => {
        button.addEventListener('click', () => {
            const country = button.dataset.country;
            showDonationModal(country);
        });
    });
}

function showDonationModal(countryCode = 'germany') {
    const country = initiativeData.countries[countryCode];
    if (!country) return;

    const modalContent = document.querySelector('#donateModal .modal-content');
    if (!modalContent) return;

    modalContent.innerHTML = `
        <div class="donation-details">
            <h3>${country.name} ${country.flag}</h3>
            <div class="coordinator-info">
                <p><strong>المنسق:</strong> ${country.coordinator}</p>
                <p><strong>رقم الهاتف:</strong> <span dir="ltr">${country.phone}</span></p>
            </div>
            
            <div class="donation-methods">
                ${country.iban ? `
                    <div class="method bank">
                        <h4>التحويل البنكي</h4>
                        <p class="iban" onclick="copyToClipboard('${country.iban}')">
                            ${country.iban}
                            <span class="copy-hint">انقر للنسخ</span>
                        </p>
                    </div>
                ` : ''}
                
                ${country.paypal ? `
                    <div class="method paypal">
                        <h4>PayPal</h4>
                        <p class="paypal-email" onclick="copyToClipboard('${country.paypal}')">
                            ${country.paypal}
                            <span class="copy-hint">انقر للنسخ</span>
                        </p>
                    </div>
                ` : ''}
            </div>

            <div class="contact-actions">
                <button onclick="openWhatsApp('${country.whatsapp}')" class="whatsapp-btn">
                    <i class="fab fa-whatsapp"></i> تواصل عبر الواتساب
                </button>
            </div>
        </div>
    `;

    showModal('donateModal');
}

// جدول الشفافية
function setupTransparencyTable() {
    const tableContainer = document.getElementById('transparency-table');
    if (!tableContainer) return;

    let tableHTML = `
        <div class="table-container">
            <table class="transparency-table">
                <thead>
                    <tr>
                        <th>الشهر</th>
                        <th>المبلغ المجموع (يورو)</th>
                        <th>ملاحظات</th>
                    </tr>
                </thead>
                <tbody>
                    ${initiativeData.months.map(month => `
                        <tr>
                            <td>${month}</td>
                            <td class="amount-cell">-</td>
                            <td class="notes-cell">-</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;

    tableContainer.innerHTML = tableHTML;
}

// قسم الأهداف
function setupGoalsSection() {
    const goalsContainer = document.getElementById('goals-container');
    if (!goalsContainer) return;

    const goalsHTML = initiativeData.goals.map(goal => `
        <div class="goal-card" data-goal="${goal.id}">
            <h3>${goal.title}</h3>
            <p>${goal.details}</p>
            <button onclick="showGoalDetails('${goal.id}')" class="details-btn">
                عرض التفاصيل
            </button>
        </div>
    `).join('');

    goalsContainer.innerHTML = goalsHTML;
}

// مجموعات الواتساب
function setupWhatsAppGroups() {
    const groupsContainer = document.getElementById('whatsapp-groups-root');
    if (!groupsContainer) return;

    const groupsHTML = Object.values(initiativeData.countries).map(country => `
        <div class="whatsapp-group-card">
            <h3>${country.name} ${country.flag}</h3>
            <a href="${country.groupLink}" target="_blank" class="join-group-btn">
                <i class="fab fa-whatsapp"></i>
                انضم للمجموعة
            </a>
        </div>
    `).join('');

    groupsContainer.innerHTML = groupsHTML;
}

// نماذج الاتصال
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        
        // التحقق من صحة البيانات
        if (validateForm(formData)) {
            showNotification('success', 'تم إرسال رسالتك بنجاح!');
            form.reset();
        } else {
            showNotification('error', 'الرجاء ملء جميع الحقول المطلوبة');
        }
    });
}

// وظائف المساعدة
function validateForm(formData) {
    for (let value of formData.values()) {
        if (!value.trim()) return false;
    }
    return true;
}

function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.getElementById('notification-container').appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => showNotification('success', 'تم النسخ بنجاح!'))
        .catch(() => showNotification('error', 'فشل النسخ، الرجاء المحاولة يدوياً'));
}

function openWhatsApp(phone) {
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    window.open(`https://wa.me/${cleanPhone}`, '_blank');
}

// المودال
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

function setupModals() {
    // إغلاق المودال عند النقر خارجه
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    };

    // إغلاق المودال عند النقر على زر الإغلاق
    document.querySelectorAll('.close-modal').forEach(button => {
        button.onclick = function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        };
    });
}

// التنقل السلس
function setupNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// تهيئة قسم فريق العمل
function setupTeamSection() {
    const teamContainer = document.getElementById('team-grid');
    if (!teamContainer) return;

    const teamHTML = initiativeData.teamMembers.map(member => `
        <div class="team-card">
            <div class="team-info">
                <h3 class="member-name">${member.name}</h3>
                <p class="member-title">${member.title}</p>
                <p class="member-role">${member.role}</p>
                <p class="member-description">${member.description}</p>
                <div class="member-social">
                    <a href="${member.facebook}" target="_blank" class="btn-facebook">
                        <i class="fab fa-facebook"></i>
                        الصفحة الشخصية
                    </a>
                </div>
            </div>
        </div>
    `).join('');

    teamContainer.innerHTML = teamHTML;
}