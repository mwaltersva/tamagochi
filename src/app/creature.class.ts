import {CreatureOptions} from './creature-options.interface';
export class Creature {
    name: string = 'The Creature';
    hunger: number = 0;
    lastHungerTick: number = 0;
    boredom: number = 0;
    lastBoredomTick: number = 0;
    hygiene: number = 0;
    lastHygieneTick: number = 0;
    statuses: string[] = [];
    alive: boolean = true;
    lastUpdated: number = 0;

    constructor(opts: CreatureOptions) {
        this.name = opts.name;
        this.hunger = opts.hunger;
        this.boredom = opts.boredom;
        this.hygiene = opts.hygiene;
    }

    feed(foodValue: number) {
        this.hunger -= foodValue;
        return this.hunger;
    }

    playWith(boredomValue: number) {
        this.boredom -= boredomValue;
        return this.boredom;
    }

    clean(hygieneValue: number) {
        this.hygiene -= hygieneValue;

        if (hygieneValue < 0) this.hygiene = 0;

        return this.hygiene;
    }

    tick(thisTick: number) {
        this.updateHunger(thisTick);
        this.updateBoredom(thisTick);
        this.calculateStatuses();
    }

    updateHunger(thisTick) {
        if (thisTick - this.lastHungerTick > 75) {
            this.hunger++;
            this.lastHungerTick = thisTick;
        }

        return this.hunger;
    }

    updateBoredom(thisTick) {
        if (thisTick - this.lastBoredomTick > 150) {
            this.boredom++;
            this.lastBoredomTick = thisTick;
        }
    }

    calculateStatuses() {
        this.statuses = [];
        this.statuses.push(...this.getHungerStatuses());
        this.statuses.push(...this.getBoredomStatuses());
    }

    getHungerStatuses() {
        let result = [];
        if (this.hunger < -50) {
            result.push('Stuffed');
        } else if (this.hunger < 0) {
            result.push('Well Fed');
        } else if (this.hunger < 10) {
            result.push('Satisfied');
        } else if (this.hunger < 20) {
            result.push('Peckish');
        } else if (this.hunger < 50) {
            result.push('Hungry');
        } else if (this.hunger < 80) {
            result.push('Starving');
        }

        return result;
    }

    getBoredomStatuses() {
        let result = [];
        if (this.boredom < -10) {
            result.push('Overstimulated');
        } else if (this.boredom < 10) {
            result.push('Content');
        } else if (this.boredom < 50) {
            result.push('Fidgity');
        } else if (this.boredom < 101) {
            result.push('Restless');
        }

        return result;
    }
}
