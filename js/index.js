$(function(){
	$('#search').on('click', onSearch);
	$('#date').attr('placeholder', new Date().toLocaleDateString().replace(/\-/g," ")); //2017-6-23
});
function onSearch() {
	var val = $('#date').val();
	
	if (!val){
		alert('日期不能为空');
	} else {
		
		if (/[a-zA-Z]/g.test(val)) {
			var alertInfo = new Date().toLocaleDateString();
			alert('请输入格式如：' + alertInfo);
			$('#date').val('');
			$('#date')[0].focus();
			return;
		} else {
			
			if ($('.bottom-info').css('display') === 'none') {
				$('.bottom-info').css('display', 'block');
				setDate(val);
			} else {
				$('.infoJQ').empty();
				$('.safeJQ').empty();
				var val = $('#date').val();
				setDate(val);
			}
		}
	}
}
function setDate(val) {  
   var nowDate = +new Date(val.replace(/\s/g, '/')),
	timeWay = 30 * 24 * 60 * 60 * 1000,
	lastMonth = new Date(nowDate - timeWay).toLocaleDateString(),
	nextMonth = new Date(nowDate + timeWay).toLocaleDateString();
	var firstHtml = '<div class="line">' +
		'<div class="to-line">' +
		'<label>上个月：</label><span id="lastM"></span></div>' +
		'<div class="to-line">' +
		'<label>下个月：</label>' +
		'<span id="nextM"></span></div></div>';
	
	var secondHtml = '<div class="line">' +
		'<div class="to-line">' +
		'<label>上个月：</label><span id="lastSafeM"></span></div>' +
		'<div class="to-line">' +
		'<label>下个月：</label>' +
		'<span id="nextSafeM"></span></div></div>';
	$('.infoJQ').append($(firstHtml));
	$('.safeJQ').append($(secondHtml));
	$('#nextM')[0].innerHTML = nextMonth;
	$('#lastM')[0].innerHTML = lastMonth;
	
	var beginDate = +new Date(nowDate + timeWay); //初始月份
	
	for(var i = 0; i < 6; i++) {
		var lineHtml = '<div class="line">';
		var innerHtmlLine = '';
		for(var j = 0; j < 2; j++) {
			beginDate = beginDate + timeWay;
			innerHtmlLine += '<div class="to-line">' +
				'<label>' +
				(new Date(beginDate).getFullYear()) +
				'.' +
				(new Date(beginDate).getMonth() + 1) +
				'：' +
				'</label>' +
				'<span>' +
				(new Date(beginDate).toLocaleDateString()) +
				'</span></div>'
		};
		lineHtml += (innerHtmlLine + '</div>');
		$('.infoJQ').append($(lineHtml));
	};
	var lastSafeDayPrev = new Date(nowDate - timeWay - 3 * 24 * 60 * 60 * 1000).toLocaleDateString();
	var lastSafeDayNext = new Date(nowDate - timeWay + 4 * 24 * 60 * 60 * 1000).getDate();
	$('#lastSafeM')[0].innerHTML = lastSafeDayPrev + ' 至 ' + lastSafeDayNext;
	
	var nextSafeDayPrev = new Date(nowDate + timeWay - 3 * 24 * 60 * 60 * 1000).toLocaleDateString();
	var nextSafeDayNext = new Date(nowDate + timeWay + 4 * 24 * 60 * 60 * 1000).getDate();
	$('#nextSafeM')[0].innerHTML = nextSafeDayPrev + '至' + nextSafeDayNext;
	
	var safeBeginDate = +new Date(nowDate + timeWay); //初始月份
	for(var i = 0; i < 6; i++) {
		var lineHtml = '<div class="line">';
		var innerHtmlLine = '';
		for(var j = 0; j < 2; j++) {
			safeBeginDate = safeBeginDate + timeWay;
			innerHtmlLine += '<div class="to-line">' +
				'<label>' +
				(new Date(safeBeginDate).getFullYear()) +
				'.' +
				(new Date(safeBeginDate).getMonth() + 1) +
				'：' +
				'</label>' +
				'<span>' +
				(new Date(safeBeginDate - 3 * 24 * 60 * 60 * 1000).toLocaleDateString()) +
				'至' +
				(new Date(safeBeginDate + 4 * 24 * 60 * 60 * 1000).getDate()) +
				'</span></div>'
		};
		lineHtml += (innerHtmlLine + '</div>');
		$('.safeJQ').append($(lineHtml));
	};
}