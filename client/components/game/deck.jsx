/**
 * External Dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
/**
 * Internal Dependencies
*/
import Card from './card';
import { getDeck, getCutCard } from 'state/selectors/game';
import { getNextAppointment, isPaused } from 'state/selectors/controller';
import { playerDraws } from 'state/actions/player';
import { selectRandomCutCard } from 'state/actions/controller';

class Deck extends Component {
    handleClick = ( event ) => {
        event.preventDefault();

        if ( this.props.paused ) {
            console.log( 'No action when game is paused.' );
            return;
        }

        if ( 'awaitDraw' === this.props.nextAppointment ) {
            const card = this.props.deck[0];
            this.props.playerDraws( card );
        }

        if ( 'playerCuts' === this.props.nextAppointment ) {
            this.props.selectRandomCutCard( this.props.deck );
        }
    };

    renderCards() {
        let cutCard = null, deckIndex = 0;
        if ( this.props.cutCard ) {
            cutCard = <Card card={ this.props.cutCard } index={ 1 } />;
            deckIndex = 2;
        }
        return (
            <div>
                <Card faceDown={ true } index={ deckIndex } />
                { cutCard }
            </div>
        );
    }

    render() {
        return (
            <div className="deck" onClick={ this.handleClick }>
                { this.renderCards() }
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            deck: getDeck( state ),
            nextAppointment: getNextAppointment( state ),
            paused: isPaused( state ),
            cutCard: getCutCard( state )
        }
    },
    {
        playerDraws,
        selectRandomCutCard
    }
)( Deck );