// ================== تحميل النافبار ==================
async function loadNavbar() {
  try {
    const response = await fetch("navbar.html");
    const navbarHTML = await response.text();

    // إضافة النافبار في بداية body
    document.body.insertAdjacentHTML("afterbegin", navbarHTML);
    // إعداد النافبار بعد تحميله
    setupNavbar();
    toggelLoading(true);
  } catch (error) {
    console.error("خطأ في تحميل النافبار:", error);
    // إضافة نافبار احتياطي في حالة الخطأ
    const fallbackNavbar = `
      <!-- Navbar Fallback -->
      <div class="navbar-wrapper">
        <nav class="navbar navbar-light bg-light">
          <div class="container-fluid px-0">
            <a class="navbar-brand fw-bold brand-modern" href="index.html">
              <img src="tarmeaz_academy.jpg" alt="ترميز" class="brand-logo">
              مجتمع ترميز
            </a>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 flex-row gap-4">
              <li class="nav-item">
                <a class="nav-link" href="index.html" id="home-link">الرئيسية</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="userProfile.html" id="profile-link">الملف الشخصي</a>
              </li>
            </ul>
            <div class="d-flex align-items-center" id="auth-buttons">
              <button class="btn btn-outline-primary me-2" id="login-btn">تسجيل دخول</button>
              <button class="btn btn-primary" id="register-btn">تسجيل</button>
            </div>
            <div class="d-flex align-items-center" id="user-profile" style="display: none;">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Profile"
                class="rounded-circle me-2"
                style="width: 32px; height: 32px"
                onerror="this.src='https://cdn-icons-png.flaticon.com/512/149/149071.png'"
              />
              <button class="logout-btn">تسجيل خروج</button>
            </div>
          </div>
        </nav>
      </div>
    `;
    document.body.insertAdjacentHTML("afterbegin", fallbackNavbar);
    setupNavbar();
  }
}
// ================== إعداد النافبار ==================
function setupNavbar() {
  // تحديد الصفحة الحالية
  setActiveNavLink();

  // إعداد أزرار المصادقة
  setupAuthButtons();

  updateNavBarWhenLogOrRegOrLogout();

  // إضافة توجيه ديناميكي لرابط الملف الشخصي
  const profileLink = document.getElementById("profile-link");
  if (profileLink) {
    profileLink.addEventListener("click", function (e) {
      e.preventDefault();
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.id) {
          window.location.href = `userProfile.html?id=${user.id}`;
        } else {
          window.location.href = "userProfile.html";
        }
      } catch {
        window.location.href = "userProfile.html";
      }
    });
  }
}
// ================== تحديد الرابط النشط ==================
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // إزالة الكلاس النشط من جميع الروابط
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });

  // إضافة الكلاس النشط للرابط المناسب
  if (currentPage === "index.html" || currentPage === "") {
    const homeLink = document.getElementById("home-link");
    if (homeLink) homeLink.classList.add("active");
  } else if (currentPage === "userProfile.html") {
    // تحقق من id في الرابط و id المستخدم الحالي
    const urlParams = new URLSearchParams(window.location.search);
    const pageId = urlParams.get("id");
    let myId = null;
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      myId = user ? String(user.id) : null;
    } catch {}
    const profileLink = document.getElementById("profile-link");
    if (profileLink && pageId && myId && pageId === myId) {
      profileLink.classList.add("active");
    }
  }
}
// ================== إعداد أزرار المصادقة ==================
function setupAuthButtons() {
  const loginBtn = document.getElementById("login-btn");
  const registerBtn = document.getElementById("register-btn");
  const logoutBtn = document.getElementById("logout-btn");

  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      showLoginModal();
    });
  }

  if (registerBtn) {
    registerBtn.addEventListener("click", function () {
      showRegisterModal();
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      logout();
    });
  }
}
// ================== عرض نافذة تسجيل الدخول ==================
function showLoginModal() {
  const modalHTML = `
    <div class="modal fade" id="loginModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">تسجيل الدخول</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form id="loginForm">
              <div class="mb-3">
                <label for="loginUserName" class="form-label">اسم المستخدم</label>
                <input type="text" class="form-control" id="loginUserName" autocomplete="username" required>
              </div>
              <div class="mb-3">
                <label for="loginPassword" class="form-label">كلمة المرور</label>
                <input type="password" class="form-control" id="loginPassword" autocomplete="current-password" required>
              </div>
              <button type="submit" class="btn btn-primary w-100">تسجيل الدخول</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  // إزالة النافذة السابقة إن وجدت
  const existingModal = document.getElementById("loginModal");
  if (existingModal) {
    existingModal.remove();
  }

  // إضافة النافذة الجديدة
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // عرض النافذة
  const modal = new bootstrap.Modal(document.getElementById("loginModal"));
  modal.show();

  // إضافة مستمع الحدث للنموذج
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    handleLogin();
  });
}
// ================== معالجة تسجيل الدخول ==================
function handleLogin() {
  const username = document.getElementById("loginUserName").value;
  const password = document.getElementById("loginPassword").value;

  toggelLoading(true);
  // استخدام axios لإرسال طلب تسجيل الدخول
  axios
    .post("https://tarmeezacademy.com/api/v1/login", {
      username: username,
      password: password,
    })
    .then((response) => {
      console.log("تم تسجيل الدخول بنجاح:", response.data);
      let token = response.data.token;
      let user = response.data.user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      // تاجل او هيك شيء بتذكر اتعلمناه مع الانسة فاطمة في الجامعة
      successfulLoginOrRegAlert();
      updateNavBarWhenLogOrRegOrLogout();
      window.location.reload();
      // إغلاق النافذة
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("loginModal")
      );
      modal.hide();
    })
    .catch((error) => {
      console.error("خطأ في تسجيل الدخول:", error);
      alert("خطأ في تسجيل الدخول. يرجى المحاولة مرة أخرى.");
    })
    .finally(() => {
      toggelLoading(false);
    });
}
function successfulLoginOrRegAlert(message, type = "success") {
  const alertDiv = document.createElement("div");
  alertDiv.className = "custom-alert";
  if (type === "error") {
    alertDiv.classList.add("custom-alert-error");
  } else {
    alertDiv.classList.add("custom-alert-success");
  }
  alertDiv.innerHTML =
    message ||
    (type === "success" ? "✅ تم تسجيل الدخول بنجاح!" : "حدث خطأ ما!");

  document.body.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.style.opacity = "0";
    setTimeout(() => alertDiv.remove(), 300);
  }, 3000);
}
function updateNavBarWhenLogOrRegOrLogout() {
  const token = localStorage.getItem("token");

  const authButtonsDiv = document.getElementById("auth-buttons");
  const logoutDiv = document.getElementById("logout-div");
  const profileNavItem = document.getElementById("profile-nav-item");
  const navProfileImage = document.getElementById("navProfileImage");

  if (token == null || !token) {
    authButtonsDiv.style.setProperty("display", "flex", "important");
    logoutDiv.style.setProperty("display", "none", "important");
    if (profileNavItem) profileNavItem.style.display = "none";
  } else {
    authButtonsDiv.style.setProperty("display", "none", "important");
    logoutDiv.style.setProperty("display", "flex", "important");
    if (profileNavItem) profileNavItem.style.display = "block";
    // جلب صورة المستخدم من localStorage
    if (navProfileImage) {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (
          user &&
          user.profile_image &&
          typeof user.profile_image === "string"
        ) {
          navProfileImage.src = user.profile_image;
        } else {
          navProfileImage.src =
            "https://cdn-icons-png.flaticon.com/512/149/149071.png";
        }
      } catch {
        navProfileImage.src =
          "https://cdn-icons-png.flaticon.com/512/149/149071.png";
      }
    }
  }
}
// ================== تسجيل الخروج ==================
function logout() {
  document.getElementById("customLogoutModal").style.display = "flex";

  // ربط الأزرار مرة واحدة فقط
  const confirmBtn = document.getElementById("confirmLogoutBtn");
  const cancelBtn = document.getElementById("cancelLogoutBtn");

  // إزالة أي أحداث سابقة
  confirmBtn.onclick = null;
  cancelBtn.onclick = null;

  confirmBtn.onclick = function () {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.getElementById("customLogoutModal").style.display = "none";
    updateNavBarWhenLogOrRegOrLogout();

    successfulLoginOrRegAlert(
      '👋 تم تسجيل الخروج بنجاح!<br><span style="font-weight:bold;">مجتمع ترميز</span>'
    );
    // إعادة تحميل الموقع بعد تسجيل الخروج
    window.location.reload();
  };

  cancelBtn.onclick = function () {
    document.getElementById("customLogoutModal").style.display = "none";
  };
}

// ================== عرض نافذة التسجيل ==================
function showRegisterModal() {
  const modalHTML = `
    <div class="modal fade" id="registerModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">تسجيل حساب جديد</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form id="registerForm">
              <div class="mb-3">
                <label for="registerName" class="form-label">الاسم</label>
                <input type="text" class="form-control" id="registerName" autocomplete="name" required">
              </div>
              <div class="mb-3">
                <label for="registerUserName" class="form-label">اسم المستخدم</label>
                <input type="text" class="form-control" id="registerUserName" autocomplete="name" required">
              </div>
              <div class="mb-3">
                <label for="registerEmail" class="form-label">البريد الإلكتروني</label>
                <input type="email" class="form-control" id="registerEmail" autocomplete="email" required>
              </div>
              <div class="mb-3">
                <label for="registerPassword" class="form-label">كلمة المرور</label>
                <input type="password" class="form-control" id="registerPassword" autocomplete="new-password" required>
              </div>
              <div class="mb-3">
                <label for="registerImage" class="form-label">صورة الحساب</label>
                <input type="file" class="form-control" id="registerImage">
              </div>
              <button type="submit" class="btn btn-primary w-100">تسجيل</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  // إزالة النافذة السابقة إن وجدت
  const existingModal = document.getElementById("registerModal");
  if (existingModal) {
    existingModal.remove();
  }

  // إضافة النافذة الجديدة
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // عرض النافذة
  const modal = new bootstrap.Modal(document.getElementById("registerModal"));
  modal.show();

  // إضافة مستمع الحدث للنموذج
  document
    .getElementById("registerForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      handleRegister();
    });
}
// ================== معالجة التسجيل ==================
function handleRegister() {
  const name = document.getElementById("registerName").value;
  const userName = document.getElementById("registerUserName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const postImage = document.getElementById("registerImage").files[0];

  // تجهيز البيانات لإرسالها كـ form-data
  const formData = new FormData();
  formData.append("name", name);
  formData.append("username", userName);
  formData.append("email", email);
  formData.append("password", password);
  if (postImage) {
    formData.append("image", postImage);
  }
  toggelLoading(true);
  // استخدام axios لإرسال طلب التسجيل

  axios
    .post("https://tarmeezacademy.com/api/v1/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("تم التسجيل بنجاح:", response.data.user);
      let token = response.data.token;
      let user = response.data.user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      successfulLoginOrRegAlert(
        '🎉  تم إنشاء الحساب بنجاح! أهلاً بك في<br><span style="font-weight:bold;">مجتمع ترميز 👋</span>'
      );
      updateNavBarWhenLogOrRegOrLogout();
      // إغلاق النافذة
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("registerModal")
      );
      modal.hide();
    })
    .catch((error) => {
      console.error("خطأ في التسجيل:", error);
      alert("خطأ في التسجيل. يرجى المحاولة مرة أخرى.");
    })
    .finally(() => {
      toggelLoading(false);
    });
}

function toggelLoading(show = true) {
  const overlay = document.getElementById("global-loading-overlay");
  if (!overlay) return;
  if (show) {
    overlay.style.display = "flex";
  } else {
    overlay.style.display = "none";
  }
}

// ================== تحميل النافبار عند تحميل الصفحة ==================
document.addEventListener("DOMContentLoaded", function () {
  loadNavbar();
});
