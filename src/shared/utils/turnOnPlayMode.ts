import { setIsPlayMode } from '../../entities/App/slice'
import { setCurTracks, setPosition } from '../../entities/CurTracks/slice'
import { Track } from '../../entities/Track/types'

import React from 'react'

export const turnOnPlayMode = (
	i: number,
	tracks: Track[],
	dispatch: (action: any) => void
) => {
	dispatch(setPosition(i))
	dispatch(setCurTracks(tracks))
	dispatch(setIsPlayMode(true))
}
