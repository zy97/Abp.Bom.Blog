var func = window.func || {};
func = {
    setStorage: function (name, value) {
        localStorage.setItem(name, value);
    },
    getStorage: function (name) {
        return localStorage.getItem(name);
    },
    switchTheme: function () {
        var currentTheme = this.getStorage("theme") || "Light";
        var isDark = currentTheme === "Dark";
        if (isDark) {
            document.body.classList.add("dark-theme");
        }
        else {
            document.body.classList.remove("dark-theme");
        }
    }
}