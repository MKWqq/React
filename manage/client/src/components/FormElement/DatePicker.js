/* 时间选择器：支持string的defaultValue，并返回string格式的数据 */
import React from 'react'
import {DatePicker} from 'antd'
let {RangePicker,MonthPicker,WeekPicker}=DatePicker;

function DatePicker(props){
	return (
		<DatePicker {...props} />
	);
}

function RangePickerFormat(props){
	return (
		<RangePicker {...props} />
	);
}

function MonthPickerFormat(props){
	return (
		<MonthPicker {...props} />
	);
}

function WeekPickerFormat(props){
	return (
		<WeekPicker {...props} />
	);
}

export default function DatePickerFormat(props){
	return {
		DatePicker,
		RangePicker:RangePickerFormat,
		MonthPicker:MonthPickerFormat,
		WeekPicker:WeekPickerFormat,
	};
}