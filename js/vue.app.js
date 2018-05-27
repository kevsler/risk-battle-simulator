    VueStore.App = {

        // TODO Create a 'battle' component for rendering
        // the last battle log :
        // Display initial forces
        // Display overall losses
        // Display rounds
        // Prepare the field for a "round per round" feature
        // Start Pause Stop the battle
        // see http://optimizely.github.io/vuejs.org/guide/composition.html

        // TODO Modify the BattleSimulator to Battle in border
        // to make an instanciable classe instead of the existing interface


        el: '#app-main',
        data: {
            battles: [],
            attacker: {name: 'Arnaud', armies: 1, power: 50},
            defender: {name: 'Keevin', armies: 1, power: 50},
        },
        computed: {
            lastBattle: function() {
                return this.battles[this.battles.length-1];
            }
        },
        watch: {
            'attacker.armies': function() {
                this.attacker.armies = this.filterArmies(this.attacker.armies);
                this.calculatePowers();
            },
            'defender.armies': function() {
                this.defender.armies = this.filterArmies(this.defender.armies);
                this.calculatePowers();
            }
        },
        methods: {
            calculatePowers: function() {
                this.attacker.power = Math.floor((this.attacker.armies * 100) / (this.attacker.armies + this.defender.armies));
                this.defender.power = 100 - this.attacker.power;
            },
            attackerArmiesChanged: function(newArmiesValue) {
                this.attacker.armies = newArmiesValue;
            },
            defenderArmiesChanged: function(newArmiesValue) {
                this.defender.armies = newArmiesValue;
            },
            filterArmies: function(army) {
                if (!Number.isNaN(army)) {
                    if (army <= 1) army = 1;
                } else {
                    army = Number.parseInt(army);
                }
                return army;
            },
            // Simulate the battle given attacker's force
            // And defender's force
            simulate: function() {
                var battbatt = BattleSimulator.simulate(this.attacker.armies, this.defender.armies);
                // console.log(battbatt);
                this.battles.push(battbatt);
            },
            debug: function(object, full = true) {
                if(full) {
                    var now = new Date();
                    console.log(now.toLogString() + ' [appBattle][DEBUG] ' + object.toString());
                } else {
                    console.log(object);
                }
            },
            getBattle: function(index) {
                if (index === undefined || isNaN(index)) {
                    return this.lastBattle;
                } else {
                    return this.battles[index];
                }
            }
        },
        components: {
            'attacker-number-picker': VueStore.Components.NumberPicker,
            'defender-number-picker': VueStore.Components.NumberPicker,
            'battle-rounds': VueStore.Components.BattleRounds,
            'powers-distribution': VueStore.Components.PowersDistribution
        }
    }
