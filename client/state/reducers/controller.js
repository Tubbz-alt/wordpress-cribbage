/**
 * Internal Dependencies
 */
import {
    CONTROLLER_BUILDS_DECK,
    CONTROLLER_RESET_GAME,
    CONTROLLER_TOGGLE_TIMER,
    PLAYER_INITIAL_DRAW,
    OPPONENT_INITIAL_DRAW,
    CONTROLLER_ASSIGNS_FIRST_DEALER,
    CONNTROLLER_RESET_DECK
} from '../action-types';

export const defaultState = {
    nextAppointment: 'buildDeck',
    isPaused: false
};

const controller = ( state = defaultState, action ) => {
    switch (action.type) {
        case CONNTROLLER_RESET_DECK:
            const nextAppointment = ( 'Opponent' === action.dealer ) ? 'dealCardToPlayer' : 'dealCardToOpponent';
            return Object.assign( {}, state, { nextAppointment } );
        case CONTROLLER_ASSIGNS_FIRST_DEALER:
            return Object.assign( {}, state, { nextAppointment: 'resetDeck' } );
        case OPPONENT_INITIAL_DRAW:
            return Object.assign( {}, state, { nextAppointment: 'assignFirstDealer' } );
        case PLAYER_INITIAL_DRAW:
            return Object.assign( {}, state, { nextAppointment: 'opponentDraw' } );
        case CONTROLLER_TOGGLE_TIMER:
            return Object.assign( {}, state, { isPaused: ! state.isPaused } );
        case CONTROLLER_RESET_GAME:
            return defaultState;
        case CONTROLLER_BUILDS_DECK:
            return Object.assign( {}, state, { nextAppointment: 'awaitDraw' } );
        default:
            return state
    }
};

export default controller;