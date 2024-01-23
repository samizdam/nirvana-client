import {
	Action,
	AnyAction,
	ThunkDispatch,
	UnknownAction,
	configureStore
} from '@reduxjs/toolkit'
import notificationReducer from '../../entities/Notification/slice'
import curTracksReducer from '../../entities/CurTracks/slice'
import radiosReducer from '../../entities/Radios/slice'
import promoReducer from '../../entities/Promo/slice'
import trackReducer from '../../entities/Track/slice'
import userReducer from '../../entities/User/slice'
import appReducer from '../../entities/App/slice'
import favoriteReducer from '../../entities/Favorite/slice'

export const store = configureStore({
	reducer: {
		radio: radiosReducer,
		promo: promoReducer,
		track: trackReducer,
		user: userReducer,
		notification: notificationReducer,
		curTracks: curTracksReducer,
		favorite: favoriteReducer,
		app: appReducer
	}
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


export type TypedThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	AnyAction
>

export type ThunkAction<
	R, // Return type of the thunk function
	S, // state type used by getState
	E, // any "extra argument" injected into the thunk
	A extends Action // known types of actions that can be dispatched
> = (dispatch: ThunkDispatch<S, E, A>, getState: () => S, extraArgument: E) => R
