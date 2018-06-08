
// Global Registering Components

// NumberPicker
// TODO Deal with the 'maximum being inferior or equal to the minimum' problem
// TODO Deal with the mouseup / mouseleave shenanigans
// TODO Stop timer when maximum is reached
// TODO Implement MiniTimer.js once it is debugged
Vue.component('number-picker', {
    data: function() {
        return {
            value: this.min,
            timer:   null,
            callback: null,
        };
    },
    props: {
        min:    {type: Number, default: 0},
        max:    {type: Number},
        step:   {type: Number, default: 1}
    },
    watch: {
        value: function(newValue, oldValue) {
            if(newValue !== oldValue) {
                // Checking new value is not out of
                // range [min, max]
                if (isNaN(newValue)) {
                    if (isNaN(oldValue)) {
                        this.value = this.min;
                    } else {
                        this.value = this.oldValue;
                    }
                } else {
                    if (this.value < this.min) {
                        this.value = this.min;
                    }
                    // Since there's no range for the maximum by default
                    // Need to check the max type
                    if (!isNaN(this.max)) {
                        if (this.value > this.max) {
                            this.value = this.max;
                        }
                    }
                }

            }

            this.$emit('changed', this.value);
        }
    },
    methods: {
        startTo: function(action) {
            // Clear any interval set for the timer
            this.stopTo();
            // Ferform the action on click
            action();
            // And then on mousedown
            this.timer = window.setInterval(function(){
                action();
            }, 200);
        },
        stopTo: function() {
            window.clearInterval(this.timer);
        },
        increment: function() {
            this.value++;
        },
        decrement: function() {
            this.value--;
        }
    },
    template: `
        <div class="number-picker">
        <button class="number-picker-button number-picker-plus" @mousedown="startTo(increment)" @mouseup="stopTo()" @mouseleave="stopTo()">+</button>
        <input class="number-picker-input" type="text" v-model.number="value" />
        <button class="number-picker-button number-picker-plus" @mousedown="startTo(decrement)" @mouseup="stopTo()"@mouseleave="stopTo()">-</button>
        </div>
        `
});

// BattleRounds
Vue.component('battle-rounds', {
    props: ['round', 'num'],
    computed: {
        winner: function() {
            if(this.round.attacker.loss > this.round.defender.loss) {
                return 'defender';
            } else {
                return 'attacker';
            }
        },
        winnerAttacker: function() {
            return (this.round.attacker.loss < this.round.defender.loss);
        },
        winnerDefender: function() {
            return (this.round.attacker.loss > this.round.defender.loss);
        }
    },
    methods: {
        formatLoss: function(loss) {
            if (loss > 0) {
                return '-'+loss;
            } else {
                return loss;
            }
        },
        // Had to create a method that return a new array for reversing dices
        // because .reverse() method on dices trigger an infinite update loop
        // since dices is a Vue Observer
        reverseDices: function(dices) {
            var reversedDices = [];

            for(var i = 0; i < dices.length; i++) {
                reversedDices.unshift(dices[i]);
            }

            return reversedDices;
        }
    },
    template: `
        <div class="row row-round">
        <div class="col-sm-2 row-round-l row-round-la">{{formatLoss(round.attacker.loss)}}</div>
        <div class="col-sm-3 row-round-d row-round-da"><img v-for="dice in reverseDices(round.attacker.dices)" :src="'/img/b' + dice + '.png'" :alt="dice" /></div>
        <div class="col-sm-2 row-round-info">
        <span class="attacker">
        <span v-if="winnerAttacker"><</span>
        </span>
        {{num}}
        <span class="defender">
        <span v-if="winnerDefender">></span>
        </span>
        </div>
        <div class="col-sm-3 row-round-d row-round-dd"><img v-for="dice in round.defender.dices" :src="'/img/r' + dice + '.png'" :alt="dice" /></div>
        <div class="col-sm-2 row-round-l row-round-ld">{{formatLoss(round.defender.loss)}}</div>
        </div>
        `
});

// PowersDistribution
Vue.component('powers-distribution', {
    props: {
        attacker: {type: Number, default: 50},
        defender: {type: Number, default: 50}
    },
    template: `
        <div class="progress progress-powers">
        <div class="progress-bar progress-power-attacker" role="progressbar" v-bind:style="{ width: attacker + '%'}"></div>
        <div class="progress-bar progress-power-defender" role="progressbar" v-bind:style="{ width: defender + '%'}"></div>
        </div>
        `
});

// BattleDisplay
// TODO Elaborate
Vue.component('battle-display', {
    props: ['battle'],
    computed: {
        attackerArmiesLeft: function() {
            return (this.battle.attacker.armies - this.battle.attacker.loss);
        },
        defenderArmiesLeft: function() {
            return (this.battle.defender.armies - this.battle.defender.loss);
        },
    },
    methods: {
        formatLoss: function(loss) {
            if (loss > 0) {
                return '-'+loss;
            } else {
                return loss;
            }
        }
    },
    template: `
        <div id="battle">
            <div class="battle-header">
                <div class="row battle-total">
                    <div class="col-sm-2 text-center">{{battle.attacker.armies}}</div>
                    <div class="col-sm-8 text-center battle-info">Initial</div>
                    <div class="col-sm-2 text-center">{{battle.defender.armies}}</div>
                </div>
                <div class="row battle-losses">
                    <div class="col-sm-2 text-center">{{formatLoss(battle.attacker.loss)}}</div>
                    <div class="col-sm-8 text-center battle-info">Losses</div>
                    <div class="col-sm-2 text-center">{{formatLoss(battle.defender.loss)}}</div>
                </div>
                <div class="row battle-survivors">
                    <div class="col-sm-2 text-center">{{attackerArmiesLeft}}</div>
                    <div class="col-sm-8 text-center battle-info">Survivors</div>
                    <div class="col-sm-2 text-center">{{defenderArmiesLeft}}</div>
                </div>
            </div>
            <div class="row rounds-headers">
                <div class="col-sm-4 text-left">Attacker's loss</div>
                <div class="col-sm-4 text-center">Rounds</div>
                <div class="col-sm-4 text-right">Defender's loss</div>
            </div>
            <battle-rounds v-for="(round, index) in battle.rounds" :round="round" :num="index+1" :key="index"></battle-rounds>
        </div>
        `
});
