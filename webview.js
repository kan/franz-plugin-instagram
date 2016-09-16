module.exports = (Franz, options) => {
    setTimeout(() => {
        location.reload();
    }, 90000);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://code.jquery.com/jquery-3.1.0.min.js');
    script.setAttribute('integrity', 'sha256-cCueBR6CsyA4/9szpPfrX3s49M9vUU5BgtiJj06wt/s=');
    script.setAttribute('crossorigin', 'anonymous');

    const head = document.getElementsByTagName('head')[0];
    head.appendChild(script);

    window.onscroll = function(ev) {
        const now = $('main section article header a time').attr('datetime');
        localStorage.setItem("Franz.Instagram.latest", now);
    };

    function getMessages() {
        const latest = localStorage.getItem("Franz.Instagram.latest");
        const now = $('main section article header a time').attr('datetime');
        var unread = 0;
        if (!latest) {
            localStorage.setItem("Franz.Instagram.latest", now);
        }
        if (latest != now) {
            unread = 1;
        }

        Franz.setBadge(0, unread);
    }

    Franz.loop(getMessages);
}
