import {Creature} from './creature.class';
const targetFps: number = 15;

main();

function main() {
    let creature = new Creature({
        name: 'Frank',
        hygiene: 0,
        hunger: 0,
        boredom: 0
    });

    let feedButton = document.getElementById('feed');
    let playButton = document.getElementById('play');

    feedButton.addEventListener('click', () => {
        creature.feed(5);
    });

    playButton.addEventListener('click', () => {
        creature.playWith(5);
    });

    gameLoop(creature);
}

function gameLoop(creature: Creature) {
    let beginMs = +new Date();
    let lastMs = beginMs;
    let targetDelay = (1 / targetFps) * 1000;
    let frameCount: number = 0;
    setInterval(() => {
        let nowMs = +new Date();
        let shouldRender = (nowMs - lastMs) >= targetDelay;

        if (shouldRender) {
            frameCount++;
            const seconds = (nowMs - beginMs) / 1000;
            const fps = frameCount / seconds;
            console.log('FPS: ' + fps);
            lastMs = nowMs;
            gameTick(frameCount, creature);
        }
    }, 5);
}

function gameTick(thisTick: number, creature: Creature) {
    creature.tick(thisTick);
    renderStats(creature);
}

function renderStats(creature: Creature) {
    let statsDiv = document.getElementById('stats-container');
    let statusString = creature.statuses.join(', ');

    let statsContent = `
        <span><strong>Hunger: </strong>${creature.hunger}</span>
        <span><strong>Boredom: </strong>${creature.boredom}</span>
        <span><strong>Statuses: </strong>${statusString}</span>
    `;

    statsDiv.innerHTML = statsContent;
}
