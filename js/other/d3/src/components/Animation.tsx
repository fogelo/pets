import {useEffect, useRef} from "react";

const Animation = () => {
    // Анимация при помощи обычного setInterval
    const move1 = (event) => {
        const target = event.target; // Получение элемента через событие
        const start = Date.now();
        const timer = setInterval(function () {
            const timePassed = Date.now() - start;
            target.setAttribute("cx", String(+target.getAttribute("cx") + 1.67)); // Обновление атрибута с использованием setAttribute для большей ясности
            if (timePassed >= 2000) {
                clearInterval(timer); // Остановка таймера после 2000 мс
            }
        }, 8);
    };

    // Анимация при помощи requestAnimationFrame ()
    const move2 = (event) => {
        const target = event.target; // Получение элемента через событие
        const start = Date.now();
        const duration = 2000; // Продолжительность анимации в миллисекундах
        const initialCx = parseFloat(target.getAttribute("cx")); // Начальное значение cx

        const animate = () => {
            const timePassed = Date.now() - start;

            const progress = timePassed / duration; // Прогресс анимации от 0 до 1

            if (timePassed <= duration) {
                const newCx = initialCx + progress * (2000 / 8 * 1.67); // Вычисление нового положения
                target.setAttribute("cx", newCx.toString());
                requestAnimationFrame(animate); // Планирование следующего кадра
            }
        };

        requestAnimationFrame(animate);
    };

    // Анимация при помощи requestAnimationFrame с использованием функций для анимации
    function animate(event, {timing, draw, duration}) {
        const start = performance.now();

        requestAnimationFrame(function animate(time) {
            // timeFraction изменяется от 0 до 1
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            // вычисление текущего состояния анимации
            const progress = timing(timeFraction);

            draw(event.target, progress); // отрисовать её

            if (timeFraction < 1) {
                requestAnimationFrame(animate); //requestAnimationFrame сам определяет частоту кадров (обычно равно частоте обновления экрана)
            }

        });
    }


    function draw(target, progress) {
        const initialCx = parseFloat(target.getAttribute("cx")); // Начальное значение cx
        const distance = 10; // желаемое расстояние анимации в пикселях
        const newCx = initialCx + progress * distance + "px"; // Вычисление нового положения
        target.setAttribute("cx", newCx.toString()); // Установка нового значения
    }


    // функции для анимации
    function linear(timeFraction) {
        return timeFraction;
    }

    function quad(timeFraction) {
        return Math.pow(timeFraction, 2)
    }

    function bounce(timeFraction) {
        for (let a = 0, b = 1; 1; a += b, b /= 2) {
            if (timeFraction >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
            }
        }
    }

    return <div style={{border: "1px solid"}}>
        <svg width={"100%"}>
            <circle r={20} cx={50} cy={25} fill={"blue"} onClick={move1}/>
            <circle r={20} cx={50} cy={75} fill={"blue"} onClick={move2}/>
            <circle r={20} cx={50} cy={125} fill={"blue"}
                    onClick={(event) => animate(event, {timing: bounce, draw, duration: 2000})}/>
        </svg>
    </div>
}

export default Animation
