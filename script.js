const menuIcon = document.getElementById("menuIcon");
const sidebar = document.getElementById("sidebar");

// Открытие/закрытие sidebar при нажатии на иконку
menuIcon.addEventListener("click", function () {
    sidebar.classList.toggle("active"); // Добавляем/убираем класс "active"
});

// Закрытие sidebar при клике вне его области
document.addEventListener("click", function (event) {
    if (event.target !== menuIcon && !sidebar.contains(event.target)) {
        sidebar.classList.remove("active"); // Закрываем sidebar
    }
});