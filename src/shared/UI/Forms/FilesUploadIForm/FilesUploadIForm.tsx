import { useState } from 'react'

import { BlockButton, Typography } from 'nirvana-uikit'

import { onSubmit } from './onSubmit'

import { useAppDispatch } from 'shared/Redux/hooks'
import { AutoComplete } from 'shared/UI/Inputs/AutoComplete/AutoComplete'
import { useAutocomplete } from 'shared/hooks/useAutocomplete/useAutocomlete'

import styles from './FilesUploadForm.module.scss'
import { t } from 'i18next'

export default function FilesUploadForm() {
	const [track, setTrack] = useState<File>()
	const [img, setImg] = useState<File>()
	const dispatch = useAppDispatch()

	const URL = '/track'
	const { options: tracksTitles, setOptions: setTracksTitles } =
		useAutocomplete(`${URL}/uniqTracks`)
	const [tracksTitlesInput, setTracksTitlesInput] = useState('')
	const { options: artists, setOptions: setArtists } = useAutocomplete(
		`${URL}/uniqArtists`
	)
	const [artistsInput, setArtistsInput] = useState('')



	const trackTitleField = {
		label: t('Shared.track'),
		name: 'trackTitle',
		value: tracksTitlesInput,
		onChange: setTracksTitlesInput,
		path: `${URL}/intualSearchTrackTitle`,
		options: tracksTitles,
		setOptions: setTracksTitles,
		required: true
	}
	const artistField = {
		label: t('Shared.artist'),
		name: 'artist',
		value: artistsInput,
		onChange: setArtistsInput,
		path: `${URL}/intualSearchArtist`,
		options: artists,
		setOptions: setArtists,
		required: true
	}

	return (
		<div className={styles.formContainer}>
			<Typography text={t('SettingsPage.uploadTrack')} weight="medium" />
			<form
				onSubmit={e =>
					onSubmit({
						e,
						dispatch,
						img,
						track,
						trackName: tracksTitlesInput,
						artist: artistsInput
					})
				}
			>
				<AutoComplete
					key={`${trackTitleField.label}${trackTitleField.name}`}
					field={trackTitleField}
				/>
				<AutoComplete
					key={`${artistField.label}${artistField.name}`}
					field={artistField}
				/>

				<Typography text={t('Shared.track')} />
				<input
					type="file"
					accept="audio/*"
					className={styles.fileInput}
					onChange={e => setTrack((e.target.files as FileList)[0])}
					required
				/>

				<Typography text={t('Shared.cover')} />
				<input
					type="file"
					accept="image/*"
					className={styles.fileInput}
					onChange={e => setImg((e.target.files as FileList)[0])}
					required
				/>

				<BlockButton text={t('SettingsPage.upload')} type="submit" />
			</form>
		</div>
	)
}
