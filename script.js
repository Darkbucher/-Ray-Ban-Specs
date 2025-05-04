// Check if device is mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Image effect initialization with mobile-optimized config
Shery.imageEffect("#back", {
    style: 5,
    config: {
        "a": {"value": isMobile ? 1 : 2, "range":[0,30]},
        "b": {"value":-0.98,"range":[-1,1]},
        "zindex":{"value":-9996999,"range":[-9999999,9999999]},
        "aspect":{"value":2.196969583151224},
        "ignoreShapeAspect":{"value":true},
        "shapePosition":{"value":{"x":0,"y":0}},
        "shapeScale":{"value":{"x":0.5,"y":0.5}},
        "shapeEdgeSoftness":{"value":0,"range":[0,0.5]},
        "shapeRadius":{"value":0,"range":[0,2]},
        "currentScroll":{"value":0},
        "scrollLerp":{"value":0.07},
        "gooey":{"value":true},
        "infiniteGooey":{"value":true},
        "growSize":{"value":4,"range":[1,15]},
        "durationOut":{"value":1,"range":[0.1,5]},
        "durationIn":{"value":1,"range":[0.1,5]},
        "displaceAmount":{"value":0.5},
        "masker":{"value":true},
        "maskVal":{"value":1.03,"range":[1,5]},
        "scrollType":{"value":0},
        "geoVertex":{"range":[1,64],"value": isMobile ? 1 : 1},
        "noEffectGooey":{"value":true},
        "onMouse":{"value":1},
        "noise_speed":{"value":0.2,"range":[0,10]},
        "metaball":{"value":0.2,"range":[0,2],"_gsap":{"id":3}},
        "discard_threshold":{"value":0.5,"range":[0,1]},
        "antialias_threshold":{"value":0,"range":[0,0.1]},
        "noise_height":{"value":0.5,"range":[0,2]},
        "noise_scale":{"value": isMobile ? 5 : 10,"range":[0,100]}
    },
    gooey: !isMobile // Disable gooey effect on mobile for better performance
});

// Navbar scroll effect with touch support
const nav = document.querySelector("#nav");
const handleScroll = () => {
    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
};

window.addEventListener("scroll", handleScroll);
if (isMobile) {
    window.addEventListener("touchmove", handleScroll);
}

// Smooth scroll with improved mobile support
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = isMobile ? 60 : 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Text animation enhancement with mobile optimization
var elems = document.querySelectorAll(".elem");
elems.forEach(function(elem) {
    var his = elem.querySelectorAll("h1");
    var index = 0;
    let isAnimating = false;

    const animateText = () => {
        if (isAnimating) return;
        isAnimating = true;

        gsap.to(his[index], {
            top: "-100%",
            ease: Expo.easeInOut,
            duration: isMobile ? 0.8 : 1,
            onComplete: function(){
                gsap.set(this._targets[0], {top:"100%"});
                isAnimating = false;
            }
        });
    
        index = index === his.length - 1 ? 0 : index + 1;
    
        gsap.to(his[index], {
            top: "0%",
            ease: Expo.easeInOut,
            duration: isMobile ? 0.8 : 1
        });
    };

    // Adjust animation interval based on device
    setInterval(animateText, isMobile ? 4000 : 3000);

    // Click/touch to animate
    const mainArea = document.querySelector("#main");
    if (isMobile) {
        mainArea.addEventListener("touchend", animateText);
    } else {
        mainArea.addEventListener("click", animateText);
    }
});

// Initialize GSAP scroll trigger with mobile optimization
gsap.registerPlugin(ScrollTrigger);

// Animate elements on scroll with mobile-specific settings
gsap.from("#heroright", {
    opacity: 0,
    x: isMobile ? 0 : 100,
    y: isMobile ? 50 : 0,
    duration: isMobile ? 0.8 : 1,
    scrollTrigger: {
        trigger: "#heroright",
        start: "top center+=100",
        end: "bottom center",
        scrub: isMobile ? 0.5 : 1
    }
});

// Button hover/touch effect
const button = document.querySelector("#heroleft button");
const buttonAnimation = (scale) => {
    gsap.to(button, {
        scale: scale,
        duration: isMobile ? 0.2 : 0.3,
        ease: "power2.out"
    });
};

if (isMobile) {
    button.addEventListener("touchstart", () => buttonAnimation(1.05));
    button.addEventListener("touchend", () => buttonAnimation(1));
} else {
    button.addEventListener("mouseover", () => buttonAnimation(1.05));
    button.addEventListener("mouseout", () => buttonAnimation(1));
}
