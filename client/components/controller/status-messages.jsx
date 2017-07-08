/**
 * External Dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
/**
 * Internal Dependencies
 */
import CardSymbol from 'components/ui/card-symbol';
import { getWinner } from 'state/selectors/game';

class StatusMessage extends Component {
    render() {
        const { winner, nextAppointment, dealer, player, opponent, playerInitialDraw, opponentInitialDraw } = this.props;
        let person, otherPerson, status;
        if ( this.props.paused ) {
            return <p>Game is paused.</p>;
        }
        switch( nextAppointment ) {
            case 'gameComplete':
                status = ( 'Player' === winner ) ? 'You win!' : 'Your opponent wins!';
                return <p>Game over. { status } Hit Reset to play again.</p>;

            case 'handComplete':
                return <p>Hand is complete</p>;

            case 'playerAcceptsOpponentsScore':
                return <p>Review and accept your opponents score.</p>;

            case 'playerAcceptsOwnScore':
                return <p>Review and accept your score.</p>;

            case 'playerAcceptsCribScore':
                return <p>Review and accept crib score</p>;

            case 'cribScores':
            case 'playerScores':
            case 'opponentScores':
                person = 'your';
                if ( nextAppointment === 'cribScores' ) {
                    person = 'crib';
                }
                if ( nextAppointment === 'opponentScores') {
                    person = 'your opponent\'s';
                }
                return <p>Calculating { person } score...</p>;

            case 'awardHisHeels':
                person = ( 'Opponent' === dealer ) ? 'You' : 'Your opponent';
                otherPerson = ( 'Opponent' === dealer ) ? 'your opponent' : 'you';
                return <p>{ person } cut a Jack. Two points awarded to { otherPerson }!</p>;

            case 'playerCuts':
                return <p>Tap the deck to cut a card!</p>;

            case 'opponentCuts':
                return <p>Waiting for opponent to cut a card...</p>;

            case 'opponentDiscards':
                return <p>Waiting for opponent to discard...</p>;

            case 'playerDiscards':
                person = ( 'Player' === dealer ) ? 'your' : "your opponent's";
                return <p>Select two cards to discard to { person } crib.</p>;

            case 'dealCardToPlayer':
            case 'dealCardToOpponent':
                if ( player.hand.length === 0 && opponent.hand.length === 0 ) {
                    return <p>Shuffling the deck...</p>;
                }
                return <p>Dealing cards...</p>;

            case 'buildDeck':
                return <p>Shuffling the deck...</p>;

            case 'awaitDraw':
                return <p>Tap deck to pick a card.<br />Lowest draw gets first crib!</p>;

            case 'opponentDraw':
                return (
                    <p>
                        You drew the <CardSymbol card={ playerInitialDraw }/>.<br />
                        Waiting for opponent to draw...
                    </p>
                );

            case 'assignFirstDealer':
                return <p>Your opponent drew the <CardSymbol card={ opponentInitialDraw } />.</p>;

            case 'resetDeck':
                person = ( 'Player' === dealer ) ? 'you' : 'your opponent';
                return <p>First crib belongs to { person }!</p>;

            default:
                return <p>WordPress Cribbage</p>;
        }
    }
}

export default connect(
    state => {
        return {
            winner: getWinner( state )
        }
    }
)( StatusMessage );