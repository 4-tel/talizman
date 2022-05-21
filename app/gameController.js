class gameController {

    constructor(playerArray) {
        this.playerArray = playerArray;
    }

    round = async () => {
        moveToLocation() //ruch
        if (othersOnLocation()) { // Czy na obszarze przebywają inni Poszukiwacze?

            if (encounterDecision()) { // Czy chcesz któregoś spotkać?

                combat() //Walka
                return (endOfRound()) //Twoja tura się kończy

            }
        }
        else {

            if (locationType() == "default") { //czy znajdujesz się na obszarze "wylosuj x kart"?
                if (leftCards()) { //czy na lokacji znajdują się już jakies karty?
                    drawCards() //dobierz resztę kart
                    useCards(locationCards()) //postępuj zgodnie z treścią kart
                }
                else {
                    drawCards() //dobierz karty
                    useCards(locationCards()) //postępuj zgodnie z treścią kart
                }
                if (encounterRoundLoss()) { //czy w wyniku walki tracisz turę?
                    return (endOfRound()) //Twoja tura się kończy
                }
                else {
                    if (wonAllFights()) { //czy pokonałeś wszystkich wrogów na lokacji?
                        if (haveToMove()) { //czy w wyniku spotkania zostałeś przesunięty na inny obszar?
                            this.round() //zacznij ponownie rundę w nowym miejscu
                        }
                        else {
                            collectGoods() //zbierz przedmioty, przyjaciół i złoto z danego obszaru
                            if (haveToMove()) { //czy w wyniku spotkania zostałeś przesunięty na inny obszar?
                                this.round() //zacznij ponownie rundę w nowym miejscu
                            }
                            else {
                                return (endOfRound()) //Twoja tura się kończy
                            }
                        }
                    }
                    else {
                        return (endOfRound()) //Twoja tura się kończy
                    }
                }

            }
            else {
                if (leftCards()) { //czy na lokacji znajdują się już jakies karty?
                    useCards(locationCards()) //postępuj zgodnie z treścią kart
                    if (encounterRoundLoss()) { //czy w wyniku walki tracisz turę?
                        return (endOfRound()) //Twoja tura się kończy
                    }
                    else {
                        if (wonAllFights()) { //czy pokonałeś wszystkich wrogów na lokacji?
                            specialLocation() //postępuj zgodznie z poleceniem obszaru
                        collectGoods() //zbierz przedmioty, przyjaciół i złoto z danego obszaru
                        if (haveToMove()) { //czy w wyniku spotkania zostałeś przesunięty na inny obszar?
                            this.round() //zacznij ponownie rundę w nowym miejscu
                        }
                        else {
                            return (endOfRound()) //Twoja tura się kończy
                        }
                        }
                        else {
                            return (endOfRound()) //Twoja tura się kończy
                        }
                        
                    }
                }
                else {
                    specialLocation() //postępuj zgodznie z poleceniem obszaru
                    collectGoods() //zbierz przedmioty, przyjaciół i złoto z danego obszaru
                    if (haveToMove()) { //czy w wyniku spotkania zostałeś przesunięty na inny obszar?
                        this.round() //zacznij ponownie rundę w nowym miejscu
                    }
                    else {
                        return (endOfRound()) //Twoja tura się kończy
                    }
                }


            }

        }

    }
}