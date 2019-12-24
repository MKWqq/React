/* 时间选择器：预设范围、自定义时间选择范围 */
import React, {Component} from 'react'
import {DatePicker} from 'antd'
import moment from 'moment'

let {RangePicker} = DatePicker;

function range(start, end) {
	const result = [];
	for (let i = start; i < end; i++) {
		result.push(i);
	}
	return result;
}

function disabledDate(current) {
	return current && current < moment().endOf('day');
}

function disabledDateTime() {
	return {
		disabledHours: () => range(0, 24).splice(4, 20),
		disabledMinutes: () => range(30, 60),
		disabledSeconds: () => [55, 56]
	}
}

function disabledRangeTime(_, type) {
	if (type === 'start') {
		return {
			disabledHours: () => range(0, 24).splice(4, 20),
			disabledMinutes: () => range(30, 60),
			disabledSeconds: () => [55, 56]
		}
	}
	return {
		disabledHours: () => range(0, 60).splice(20, 4),
		disabledMinutes: () => range(0, 31),
		disabledSeconds: () => [55, 56]
	}
}

export default class DatePickerAPI extends Component {
	constructor(props){
		super(props);
		this.state={
			defaultValue:moment('2019-12-24')
		}
	}

	dateChange(date, dateString) {
		console.log(date, dateString);
	}

	dateRangeChange(date, dateString) {
		console.log(date, dateString);
	}

	render() {
		return (
			<div>
				{/* disabledDate与disabledTime分开设置。disabledTime需要与showTime连用 */}
				<DatePicker defaultValue={this.state.defaultValue} format='YYYY-MM-DD' disabledDate={disabledDate} disabledTime={disabledDateTime}
				            showTime={{defaultValue: moment('00:00:00', 'HH:mm:ss')}}
				            showToday onChange={(...args) => this.dateChange(...args)}/>
				<RangePicker
					ranges={{'今天': [moment(), moment()], '本月': [moment().startOf('month'), moment().endOf('month')]}}
					disabledDate={disabledDate} disabledTime={disabledRangeTime}
					showTime={{
						hideDisabledOptions: true,
						defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')]
					}} format='YYYY-MM-DD HH:mm:ss'
					onChange={(...args) => this.dateRangeChange(...args)}/>
			</div>
		);
	}
}