const scroller = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
});

gsap.registerPlugin(Flip);

CustomEase.create("cubic", "0.83, 0, 0.17, 1");

const gallery = document.querySelector(".img-gallery-container");
const wrapper = document.querySelector(".img-gallery");
const images = gsap.utils.toArray(".img");

document.querySelector(".btn").addEventListener("click", () => {
    let state = Flip.getState(".img-gallery-container .img");

    gallery.classList.toggle("order");

    images.forEach((img, i) => {
        img.classList.toggle("reorder");

        if (img.classList.contains("reorder")) {
            gsap.set(img, {
                rotate: i * 3,
                duration: 0.5,
                ease: "power2.out",
            });
        } else {
            gsap.to(img, {
                rotate: 0,
                duration: 1,
                delay: -1,
                ease: "power2.out",
            });
        }
    });

    Flip.from(state, {
        absolute: true,
        duration: 2,
        stagger: 0.05,
        ease: "cubic",
        onComplete: () => {
            scroller.scrollTo(0, { duration: 0 });
        },
    });
});
