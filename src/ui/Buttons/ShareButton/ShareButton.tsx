import {
	FacebookShareButton,
	TelegramShareButton,
	TwitterShareButton,
	VKShareButton,
	WhatsappShareButton
} from 'react-share'

import debounce from 'lodash.debounce'

import { setNotification } from 'entities/Notification/slice'
import { Severity } from 'entities/Notification/types'

import { useAppDispatch } from 'shared/Redux/hooks'

import styles from './ShareButton.module.scss'

function ShareButton() {
	const URL = `${window.location.protocol}//${window.location.host}${window.location.pathname}`
	const title = 'Check out best free music streaming app. Dive in Nirvana'
	const hashtags = ['music', 'streaming', 'free', 'tracks', 'songs', 'radio']
	const dispatch = useAppDispatch()
	function shareHandler() {
		navigator.clipboard.writeText(title + ' ' + URL)
		dispatch(
			setNotification({
				message: 'Link copied',
				severity: Severity.success
			})
		)
	}
	return (
		<div className={styles.shareButtonContainer}>
			<div className={styles.buttons}>
				<button
					className={styles.mainButton}
					aria-label="Share"
					onClick={debounce(shareHandler, 1000, {
						leading: true
					})}
				>
					<svg
						width="25"
						height="25"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2500/svg"
					>
						<path d="M15.75 5.125a3.125 3.125 0 1 1 .754 2.035l-8.397 3.9a3.124 3.124 0 0 1 0 1.88l8.397 3.9a3.125 3.125 0 1 1-.61 1.095l-8.397-3.9a3.125 3.125 0 1 1 0-4.07l8.397-3.9a3.125 3.125 0 0 1-.144-.94Z"></path>
					</svg>
				</button>
				<button
					className={`${styles.vkButton} ${styles.button}`}
					style={{
						transitionDelay: '0s, 0s, 0s',
						transitionProperty: 'translate, background, box-shadow'
					}}
					aria-label="VK"
				>
					<VKShareButton url={URL} title={title}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 48 48"
							width="25px"
							height="25px"
						>
							<path d="M45.763,35.202c-1.797-3.234-6.426-7.12-8.337-8.811c-0.523-0.463-0.579-1.264-0.103-1.776 c3.647-3.919,6.564-8.422,7.568-11.143C45.334,12.27,44.417,11,43.125,11l-3.753,0c-1.237,0-1.961,0.444-2.306,1.151 c-3.031,6.211-5.631,8.899-7.451,10.47c-1.019,0.88-2.608,0.151-2.608-1.188c0-2.58,0-5.915,0-8.28 c0-1.147-0.938-2.075-2.095-2.075L18.056,11c-0.863,0-1.356,0.977-0.838,1.662l1.132,1.625c0.426,0.563,0.656,1.248,0.656,1.951 L19,23.556c0,1.273-1.543,1.895-2.459,1.003c-3.099-3.018-5.788-9.181-6.756-12.128C9.505,11.578,8.706,11.002,7.8,11l-3.697-0.009 c-1.387,0-2.401,1.315-2.024,2.639c3.378,11.857,10.309,23.137,22.661,24.36c1.217,0.12,2.267-0.86,2.267-2.073l0-3.846 c0-1.103,0.865-2.051,1.977-2.079c0.039-0.001,0.078-0.001,0.117-0.001c3.267,0,6.926,4.755,8.206,6.979 c0.368,0.64,1.056,1.03,1.8,1.03l4.973,0C45.531,38,46.462,36.461,45.763,35.202z" />
						</svg>
					</VKShareButton>
				</button>
				<button
					className={`${styles.twitterButton} ${styles.button}`}
					style={{
						transitionDelay: ' 0.1s, 0s, 0.1s',
						transitionProperty: 'translate, background, box-shadow'
					}}
					aria-label="Twitter"
				>
					<TwitterShareButton
						url={URL}
						title={title}
						hashtags={hashtags}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 50 50"
							width="25px"
							height="25px"
						>
							<path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z" />
						</svg>
					</TwitterShareButton>
				</button>
				<button
					className={`${styles.facebookButton} ${styles.button}`}
					style={{
						transitionDelay: '0.2s, 0s, 0.2s',
						transitionProperty: 'translate, background, box-shadow'
					}}
					aria-label="Facebook"
				>
					<FacebookShareButton
						url={URL}
						title={title}
						hashtag={hashtags[0]}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 30 30"
							width="25px"
							height="25px"
						>
							{' '}
							<path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h10v-9h-3v-3h3v-1.611C16,9.339,17.486,8,20.021,8 c1.214,0,1.856,0.09,2.16,0.131V11h-1.729C19.376,11,19,11.568,19,12.718V14h3.154l-0.428,3H19v9h5c1.105,0,2-0.895,2-2V6 C26,4.895,25.104,4,24,4z" />
						</svg>
					</FacebookShareButton>
				</button>
				<button
					className={`${styles.telegramButton} ${styles.button}`}
					style={{
						transitionDelay: ' 0.3s, 0s, 0.3s',
						transitionProperty: 'translate, background, box-shadow'
					}}
					aria-label="Telegram"
				>
					<TelegramShareButton url={URL} title={title}>
						<svg width="25" height="25" viewBox="0 0 24 24">
							<path d="M22.26465,2.42773a2.04837,2.04837,0,0,0-2.07813-.32421L2.26562,9.33887a2.043,2.043,0,0,0,.1045,3.81836l3.625,1.26074,2.0205,6.68164A.998.998,0,0,0,8.134,21.352c.00775.012.01868.02093.02692.03259a.98844.98844,0,0,0,.21143.21576c.02307.01758.04516.03406.06982.04968a.98592.98592,0,0,0,.31073.13611l.01184.001.00671.00287a1.02183,1.02183,0,0,0,.20215.02051c.00653,0,.01233-.00312.0188-.00324a.99255.99255,0,0,0,.30109-.05231c.02258-.00769.04193-.02056.06384-.02984a.9931.9931,0,0,0,.20429-.11456,250.75993,250.75993,0,0,1,.15222-.12818L12.416,18.499l4.03027,3.12207a2.02322,2.02322,0,0,0,1.24121.42676A2.05413,2.05413,0,0,0,19.69531,20.415L22.958,4.39844A2.02966,2.02966,0,0,0,22.26465,2.42773ZM9.37012,14.73633a.99357.99357,0,0,0-.27246.50586l-.30951,1.504-.78406-2.59307,4.06525-2.11695ZM17.67188,20.04l-4.7627-3.68945a1.00134,1.00134,0,0,0-1.35352.11914l-.86541.9552.30584-1.48645,7.083-7.083a.99975.99975,0,0,0-1.16894-1.59375L6.74487,12.55432,3.02051,11.19141,20.999,3.999Z" />
						</svg>
					</TelegramShareButton>
				</button>
				<button
					className={`${styles.whatsappButton} ${styles.button}`}
					style={{
						transitionDelay: '0.4s, 0s, 0.4s',
						transitionProperty: 'translate, background, box-shadow'
					}}
					aria-label="Whatsapp"
				>
					<WhatsappShareButton url={URL} title={title}>
						<svg width="25" height="25" viewBox="0 0 308 308">
							<g id="XMLID_468_">
								<path
									id="XMLID_469_"
									d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156
		c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687
		c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887
		c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153
		c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348
		c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802
		c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922
		c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0
		c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458
		C233.168,179.508,230.845,178.393,227.904,176.981z"
								/>
								<path
									id="XMLID_470_"
									d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716
		c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396
		c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z
		 M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188
		l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677
		c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867
		C276.546,215.678,222.799,268.994,156.734,268.994z"
								/>
							</g>
						</svg>
					</WhatsappShareButton>
				</button>
			</div>
		</div>
	)
}

export default ShareButton
