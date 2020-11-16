var rewire = require('rewire');
var formDeck = rewire('./teen_patti').__get__("formDeck");
var getHandScore = rewire('./teen_patti').__get__("getHandScore");
var checkForTie = rewire('./teen_patti').__get__("checkForTie");
var disperseCards = rewire('./teen_patti').__get__("disperseCards");
var shuffleCards = rewire('./teen_patti').__get__("shuffleCards");
var getCardWeight = rewire('./teen_patti').__get__("getCardWeight");
var tieBreaker = rewire('./teen_patti').__get__("tieBreaker");


const init_deck = ["A.♣", "K.♣", "Q.♣", "J.♣", "10.♣", "9.♣", "8.♣", "7.♣", "6.♣", "5.♣", "4.♣", "3.♣", "2.♣", "A.♦", "K.♦", "Q.♦", "J.♦", "10.♦", "9.♦", "8.♦", "7.♦", "6.♦", "5.♦", "4.♦", "3.♦", "2.♦", "A.♥", "K.♥", "Q.♥", "J.♥", "10.♥", "9.♥", "8.♥", "7.♥", "6.♥", "5.♥", "4.♥", "3.♥", "2.♥", "A.♠", "K.♠", "Q.♠", "J.♠", "10.♠", "9.♠", "8.♠", "7.♠", "6.♠", "5.♠", "4.♠", "3.♠", "2.♠"]
describe('formDeck', function() {
    it('forms a deck from a combination of suites and denominatioons', function() {
      expect(formDeck()).toEqual(init_deck);
    });
});

// describe('shuffleCards', function() {
//     it('takes the input of an ordered deck and rearranges using Knuth shuffle', function() {
//         mockRandom([0.5]);
//         expect(shuffleCards(init_deck)).toEqual([
//             'A.♣','7.♥','K.♣','4.♠','Q.♣','Q.♠','J.♣','J.♥','10.♣','3.♥',  '9.♣',  '8.♠','8.♣',  'K.♥',  '7.♣',  '9.♥','6.♣',  '5.♥',  '5.♣',  'A.♠','4.♣', '10.♠',  '3.♣',  '6.♠','2.♣',  '2.♠',  'A.♦',  'Q.♥','K.♦', '10.♥',  'Q.♦',  '8.♥','J.♦',  '6.♥', '10.♦',  '4.♥','9.♦',  '2.♥',  '8.♦',  'K.♠','7.♦',  'J.♠',  '6.♦',  '9.♠','5.♦',  '7.♠',  '4.♦',  '5.♠','3.♦',  '3.♠',  '2.♦',  'A.♥'
//          ]);
//     });
// });


describe('disperseCards', function() {
    it('distributes cards among players, input is shuffled_deck array, noOfPlayers(default 4) and noOfCards(default 3), returns distributed cards obj with _PENDING key holding undistrubted cards', function() {
      let shuffled_deck = ["A.♣", "K.♣", "Q.♣", "J.♣", "10.♣", "9.♣", "8.♣", "7.♣", "6.♣", "5.♣", "4.♣", "3.♣", "2.♣", "A.♦", "K.♦", "Q.♦", "J.♦", "10.♦", "9.♦", "8.♦", "7.♦", "6.♦", "5.♦", "4.♦", "3.♦", "2.♦", "A.♥", "K.♥", "Q.♥", "J.♥", "10.♥", "9.♥", "8.♥", "7.♥", "6.♥", "5.♥", "4.♥", "3.♥", "2.♥", "A.♠", "K.♠", "Q.♠", "J.♠", "10.♠", "9.♠", "8.♠", "7.♠", "6.♠", "5.♠", "4.♠", "3.♠", "2.♠"]
      expect(disperseCards(shuffled_deck)).toEqual({"I": ["A.♣", "K.♣", "Q.♣"], "II": ["J.♣", "10.♣", "9.♣"], "III": ["8.♣", "7.♣", "6.♣"], "IV": ["5.♣", "4.♣", "3.♣"], "_PENDING": ["2.♣", "A.♦", "K.♦", "Q.♦", "J.♦", "10.♦", "9.♦", "8.♦", "7.♦", "6.♦", "5.♦", "4.♦", "3.♦", "2.♦", "A.♥", "K.♥", "Q.♥", "J.♥", "10.♥", "9.♥", "8.♥", "7.♥", "6.♥", "5.♥", "4.♥", "3.♥", "2.♥", "A.♠", "K.♠", "Q.♠", "J.♠", "10.♠", "9.♠", "8.♠", "7.♠", "6.♠", "5.♠", "4.♠", "3.♠", "2.♠"]});
      expect(disperseCards(shuffled_deck,5,3)).toEqual({"I": ["A.♣", "K.♣", "Q.♣","J.♣", "10.♣"], "II": ["9.♣","8.♣", "7.♣", "6.♣","5.♣"], "III": ["4.♣", "3.♣","2.♣", "A.♦", "K.♦"], "_PENDING": ["Q.♦", "J.♦", "10.♦", "9.♦", "8.♦", "7.♦", "6.♦", "5.♦", "4.♦", "3.♦", "2.♦", "A.♥", "K.♥", "Q.♥", "J.♥", "10.♥", "9.♥", "8.♥", "7.♥", "6.♥", "5.♥", "4.♥", "3.♥", "2.♥", "A.♠", "K.♠", "Q.♠", "J.♠", "10.♠", "9.♠", "8.♠", "7.♠", "6.♠", "5.♠", "4.♠", "3.♠", "2.♠"]});
      expect(disperseCards(shuffled_deck,3,5)).toEqual({"I": ["A.♣", "K.♣", "Q.♣"], "II": ["J.♣", "10.♣", "9.♣"], "III": ["8.♣", "7.♣", "6.♣"], "IV": ["5.♣", "4.♣", "3.♣"], "V": ["2.♣", "A.♦", "K.♦"], "_PENDING": ["Q.♦", "J.♦", "10.♦", "9.♦", "8.♦", "7.♦", "6.♦", "5.♦", "4.♦", "3.♦", "2.♦", "A.♥", "K.♥", "Q.♥", "J.♥", "10.♥", "9.♥", "8.♥", "7.♥", "6.♥", "5.♥", "4.♥", "3.♥", "2.♥", "A.♠", "K.♠", "Q.♠", "J.♠", "10.♠", "9.♠", "8.♠", "7.♠", "6.♠", "5.♠", "4.♠", "3.♠", "2.♠"]});
    });
});

describe('getHandScore', function() {
    it('returns a 1000 score for A A A', function() {
      expect(getHandScore(['A.♣,A.♦,A.♠'])).toBe(1000);
    });
    it('returns a score between 988 to 1000 for trips', function() {
        expect(getHandScore(['J.♣,J.♦,J.♠'])).toBe(997);
        expect(getHandScore(['7.♣,7.♦,7.♠'])).toBe(993);
        expect(getHandScore(['2.♣,2.♦,2.♠'])).toBe(988);
    });
    it('returns a score between 600 to 621 for sequential cards', function() {
        expect(getHandScore(['A.♣','2.♦','3.♠'])).toBe(600);
        expect(getHandScore(['3.♣','5.♦','4.♠'])).toBe(604);
        expect(getHandScore(['J.♣','Q.♦','K.♠'])).toBe(621);
    });
    it('returns a score between 200 to 400 for pair cards, adds more weight to the score according to the third unique weight', function() {
        expect(getHandScore(['A.♣','A.♦','3.♠'])).toBe(384);
        expect(getHandScore(['2.♣','2.♦','4.♠'])).toBe(217);
        expect(getHandScore(['7.♣','2.♦','7.♠'])).toBe(285);
        expect(getHandScore(['7.♣','Q.♦','7.♠'])).toBe(295);
        expect(getHandScore(['7.♣','K.♦','7.♠'])).toBe(296);
    });
    it('returns a score between 100 to 113 for general cards, weights defined on the basis of HIGH Rank card', function() {
        expect(getHandScore(['A.♣','2.♦','5.♠'])).toBe(113);
        expect(getHandScore(['Q.♣','2.♦','K.♠'])).toBe(112);
        expect(getHandScore(['3.♣','2.♦','5.♠'])).toBe(104);
        expect(getHandScore(['9.♣','3.♦','2.♠'])).toBe(108);
    });
});

describe('getCardWeight', function() {
    it('returns the weight of the card irrespective of suite, Highest: A, Lowest: 2', function() {
        expect(getCardWeight("A.♣")).toBe(13)
        expect(getCardWeight("K.♣")).toBe(12)
        expect(getCardWeight("Q.♣")).toBe(11)
        expect(getCardWeight("J.♦")).toBe(10)
        expect(getCardWeight("10.♦")).toBe(9)
        expect(getCardWeight("9.♦")).toBe(8)
        expect(getCardWeight("8.♦")).toBe(7)
        expect(getCardWeight("7.♠")).toBe(6)
        expect(getCardWeight("6.♠")).toBe(5)
        expect(getCardWeight("5.♠")).toBe(4)
        expect(getCardWeight("4.♦")).toBe(3)
        expect(getCardWeight("3.♦")).toBe(2)
        expect(getCardWeight("2.♦")).toBe(1)

    });
});

describe('tieBreaker', function() {
    it('resolves tie situations by assigning one card to each player per chance, till the tie resolves input: [tied_player_arr, pending_cards_arr] [player draws card in the same order as received in tied_player_arr]', function() {
      expect(tieBreaker(['IV','I'], ['A.♣','A.♦','A.♠','7.♠'] )).toBe('IV');
      expect(tieBreaker(['IV','I','III'], ['A.♣','A.♦','A.♠','7.♠','8.♣', '7.♣'] )).toBe('I');
      expect(tieBreaker(['I', 'III', 'II', 'IV'], ['A.♣','A.♦','A.♠','A.♥',"K.♠", "Q.♠", "J.♠", "10.♠"] )).toBe('I');
    });
});




describe('checkForTie', function() {
    it('checks for ties, returns 0 if there is no tie, returns a number (of ties) if ties exist', function() {
      expect(checkForTie(['IV','I','II','III'],{ I: 112, II: 111, III: 109, IV: 113 })).toBe(0);
      expect(checkForTie(['IV','I','II','III'],{ I: 113, II: 111, III: 109, IV: 113 })).toBe(2);
      expect(checkForTie(['IV','I','II','III'],{ I: 113, II: 113, III: 109, IV: 113 })).toBe(3);
      expect(checkForTie(['IV','I','II','III'],{ I: 113, II: 113, III: 113, IV: 113 })).toBe(4);
    });
});

