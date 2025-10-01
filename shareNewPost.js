// shareNewPost.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("add-post-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const titleInput = document.getElementById("new-post-title");
      const textarea = document.getElementById("new-post-body");
      const imageInput = document.getElementById("new-post-image");

      const title = titleInput.value.trim();
      const body = textarea.value.trim();
      const image = imageInput.files[0];

      if (!title || !body) return;

      const token = localStorage.getItem("token");
      if (!token) {
        alert("يجب تسجيل الدخول أولاً!");
        return;
      }

      // تجهيز البيانات كـ FormData
      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      if (image) {
        formData.append("image", image);
      }

      axios
        .post("https://tarmeezacademy.com/api/v1/posts", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          titleInput.value = "";
          textarea.value = "";
          imageInput.value = "";
          // إعادة تحميل البوستات أو تحديثها مباشرة
          if (typeof GetPosts === "function") {
            GetPosts(1, false);
          }
        })
        .catch((error) => {
          alert("حدث خطأ أثناء النشر!");
          console.log(error);
        });
    });
  }
});
