module.exports = (Franz, options) => {
    setTimeout(() => {
        location.reload();
    }, 90000);

    window.addEventListener('scroll', (ev) => {
        const now = document.querySelector('main section article header a time').getAttribute('datetime');
        localStorage.setItem("Franz.Instagram.latest", now);
    });

    function getUnreadEntry() {
        const latest = localStorage.getItem("Franz.Instagram.latest");
        const now = document.querySelector('main section article header a time').getAttribute('datetime');
        if (!latest) {
            localStorage.setItem("Franz.Instagram.latest", now);
        }
        if (latest != now) {
            return 1;
        }

        return 0;
    }

    function getNotify() {
        if (document.querySelectorAll('a._gx3bg > div')[2].classList.contains('_ea05m')) {
            return 1;
        }
        
        return 0;
    }

    function getMessages() {
        Franz.setBadge(getNotify(), getUnreadEntry());
    }

    Franz.loop(getMessages);
}
