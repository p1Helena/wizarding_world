document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('[data-tab-button]');
    const carousel = document.querySelector('.personage_carousel');
    const questions = document.querySelectorAll('[data-faq-question]');
    const select = document.querySelector('.personagens_select');

    const heroSection = document.querySelector(".hero");
    const alturaHero = heroSection.clientHeight;

    window.addEventListener('scroll', function() {
        const posicaoAtual = window.scrollY;

        if (posicaoAtual < alturaHero) {
            ocultaElementosDoHeader();
        } else {
            exibeElementosDoHeader();
        }
    })

    //select
    if (select) {
        select.addEventListener('change', function() {
            const botao = document.querySelector(
                `.personagens [data-tab-button="${select.value}"]`
            );

            if (botao) {
                botao.click();
            }
        });
    }

    //Carrossel de personagens
    if (carousel) {
        const arrows = carousel.querySelectorAll('.personage_arrow');

        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {

                const list = carousel.querySelector('.personage_list--is-active');

                if (!list) return;

                const direction = arrow.classList.contains('personage_arrow--prev') ? -1 : 1;

                list.scrollBy({
                    left: direction * list.clientWidth,
                    behavior: 'smooth'
                });
            });
        });
    }

    // Seção de filmes e personagens, programação das abas
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function(botao) {
            const secao = botao.currentTarget.closest('section');

            let classe;
            let tipo;

            if (secao.classList.contains('film')) {
                classe = 'film';
                tipo = 'list';
            } else if (secao.classList.contains('personage')) {
                classe = 'personage';
                tipo = 'list';
            } else if (secao.classList.contains('personagens')) {
                classe = 'personagens';
                tipo = 'intro';
            } else {
                return;
            }

            const abaAlvo = botao.currentTarget.dataset.tabButton;
            const aba = secao.querySelector(`[data-tab-id="${abaAlvo}"]`);

            if (!aba) return;

            escondeTodasAbas(secao, classe, tipo);
            aba.classList.add(`${classe}_${tipo}--is-active`);

            removeBotaoAtivo(secao, classe);
            botao.currentTarget.classList.add(`${classe}_tabs_button--is-active`);
        });
    }

    //Seção FAQ, accordion
    for (let i = 0; i < questions.length; i++) {
        questions[i].addEventListener('click', abreOuFechaResposta);
    }
});

function ocultaElementosDoHeader() {
    const header = document.querySelector('header');
    header.classList.add('header--is-hidden');
}

function exibeElementosDoHeader() {
    const header = document.querySelector('header');
    header.classList.remove('header--is-hidden');
}

function abreOuFechaResposta(elemento) {
    const classe = 'faq_questions_item--is-open';
    const elementoPai = elemento.currentTarget.parentNode;

    elementoPai.classList.toggle(classe);
}

function removeBotaoAtivo(secao, classe) {
    const buttons = secao.querySelectorAll('[data-tab-button]');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove(`${classe}_tabs_button--is-active`);
    }
}

function escondeTodasAbas(secao, classe, tipo) {
    const tabsContainer = secao.querySelectorAll('[data-tab-id]');

    for (let i = 0; i < tabsContainer.length; i++) {
        tabsContainer[i].classList.remove(`${classe}_${tipo}--is-active`);
    }
}