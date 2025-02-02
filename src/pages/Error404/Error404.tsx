import { useNavigate } from 'react-router-dom'

import { BlockButton, Typography } from 'nirvana-uikit'

import styles from './Error404.module.scss'
import { t } from 'i18next'

export default function Error404() {
	const navigate = useNavigate()

	return (
		<div className={styles.error404}>
			<div className={styles.textContainer}>
				<Typography
					text={'404'}
					color="#f3f3f3"
					weight="semibold"
					fontSize="10em"
					textAlign="center"
				/>
				<Typography
					text={t('Error404.errorMessage')}
					color="#f3f3f3"
					weight="regular"
					textAlign="center"
				/>
				<BlockButton
					text={t('Error404.home')}
					onClick={() => navigate('/')}
					type="button"
				/>
			</div>
		</div>
	)
}
