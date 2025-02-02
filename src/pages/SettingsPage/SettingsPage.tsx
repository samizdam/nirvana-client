import { useState } from 'react'

import { BlockButton, Typography } from 'nirvana-uikit'

import { onSubmit } from './handlers/onSubmit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { TextField } from '@mui/material'
import Avatar from '@mui/material/Avatar'

import { changeTheme } from 'entities/App/slice'
import { deleteUserThunk, logoutThunk } from 'entities/User/thunk'
import { type ActiveType } from 'entities/User/types'

import { useAppDispatch, useAppSelector } from 'shared/Redux/hooks'
import FilesUploadForm from 'shared/UI/Forms/FilesUploadIForm/FilesUploadIForm'
import SelectInput from 'shared/UI/Inputs/Select/Select'
import { onSubmitNewPassword } from 'shared/utils/onSubmitNewPassword'

import { avatarStyles } from './config/avatarStyles'
import { langsOptions } from './config/langsOptions'
import { themesOptions } from './config/themesOptions'

import styles from './SettingsPage.module.scss'
import i18next, { t } from 'i18next'

function SettingsPage() {
	const user = useAppSelector(state => state.user)
	const { theme } = useAppSelector(state => state.app)
	const dispatch = useAppDispatch()

	const [lang, setLang] = useState(i18next.language)
	const [isVisible, setIsVisible] = useState(false)
	function changeLanguage(lang: string) {
		i18next.changeLanguage(lang)
		setLang(i18next.language)
	}
	return (
		<div className={styles.container}>
			<div className={`${styles.formContainer} ${styles.userInfo}`}>
				<Typography
					text={t('SettingsPage.accountInfo')}
					weight="medium"
				/>
				<form
					onSubmit={async e => {
						await onSubmit(
							e,
							dispatch,
							user as unknown as ActiveType
						)
					}}
				>
					<div className={styles.avatar}>
						<Avatar sx={avatarStyles}>
							{(user as unknown as ActiveType).nickname[0]}
						</Avatar>
					</div>
					<TextField
						label={t('SettingsPage.nickname')}
						variant="standard"
						name="nickname"
						defaultValue={(user as unknown as ActiveType).nickname}
						sx={{ minWidth: '5em', width: '40%', fontSize: '1em' }}
					/>
					<TextField
						label={t('SettingsPage.email')}
						variant="standard"
						name="email"
						defaultValue={(user as unknown as ActiveType).email}
						sx={{ minWidth: '5em', width: '40%', fontSize: '1em' }}
					/>
					<BlockButton text={'Save'} type="submit" />
				</form>
			</div>
			<div className={styles.formContainer}>
				<Typography
					text={t('SettingsPage.changePassword')}
					weight="medium"
				/>
				<form
					onSubmit={async e => {
						await onSubmitNewPassword({
							e,
							dispatch,
							userId: (user as unknown as ActiveType).id
						})
					}}
				>
					<div className={styles.inputContainer}>
						<TextField
							label={t('SettingsPage.password')}
							variant="standard"
							type={isVisible ? 'text' : 'password'}
							name="password"
							sx={{
								minWidth: '5em',
								width: '100%',
								fontSize: '1em'
							}}
						/>
						<div
							className={styles.visibilityButton}
							onClick={() => {
								setIsVisible(!isVisible)
							}}
						>
							<VisibilityIcon style={{ color: '#434544' }} />
						</div>
					</div>
					<div className={styles.inputContainer}>
						<TextField
							label={t('SettingsPage.repeatPassword')}
							type={isVisible ? 'text' : 'password'}
							variant="standard"
							name="repeatPassword"
							sx={{
								minWidth: '5em',
								width: '100%',
								fontSize: '1em'
							}}
						/>
						<div
							className={styles.visibilityButton}
							onClick={() => {
								setIsVisible(!isVisible)
							}}
						>
							<VisibilityIcon style={{ color: '#434544' }} />
						</div>
					</div>
					<BlockButton text={'Save'} type="submit" />
				</form>
			</div>
			<div className={styles.formContainer}>
				<Typography text={t('SettingsPage.settings')} weight="medium" />
				<form>
					<SelectInput
						label={t('SettingsPage.language')}
						options={langsOptions()}
						value={lang}
						onChange={changeLanguage}
					/>
					<SelectInput
						label={t('Shared.theme')}
						options={themesOptions()}
						value={theme}
						onChange={changeTheme}
						dispatch={dispatch}
					/>
				</form>
			</div>
			<FilesUploadForm />
			<div className={styles.buttonContainer}>
				<button
					className={styles.redButton}
					onClick={() => {
						dispatch(logoutThunk())
					}}
				>
					{t('SettingsPage.logOut')}
				</button>
				<button
					className={styles.redButton}
					onClick={() => {
						dispatch(
							deleteUserThunk((user as unknown as ActiveType).id)
						)
					}}
				>
					{t('SettingsPage.deleteAccount')}
				</button>
			</div>
		</div>
	)
}

export default SettingsPage
