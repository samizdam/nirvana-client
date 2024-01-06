import { AnyAction, ThunkAction, configureStore } from '@reduxjs/toolkit'
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

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	AnyAction
>

export type ThunkActionCreater<PayloadType = void, ReturnType = void> = (
	payload: PayloadType
) => AppThunk<ReturnType>
