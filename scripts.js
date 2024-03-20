const wrapper = document.querySelector(".wrapper");
const frameRate = 2;
const minScale = 0.3;
const maxScale = 1.1;
const scaleRange = maxScale - minScale;
let lastFrame;

// this helper function stolen from a hero on stackoverflow
function dynamicSort(property) {
    let sortOrder = 1;

    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a, b) {
        let result =
            a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
    };
}

function animateChildren(parent, origin) {
    const children = Array.from(parent.children);
    const childrenWithDistances = [];

    children.map((child) => {
        const r = child.getBoundingClientRect();
        const childX = r.right - r.width / 2;
        const childY = r.bottom - r.height / 2;
        const distanceY = Math.max(origin.y, childY) - Math.min(origin.y, childY);
        const distanceX = Math.max(origin.x, childX) - Math.min(origin.x, childX);
        const hypot = Math.hypot(distanceX, distanceY);

        child.distance = Math.round(hypot);
        childrenWithDistances.push(child);
    });

    childrenWithDistances.sort(dynamicSort("distance")).reverse();

    childrenWithDistances.map((child, index) => {
        const relativeAmt = (index / children.length) * scaleRange;
        child.style.setProperty("--scale", minScale + relativeAmt);
    });
}

document.addEventListener("mousemove", function (e) {
    requestAnimationFrame(function (thisFrame) {
        if (thisFrame - lastFrame > frameRate) {
            const screenCenter = {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            };

            const moveX = e.x - screenCenter.x;
            const moveY = e.y - screenCenter.y;

            wrapper.style.setProperty("--x", moveX / 10 + "%");
            wrapper.style.setProperty("--y", moveY / 10 + "%");

            animateChildren(wrapper, e);
        }

        lastFrame = thisFrame;
    });
});

document.body.addEventListener("scroll", function (e) {
    const screenCenter = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    };

    animateChildren(wrapper, screenCenter);
});

window.onload = function () {
    // Get the div element
    const div = document.getElementById('center');

    // Check if the div element exists
    if (div) {
        // Scroll the div into view, centered vertically, with smooth behavior
        div.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
};
