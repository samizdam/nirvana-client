import { AppThunk, ThunkActionCreater } from '../../services/Redux/store'
import { FormType } from '../../ui/Forms/SearchForm/type'
import { request } from '../../services/Request/Requets'
import { setOneRadio, setRadio } from './slice'

const URL = '/radio'

export const getAllRadiosThunk: ThunkActionCreater<number> =
	offset => async dispatch => {
		const res = await request.sendRequest({
			method: 'post',
			url: `${URL}`,
			data: { offset: offset }
		})
		dispatch(setRadio(res?.data))
	}


export const searchRadioThunk: ThunkActionCreater<FormType> =
	formData => async dispatch => {
		const res = await request.sendRequest({
			method: 'post',
			url: `${URL}/search`,
			data: formData
		})
		dispatch(setRadio(res?.data))
	}
