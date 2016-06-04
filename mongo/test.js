var a = [{
	"_id": "575297061a6091628ae64c19",
	"year": 2017,
	"timeDesc": "1512144000000",
	"title": "asdsa",
	"time": "2017-12-02",
	"article": "<p>dasdsa&nbsp;&nbsp;&nbsp;&nbsp;</p>",
	"author": "adsda",
	"__v": 0
}, {
	"_id": "575296f91a6091628ae64c18",
	"year": 2017,
	"timeDesc": "1498060800000",
	"title": "sdas",
	"time": "2017-06-22",
	"article": "<p>dsadsad</p>",
	"author": "dasd",
	"__v": 0
}, {
	"_id": "57528f6c1a6091628ae64c15",
	"year": 2016,
	"timeDesc": "1480521600000",
	"title": "211",
	"time": "2016-12-01",
	"article": "<p>sdsssdds</p>",
	"author": "ww",
	"__v": 0
}, {
	"_id": "57528f0d68fe45438a8c61b9",
	"year": 2016,
	"timeDesc": "1465315200000",
	"title": "wqqq",
	"time": "2016-06-08",
	"article": "<p>jkjjkjk</p>",
	"__v": 0,
	"author": "wqqw"
}, {
	"_id": "575296e91a6091628ae64c17",
	"year": 2015,
	"timeDesc": "1448899200000",
	"title": "2017",
	"time": "2015-12-01",
	"article": "<p>dasdsa</p>",
	"author": "",
	"__v": 0
}, {
	"_id": "575296d51a6091628ae64c16",
	"year": 2015,
	"timeDesc": "1420041600000",
	"title": "lalaall",
	"time": "2015-01-01",
	"article": "<p>saas</p>",
	"author": "adas",
	"__v": 0
}];
var b = {};
a.forEach(function(item, index) {
	/*if (b[item.year]) {
		b[item.year].push(item);
	} else {
		b[item.year] = [item];
	}*/
	b[item.year] ? b[item.year].push(item) : b[item.year] = [item]
})

console.log(b);

var b = {
	'2015': [{
		_id: '575296e91a6091628ae64c17',
		year: 2015,
		timeDesc: '1448899200000',
		title: '2017',
		time: '2015-12-01',
		article: '<p>dasdsa</p>',
		author: '',
		__v: 0
	}, {
		_id: '575296d51a6091628ae64c16',
		year: 2015,
		timeDesc: '1420041600000',
		title: 'lalaall',
		time: '2015-01-01',
		article: '<p>saas</p>',
		author: 'adas',
		__v: 0
	}],
	'2016': [{
		_id: '57528f6c1a6091628ae64c15',
		year: 2016,
		timeDesc: '1480521600000',
		title: '211',
		time: '2016-12-01',
		article: '<p>sdsssdds</p>',
		author: 'ww',
		__v: 0
	}, {
		_id: '57528f0d68fe45438a8c61b9',
		year: 2016,
		timeDesc: '1465315200000',
		title: 'wqqq',
		time: '2016-06-08',
		article: '<p>jkjjkjk</p>',
		__v: 0,
		author: 'wqqw'
	}],
	'2017': [{
		_id: '575297061a6091628ae64c19',
		year: 2017,
		timeDesc: '1512144000000',
		title: 'asdsa',
		time: '2017-12-02',
		article: '<p>dasdsa&nbsp;&nbsp;&nbsp;&nbsp;</p>',
		author: 'adsda',
		__v: 0
	}, {
		_id: '575296f91a6091628ae64c18',
		year: 2017,
		timeDesc: '1498060800000',
		title: 'sdas',
		time: '2017-06-22',
		article: '<p>dsadsad</p>',
		author: 'dasd',
		__v: 0
	}]
}