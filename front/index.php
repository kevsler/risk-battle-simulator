<?php
    include $_SERVER['DOCUMENT_ROOT'] . '/front/_header.php';
?>
        <div id="app-main">
            <div class="header-cover">
                <div class="container battle-simulator">
                    <div class="row">
                        <div class="col-sm-2 text-left">
                            <number-picker class="number-picker-attacker" :min="1" :max="999" :step="1" @changed="attackerArmiesChanged" ref="attackerNumberPicker"></number-picker>
                        </div>
                        <div class="col-sm-8 text-center">
                            <h1>Risk: Battle Simulator</h1>
                            <button id="button-vs" @click="simulate()"><img src="/img/bt-vs.png" /></button>
                        </div>
                        <div class="col-sm-2 text-right">
                            <number-picker class="number-picker-defender" :min="1" :max="999" :step="1" @changed="defenderArmiesChanged" ref="defenderNumberPicker"></number-picker>
                        </div>
                    </div>
                </div>
                <powers-distribution :attacker="attacker.power" :defender="defender.power"></powers-distribution>
            </div>
            <div class="container">
                <battle-display :battle="lastBattle" v-if="lastBattle"></battle-display>
                <!-- <div id="rounds">
                    <div class="row rounds-headers">
                        <div class="col-sm-2 text-left">Attacker's loss</div>
                        <div class="col-sm-8 text-center">Round</div>
                        <div class="col-sm-2 text-right">Defender's loss</div>
                    </div>
                    <battle-rounds v-for="(round, index) in lastBattle.rounds" :round="round" :num="index+1" :key="index"></battle-rounds>
                </div> -->
            </div>
        </div>

<?php
    include $_SERVER['DOCUMENT_ROOT'] . '/front/_footer.php';
?>
