/**
 * 存放React状态State
 * */
import { createStore } from 'redux'
import reducer from './../reducer'

export default ()=>createStore(reducer)