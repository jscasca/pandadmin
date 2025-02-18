
const minute = 60;
const hour = 60*60;
const day = hour*24;
const week = day*7;
const month = day*30;
const year = day*365;

export const timeFromSpanish = (d1: number, d2: number) => {
	return timeFrom(d1, d2, timeDiffSpanish);
};

const timeFrom = (d1: number, d2: number, fn: (t: number, v: number) => String) => {
  const diff = (d2 - d1)/1000;
	if (diff < minute) {
		// seconds ago
		return fn(0, 0);
	}
	if (diff < hour) {
		// one minute or n minutes
		return fn(1, Math.floor(diff/minute));
	}
	if (diff < day) {
		// one hour or n hours
		return fn(2, Math.floor(diff/hour));
	}
	if (diff < week) {
		// one day or n days
		return fn(3, Math.floor(diff/day));
	}
	if (diff < month) {
		// one week or n weeks
		return fn(4, Math.floor(diff/week));
	}
	if (diff < year) {
		// one month or n months
		return fn(5, Math.floor(diff/month));
	}
	else {
		// one year or n years
		return fn(6, Math.floor(diff/year));
	}
};

const timeDiffSpanish = (timeRange: number, unit: number) => {
	const timeRanges = [
		"segundos",
		"minutos",
		"horas",
		"dias",
		"semanas",
		"meses",
		"a"
	];
	const singularTimeRange = [
		"segundo",
		"minuto",
		"hora",
		"dia",
		"semana",
		"mes",
		"a"
	];
	const article = [
		"un",
		"un",
		"una",
		"un",
		"una",
		"un",
		"un"
	]
	if (timeRange === 0) return "hace unos segundos"
	if (unit < 3) {
		return "hace " + article[timeRange] + " " + singularTimeRange[timeRange];
	} else {
		return "hace " + unit + " " + timeRanges[timeRange]
	}
};