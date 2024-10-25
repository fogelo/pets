// @Пример 1. Мультимедийная система


// * ООП
class AudioSystem {
    turnOn() {
        console.log("Audio system turned on");
    }

    turnOff() {
        console.log("Audio system turned off");
    }
}

class TV {
    turnOn() {
        console.log("TV turned on");
    }

    turnOff() {
        console.log("TV turned off");
    }
}

class Lights {
    dim() {
        console.log("Lights are dimmed");
    }
}

class HomeTheaterFacade {
    constructor() {
        this.audioSystem = new AudioSystem();
        this.tv = new TV();
        this.lights = new Lights();
    }

    watchMovie() {
        console.log("Get ready to watch a movie...");
        this.lights.dim();
        this.audioSystem.turnOn();
        this.tv.turnOn();
    }

    endMovie() {
        console.log("Shutting down the movie theater...");
        this.tv.turnOff();
        this.audioSystem.turnOff();
    }
}

const homeTheater = new HomeTheaterFacade();
homeTheater.watchMovie();
homeTheater.endMovie();

// * ФП
// В функциональном стиле мы определяем функции для каждого устройства и создаем фасад, который использует эти функции.
function turnOnAudio() {
    console.log("Audio system turned on");
}

function turnOffAudio() {
    console.log("Audio system turned off");
}

function turnOnTV() {
    console.log("TV turned on");
}

function turnOffTV() {
    console.log("TV turned off");
}

function dimLights() {
    console.log("Lights are dimmed");
}

function watchMovie() {
    console.log("Get ready to watch a movie...");
    dimLights();
    turnOnAudio();
    turnOnTV();
}

function endMovie() {
    console.log("Shutting down the movie theater...");
    turnOffTV();
    turnOffAudio();
}

// Использование фасада
watchMovie();
endMovie();
