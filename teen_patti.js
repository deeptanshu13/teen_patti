
// Teen patti
// Includes deck of cards (52)
// Basic operation of shuffling and distributing among players
// suites notations are humam readable
// player names are roman literals

var denomination = ['A','K','Q','J','10','9','8','7','6','5','4','3','2']
var card_seq_sort = ['K','Q','J','10','9','8','7','6','5','4','3','2','A']
var reverse_card_seq_sort = card_seq_sort.reverse()
var player_name = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII']
var suites = ['♣','♦','♥','♠']


//FX to generate a deck of 52 cards, ordered [TESTED]
function formDeck(){
    let deck = []
    for(let k in suites){
        for(let j in denomination){
            deck.push(denomination[j] +'.'+ suites[k])
        }
    }

    return deck
}

//FX to shuffle cards on the basis of Knuth algo [UNTESTED]
function shuffleCards(deck){
    var cur_idx = deck.length
    var temp_val,random_idx

    while ( 0 !== cur_idx) {
        //randomly picking swap elem index
        random_idx = Math.floor(Math.random() * cur_idx)
        cur_idx = cur_idx-1

        //swapping vals
        temp_val = deck[cur_idx]
        deck[cur_idx] = deck[random_idx]
        deck[random_idx] = temp_val
    }

    return deck

}

//FX to distribure cards to players, takes input as UNORDERED_DECK, number of cards(default: 3), number of player(default: 4). also returns _PENDING in card array for tie scenarios [TESTED]
function disperseCards( shuffled_deck, noOfCards=3, noOfPlayers=4){
    var distribution_matrix = {}
    //fail check case
    if(noOfPlayers * noOfCards <= 52){
        for(let j=0; j< noOfPlayers; j++){
            //slicing the shuffled deck, distributing to players
            distribution_matrix[player_name[j]] = shuffled_deck.slice(j*noOfCards, (j+1)*noOfCards)
            if(j == (noOfPlayers -1)){
                distribution_matrix['_PENDING'] = shuffled_deck.slice((j+1)*noOfCards)
            }
        }
        return distribution_matrix
    
    }else{
        throw 'Cannot distribute evenly'
    }

}

//FX to resolve scores of hand, could be anything from 100-1000, 1000 is A trips
// scoring weights in accordance to the assignment sheet
// score above 600 shows sequential cards , irrespective of suite
// score above 200 shows pair in hand
// score above 100 shows normal, no lit cards
// score resolution is done on the order of denomination [HIGHEST: A, LOWEST: 2]
// [TESTED]

function getHandScore(hand){
    let suiteRemovedandSorted = hand.map((x)=> { return x.split('.')[0] }).sort((x,y)=>{
        return card_seq_sort.indexOf(x) - card_seq_sort.indexOf(y)
    })

    //checking teen patti , assuming hand.length = 3 for teen patti
    if(suiteRemovedandSorted.filter((x)=> { return x === suiteRemovedandSorted[0] }).length == hand.length){
        return 987 + (13 - denomination.indexOf(suiteRemovedandSorted[0]))
    }

    //checking sequence, incremental score for the order of seq
    //eg A,2,3 - LOWEST J,Q,K - HIGHEST
    if(reverse_card_seq_sort.toString().includes(suiteRemovedandSorted.toString())){
        return 600 + reverse_card_seq_sort.toString().indexOf(suiteRemovedandSorted.toString())
    }

    // checking for pairs
    // assuming safely that hand.length == 3, needs to modify if condition if hand.length > 3
    if(suiteRemovedandSorted.filter((x)=> { return x === suiteRemovedandSorted[1] }).length == 2){
        let decisive = suiteRemovedandSorted[0]
        if(suiteRemovedandSorted[0] == suiteRemovedandSorted[1]){
            decisive = suiteRemovedandSorted[2]
        }
        return 200  + (13 - denomination.indexOf(suiteRemovedandSorted[1])) *14 + (13 - denomination.indexOf(decisive))
    }


    if(!suiteRemovedandSorted.includes('A')){
        return 100 + (13 - denomination.indexOf(suiteRemovedandSorted[hand.length-1]))
    }else{
        //suiteRemovedandSorted[0] is A, done to accomodate the A-1 (sequence) and preference of A in case of a tie
        return 100 + (13 - denomination.indexOf(suiteRemovedandSorted[0]))
    }
   
}

//FX to return card weight [HIGHEST: A, LOWEST: 2]
function getCardWeight(card){
    let card_val = card.split('.')[0]
    return (13 - denomination.indexOf(card_val))
}

//FX to resolve ties on the basis of drawing a card and comparing its weight between the tied players
function tieBreaker(tied_players, pending_deck){
    let starting_idx = 0
    while((starting_idx + tied_players.length) <= pending_deck.length ){
        let score_arr = []
        for(let k in tied_players){
            score_arr.push(getCardWeight(pending_deck[Number(starting_idx) + Number(k)]))
            if(k == tied_players.length -1){ //in the last iteration, check for clashes
                let sorted_score_arr = score_arr.slice().sort((x,y)=> { return y - x }) //.slice used in order to preserve the original array
                if(sorted_score_arr[0] != sorted_score_arr[1]){
                    //if no further ties, return player value
                    return tied_players[score_arr.indexOf(sorted_score_arr[0])]
                }else{
                    //if tie continues, even after iterations
                    starting_idx += Number(tied_players.length)
                }
            }
        }
        console.log('One more Tie...Trying to resolve....')
    }
    throw 'TIED TILL THE LAST OF THE DECK'  //edge case, even if drawing one card for tied players results in the tie by the end of the deck
}

//FX to check for the initial ties of score, executed during the first distribution.
function checkForTie(keysSorted, player_score_obj){
    let is_tie = 0
    for(let j=0;j<keysSorted.length -1;j++){
        if(player_score_obj[keysSorted[j]] == player_score_obj[keysSorted[j+1]]){
            is_tie++
        }else{
            break
        }
    }

    if(is_tie != 0){
        return is_tie+1 //to adjust for one less loop iteration
    }

    return is_tie
}

(function _main_(){

    let players = 4
    let noOfCards = 3
    let init_deck = shuffleCards(formDeck())
    let distribution = ( disperseCards(init_deck,noOfCards,players))
    console.log('DISTRIBUTION OBJECT : ', distribution)
    let player_score_obj = {}

    //getting the scores of players HAND and assigning it to player_score_obj
    for(let i=0; i<players;i ++){
        player_score_obj[player_name[i]] = getHandScore(distribution[player_name[i]])
    }

    let keysSorted = Object.keys(player_score_obj).sort(function(a,b){return player_score_obj[b]-player_score_obj[a]})
    
    console.log('PLAYERS INITIAL SCORES : ', player_score_obj)


    let is_tie =  checkForTie(keysSorted, player_score_obj)


    console.log('PLAYERS SORTED(SCORE) : ', keysSorted)


    if(!is_tie){
        console.log('WINNER : ', keysSorted[0] , ' PLAYER' )
    }else{
        let tied_players = keysSorted.slice(0,is_tie)
        console.log(' *****************PLAYERS TIED SCENARIO****************')
        console.log('TIED PLAYERS ON THE BASIS OF SCORE : ', tied_players)
        let winner = tieBreaker(tied_players,distribution._PENDING)
        console.log('WINNER [AFTER INITIAL TIE] : ', winner)
    }
})
//() // <-- IIFE , uncomment this part to execute 