import React, { useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { getAllRadiosThunk, searchRadioThunk } from 'entities/Radios/thunk'
import { SearchRadioForm } from 'entities/Radios/types'
import { ActiveType } from 'entities/User/types'

import { useAppDispatch, useAppSelector } from 'shared/Redux/hooks'
import { useAutocomplete } from 'shared/hooks/useAutocomplete/useAutocomlete'
import { useGetLoaders } from 'shared/hooks/useGetLoaders/useGetLoaders'

import { SearchForm } from 'UI/Forms/SearchForm/SearchForm'
import { TrackSlider } from 'UI/TrackSlider/TrackSlider'
import { TracksRow } from 'UI/TracksRow/TracksRow'

import styles from './RadioPage.module.scss'

export default function RadioPage(): JSX.Element {
	const user = useAppSelector(state => state.user)
	const { options: countries, setOptions: setCountries } =
		useAutocomplete(`/radio/uniqCountry`)
	const [countryInput, setCountryInput] = useState('')
	const { options: genres, setOptions: setGenres } =
		useAutocomplete(`/radio/uniqGenre`)
	const [genreInput, setGenreInput] = useState('')
	const { options: stations, setOptions: setStations } =
		useAutocomplete(`/radio/uniqNames`)
	const [stationInput, setStationsInput] = useState('')
	const { t } = useTranslation()

	useLayoutEffect(() => {
		dispatch(getAllRadiosThunk(0, (user as unknown as ActiveType).id))
	}, [])
	const dispatch = useAppDispatch()
	const { radios } = useAppSelector(state => state.radio)
	const [offset, setOffset] = useState(0)
	const URL = '/radio'
	const fields = [
		{
			label: t('RadioPage.station'),
			name: 'radio',
			value: stationInput,
			onChange: setStationsInput,
			path: `${URL}/intualSearchName`,
			options: stations,
			setOptions: setStations
		},
		{
			label: t('RadioPage.genre'),
			name: 'tags',
			value: genreInput,
			onChange: setGenreInput,
			path: `${URL}/intualSearchGenres`,
			options: genres,
			setOptions: setGenres
		},
		{
			label: t('RadioPage.country'),
			name: 'country',
			value: countryInput,
			onChange: setCountryInput,
			path: `${URL}/intualSearchCountry`,
			options: countries,
			setOptions: setCountries
		}
	]

	const buttons = [
		{
			text: t('Shared.search'),
			type: 'submit'
		}
	]

	const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const form = e.currentTarget
		const formData = {
			name: form.radio.value,
			tags: form.tags.value,
			country: form.country.value
		}
		if (!formData.name && !formData.tags && !formData.country) {
			dispatch(getAllRadiosThunk(0, (user as unknown as ActiveType).id))
		} else {
			dispatch(
				searchRadioThunk(
					formData as SearchRadioForm,
					(user as unknown as ActiveType).id
				)
			)
		}
	}

	const { loadNext: loadNextRadios, loadPrev: loadPrevRadios } =
		useGetLoaders({
			offset,
			setOffset,
			dispatch,
			thunk: getAllRadiosThunk,
			user: user as unknown as ActiveType
		})

	return (
		<div className={styles.radioPage}>
			<TrackSlider tracks={radios} />
			<SearchForm
				fields={fields}
				//@ts-ignore
				buttons={buttons}
				onSubmit={searchHandler}
			/>
			<TracksRow
				title={t('RadioPage.yourWeeklyTopStations')}
				tracks={radios}
				loadNext={loadNextRadios}
				loadPrev={loadPrevRadios}
			/>
		</div>
	)
}
