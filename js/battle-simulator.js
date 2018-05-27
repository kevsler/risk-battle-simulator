

BattleSimulator = {
    config: {
        attackerMaximumDices: 3,
        defenderMaximumDices: 2
    },
    initBattle: function() {
        return {
            attacker: {
                armies: 0,
                loss:   0
            },
            defender: {
                armies: 0,
                loss:   0
            },
            rounds: []
        };
    },
    simulate: function(attackerArmies, defenderArmies) {
        if(isNaN(attackerArmies) || attackerArmies < 1 || isNaN(defenderArmies) || defenderArmies < 1) {
            return {};
        } else {
            var battle = this.initBattle();

            battle.attacker.armies = attackerArmies;
            battle.defender.armies = defenderArmies;

            while(battle.attacker.loss < battle.attacker.armies && battle.defender.loss < battle.defender.armies) {
                var round = this.simulateRound(battle);

                battle.attacker.loss += round.attacker.loss;
                battle.defender.loss += round.defender.loss;

                battle.rounds.push(round);
            }
        }

        return battle;
    },
    initRound: function(battle) {
        return {
            attacker: {
                armies:     0,
                loss:       0,
                maxDices:   0,
                dices:      []
            },
            defender: {
                armies:     0,
                loss:       0,
                maxDices:   0,
                dices:      []
            }
        };
    },
    simulateRound: function(battle) {
        var round = this.initRound(battle);

        round.attacker.armies = battle.attacker.armies - battle.attacker.loss;
        round.defender.armies = battle.defender.armies - battle.defender.loss;

        round.attacker.maxDices = (round.attacker.armies > BattleSimulator.config.attackerMaximumDices) ? BattleSimulator.config.attackerMaximumDices : round.attacker.armies;
        round.defender.maxDices = (round.defender.armies > BattleSimulator.config.defenderMaximumDices) ? BattleSimulator.config.defenderMaximumDices : round.defender.armies;

        for(var i=0; i < round.attacker.maxDices; i++) {
            round.attacker.dices.push(Math.floor(Math.random() * 6) + 1);
        }

        for(var i=0; i < round.defender.maxDices; i++) {
            round.defender.dices.push(Math.floor(Math.random() * 6) + 1);
        }

        round.attacker.dices.sort().reverse();
        round.defender.dices.sort().reverse();

        round.defender.dices.forEach(function(value, index) {
            if(this.attacker.dices[index] !== undefined) {
                if(this.defender.dices[index] >= this.attacker.dices[index]) {
                    this.attacker.loss++;
                } else {
                    this.defender.loss++;
                }
            }
        }, round);

        return round;
    }
}
