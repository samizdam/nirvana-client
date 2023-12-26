import { addLikeThunk, removeLikeThunk } from '../../entities/CurTracks/thunk'
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded'
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded'
import { setNotification } from '../../entities/Notification/slice'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import { RoundButton, Typography } from 'radio-app-uikit'
import ShareButton from '../Buttons/ShareButton/ShareButton'
import PlayButton from '../Buttons/PlayButton/PlayButton'
import LikeButton from '../Buttons/LikeButton/LikeButton'
import { useAppSelector } from '../../shared/Redux/hooks'
import debounce from 'lodash.debounce'
//@ts-ignore
import styles from './Player.module.scss'
import { useDispatch } from 'react-redux'
import { PlayerProps } from './types'

export default function Player({ tracks, position }: PlayerProps) {
	const dispatch = useDispatch()
	const [isPlaying, setIsPlaying] = useState(true)
	const [currentTrack, setCurrentTrack] = useState(tracks[position])
	const [isLiked, setIsLiked] = useState(currentTrack.isLiked)
	const [isDragingProgress, setIsDragingProgress] = useState(false)
	const [isDragingVolume, setIsDragingVolume] = useState(false)
	const [volume, setVolume] = useState(0)
	const user = useAppSelector(state => state.user)
	const audioElem = useRef<any>()
	const clickRef = useRef<any>()
	const volumeRef = useRef<any>()

	useLayoutEffect(() => {
		setCurrentTrack(tracks[position])
		setTimeout(() => {
			audioElem.current.play()
		}, 200)
	}, [tracks, position])

	useLayoutEffect(() => {
		if (isPlaying) {
			audioElem?.current?.play()
		} else {
			audioElem?.current?.pause()
		}
	}, [isPlaying])

	useLayoutEffect(() => {
		setIsPlaying(true)
	}, [])

	const PlayPause = () => {
		setIsPlaying(prev => !prev)
	}

	const onPlaying = () => {
		try {
			const duration = audioElem?.current?.duration
			const currentTime = audioElem?.current?.currentTime
			setCurrentTrack({
				...currentTrack,
				progress: (currentTime / duration) * 100,
				length: duration
			})
		} catch (e) {
			dispatch(
				setNotification({ severity: 'error', message: `${e.message}` })
			)
		}
	}

	async function checkWidth(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		try {
			if (!isDragingProgress) return
			await audioElem?.current?.pause()
			let width = clickRef?.current?.clientWidth
				? clickRef?.current?.clientWidth
				: 0
			const offset = e.nativeEvent?.offsetX
			const divProgress = (offset / width) * 100
			const newCurrentTime = (divProgress / 100) * currentTrack.length
			audioElem.current.currentTime = isFinite(newCurrentTime)
				? newCurrentTime
				: 100
		} catch (e) {
			dispatch(
				setNotification({ severity: 'error', message: `${e.message}` })
			)
		}
	}

	function stopDragingProgress() {
		setIsDragingProgress(false)
		audioElem?.current?.play()
	}

	const checkVolume = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		try {
			if (!isDragingVolume) return
			let width = volumeRef?.current?.clientWidth
				? volumeRef?.current?.clientWidth
				: 0
			const offset = e.nativeEvent?.offsetX
			const divProgress = (offset / width) * 100
			const newVolume = divProgress / 100
			audioElem.current.volume = newVolume
			setVolume(newVolume)
		} catch (e) {
			dispatch(
				setNotification({ severity: 'error', message: `${e.message}` })
			)
		}
	}

	async function skipPrevious() {
		try {
			const index = tracks.findIndex(
				track => track.id === currentTrack.id
			)
			index === 0
				? setCurrentTrack(tracks[tracks.length - 1])
				: setCurrentTrack(tracks[index - 1])
			audioElem.current.currentTime = 0
			await audioElem?.current?.load()
			audioElem?.current?.play()
		} catch (e) {
			dispatch(
				setNotification({ severity: 'error', message: `${e.message}` })
			)
		}
	}

	async function skipNext() {
		try {
			console.log('skipNext')
			const index = tracks.findIndex(
				track => track.id === currentTrack.id
			)
			index === tracks.length - 1
				? setCurrentTrack(tracks[0])
				: setCurrentTrack(tracks[index + 1])
			audioElem.current.currentTime = 0
			await audioElem?.current?.load()
			audioElem?.current?.play()
		} catch (e) {
			dispatch(
				setNotification({ severity: 'error', message: `${e.message}` })
			)
		}
	}

	async function likeHandler() {
		if (isLiked) {
			await dispatch(
				removeLikeThunk(currentTrack.id, user.id, currentTrack.type)
			)
			setIsLiked(false)
		} else {
			await dispatch(
				addLikeThunk(currentTrack.id, user.id, currentTrack.type)
			)
			setIsLiked(true)
		}
	}

	function toggleVolumeControl() {
		console.log(audioElem.current.volume, 'volume')
		if (audioElem.current.volume > 0) {
			audioElem.current.volume = 0
			setVolume(0)
		} else {
			audioElem.current.volume = 1
			setVolume(1)
		}
	}

	useEffect(() => {
		if (audioElem?.current?.currentTime === currentTrack?.length) skipNext()
	}, [audioElem?.current?.currentTime])

	return (
		<>
			<audio
				src={currentTrack?.url}
				ref={audioElem}
				onTimeUpdate={onPlaying}
			/>
			<div
				className={styles.playerBg}
				style={{
					backgroundImage:
						currentTrack.img && `url(${currentTrack.img})`
				}}
			></div>
			<div className={styles.playerContainer}>
				<div className={styles.track}>
					<img
						src={currentTrack?.img}
						alt={currentTrack.title}
						loading="lazy"
						decoding="async"
					/>
					<div className={styles.title}>
						<Typography
							text={currentTrack?.title}
							fontSize="20"
							weight="semibold"
						/>
						<Typography
							text={currentTrack?.subTitle}
							fontSize="12"
						/>
					</div>
				</div>
				<div className={styles.controls}>
					<RoundButton
						icon={<SkipPreviousRoundedIcon />}
						onClick={skipPrevious}
						className={styles.controlButton}
					/>
					<PlayButton isPlaying={isPlaying} onClick={PlayPause} />
					<RoundButton
						icon={<SkipNextRoundedIcon />}
						onClick={skipNext}
						className={styles.controlButton}
					/>
					<ShareButton />
					<LikeButton isLiked={isLiked} onClick={likeHandler} />
				</div>
				{isFinite(audioElem?.current?.duration) ? (
					<div
						className={styles.navigation}
						onMouseDown={() => setIsDragingProgress(true)}
						onMouseMove={checkWidth}
						onMouseUp={stopDragingProgress}
						ref={clickRef}
					>
						<div className={styles.navigationController}>
							<div
								className={styles.navigationBar}
								style={{
									width: `${currentTrack?.progress || 0}%`
								}}
							>
								<div className={styles.pointer}></div>
							</div>
						</div>
					</div>
				) : null}

				<div
					className={styles.volume}
					onMouseDown={() => setIsDragingVolume(true)}
					onMouseMove={checkVolume}
					onMouseUp={() => setIsDragingVolume(false)}
					ref={volumeRef}
				>
					<div
						onClick={toggleVolumeControl}
						className={styles.volumeButton}
					>
						{audioElem.current?.volume ? (
							<VolumeUpRoundedIcon />
						) : (
							<VolumeOffIcon />
						)}
					</div>
					{audioElem.current?.volume ? (
						<div className={styles.volumeController}>
							<div
								className={styles.volumeBar}
								style={{
									width: `${volume * 100 || 0}%`
								}}
							>
								<div className={styles.pointer}></div>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</>
	)
}
