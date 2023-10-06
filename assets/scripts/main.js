(() => {
    gsap.registerPlugin(ScrollTrigger);

    const perks = [...document.querySelectorAll('.perks-section .btn-perk')],
        contactForm = document.querySelector('#contact'),
        sendBtn = document.querySelector('#sendBtn');

    const validateFields = (fields = []) => {
        for (const field of fields) {
            if (!contactForm[field].value) {
                window.alert(`Por favor ingresa un ${field}`);
                return false;
            }

            if (field === 'correo' && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(contactForm[field].value)) {
                window.alert(`Por favor ingresa un ${field} válido`);
                return false;
            }
        }

        return true;
    }

    document.addEventListener('DOMContentLoaded', () => {
        // Challenge mark
        gsap.to('.grid .mark', {
            rotation: 360,
            repeat: -1,
            duration: 7,
            ease: 'linear',
        });

        // Decorator
        gsap.to('.decorator', {
            y: 50,
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: 'easeInOut',
        });

        gsap.to('.star', {
            scale: 1.2,
            repeat: -1,
            yoyo: true,
            duration: 1,
            ease: 'easeInOut',
        });
        gsap.to('.arrow', {
            y: 20,
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: 'easeInOut',
        });


        // Grid
        gsap.from('.grid > div', {
            scrollTrigger: {
                trigger: '.grid-section',
                toggleActions: 'play none none reset',
            },
            delay: 1,
            y: -50,
            opacity: 0,
            duration: 0.5,
            stagger: 0.2,
            ease: 'easeIn',
        });

        perks.forEach(perk => {
            perk.addEventListener('click', e => {
                const container = e.target.parentElement;

                if (container.classList.contains('open'))
                    return container.classList.remove('open');

                return container.classList.add('open');
            });
        });

        sendBtn.addEventListener('click', e => {
            e.preventDefault();

            if (!validateFields(['nombre', 'telefono', 'correo', 'mensaje'])) return;

            const output = `¡Hola! Me interesa registrarme en el Reto 21 Días\nNombre: ${contactForm.nombre.value}\nCorreo: ${contactForm.correo.value}\nTeléfono: ${contactForm.telefono.value}\nMensaje: ${contactForm.mensaje.value}`,
                url = `https://api.whatsapp.com/send?phone=5213331279526&text=${output}`;

            window.open(url.replaceAll('\n', '%0A'), '_blank');
        });
    });
})();