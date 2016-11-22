module.exports = (Franz, options) => {
    setTimeout(() => {
        location.reload();
    }, 90000);

    window.addEventListener('load', (ev) => {
        clickNotify(); // open notify menu

        setTimeout(checkNotify, 500);
    });

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

    function clickNotify() {
        const elm = document.querySelector('.coreSpriteDesktopNavActivity');
        const evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, elm);
        elm.dispatchEvent(evt);
    }

    function checkNotify() {
        if (document.querySelector('._mkiio._8kllr ._auspy time')) {
            Franz.instagramNotify = document.querySelector('._mkiio._8kllr ._auspy time').getAttribute('datetime');
            clickNotify(); // close notify menu

            const elm = document.querySelector('.coreSpriteDesktopNavActivity');
            elm.addEventListener('click', (ev) => {
                localStorage.setItem("Franz.Instagram.notify", Franz.instagramNotify);
            });
        } else {
            setTimeout(checkNotify, 500);
        }
    }

    function getNotify() {
        const latest = localStorage.getItem("Franz.Instagram.notify");
        console.log(Franz.instagramNotify);
        if (!latest) {
            localStorage.setItem("Franz.Instagram.notify", Franz.instagramNotify);
        }
        if (latest != Franz.instagramNotify) {
            return 1;
        }

        return 0;
    }

    function getMessages() {
        Franz.setBadge(getNotify(), getUnreadEntry());
    }

    Franz.loop(getMessages);
}
