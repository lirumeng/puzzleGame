//保存定时时间
var time = 0;
// 设置是否暂停标志，true表示暂停
var pause = true;
// 设置定时函数
var set_timer;
// 保存大div当前装的小div的编号
var d = new Array(10);
// 保存大div编号的可移动位置编号
var d_direct = new Array(
		// 为了逻辑更简单，第一个元素不用，从下标1开始
		[0],
		// 大div编号为1的div可以去的位置，比如第一块可以去2,4号位置
		[2, 4],
		[1, 3, 5],
		[2, 6],
		[1, 5, 7],
		[2, 4, 6, 8],
		[3, 5, 9],
		[4, 8],
		[5, 7, 9],
		[6, 8]
	);
// 大div编号的位置
var d_posXY = new Array(
		// 不使用第一个元素
		[0],
		// 第一个表示left，第二个表示top，比如第一块位置为left:0px,top:0px;
		[0, 0],
		[150, 0],
		[300, 0],
		[0, 150],
		[150, 150],
		[300, 150],
		[0, 300],
		[150, 300],
		[300, 300]
	);
// 默认按照顺序排好，大div第九块没有，为0，用0表示空白块
d[1] = 1;
d[2] = 2;
d[3] = 3;
d[4] = 4;
d[5] = 5;
d[6] = 6;
d[7] = 7;
d[8] = 8;
d[9] = 0;

function getEleId(id){
	return document.getElementById(id);
}
// 移动函数
function move(id) {
	// 此循环找出小div在打div中的位置
	var i = 1;
	for(;i<10;++i){
		if(d[i] == id){
			break;
		}
	}

	// 保存小div可以取得编号，0表示不能移动
	var target_d = 0;
	// 用来找出小div可以去的位置，如果返回0，表示不能移动，如果可以移动，则返回可以去的编号
	target_d = whereCanTo(i);
	if(target_d != 0){
		// 把当前的大div编号设置为0，因为当前小div已经移走了，所以当前大div就没有装小div了
		d[i] = 0;
		// 把目标大div设置为被点击的小div的编号
		d[target_d] = id;

		// 最后，设置被点击的小div的位置，把它移到目标大div的位置
		getEleId('d'+id).style.left = d_posXY[target_d][0]+'px';
		getEleId('d'+id).style.top = d_posXY[target_d][1]+'px';

	}

	// 如果target_d不为0，则表示可以移动，且target_d就是小div要去的大div的位置编号
	// 设置游戏是否完成标志，true表示完成
	var finish_flag = true;
	for(var k = 1;k<9;k++){
		if(d[k] != k){
			finish_flag = false;
			break;
			//如果大DIV保存的编号和它本身的编号不同，则表示还不是全部按照顺序排的，那么设置为false，跳出循环，后面不用再判断了，因为只要一个不符，就没完成游戏
		}
	}

	// 从1开始，把每个大div保存的编号遍历一下，判断是否完成
	if(finish_flag){
		if(!pause){
			start();
		}
		alert("恭喜完成O(∩_∩)O~");
	}

	// 如果为true，则表示游戏完成，如果当前没有暂停，则调用暂停函数，并且弹出提示框，完成游戏
	// start()这个函数是开始，暂停一起的函数，如果暂停，调用后会开始，如果开始，则调用后会暂停
}

function whereCanTo(cur_div){
	// 判断是否可以移动函数，参数是大div的编号，不是小div的编号，因为小div编号跟可以去哪没关系，小div是会动的
	var j = 0;
	var move_flag = false;
	for(;j<d_direct[cur_div].length;++j){
		// 把所有可能去的位置循环遍历一下
		if(d[d_direct[cur_div][j]] == 0){
			move_flag = true;
			break;
		}
		// 如果目标的值为0，说明目标位置没有装小div，则可以移动，跳出循环
	}
	if(move_flag){
		return d_direct[cur_div][j];
	}else{
		return 0;
	}
	// 可以移动，则返回目标位置的编号，否则返回0，表示不可移动
}

// 定时函数，每一秒执行一次
function timer(){
	time += 1;  //一秒钟加一
	var min = parseInt(time/60);
	var sec = time % 60;
	// 更新显示时间
	getEleId('timer').innerHTML = min + '分' + sec + '秒';
}

// 开始 暂停函数
function start(){
	if(pause){
		getEleId('start').innerHTML = '暂停';
		pause = false;
		set_timer = setInterval(timer, 1000);
	}else{
		getEleId('start').innerHTML = '开始';
		pause = true;
		clearInterval(set_timer);
	}
}

// 重置函数
function reset(){
	time = 0; //把时间设置为0
	random_d(); //把方块随机打乱函数
	if(pause){
		start();
	}
}

// 随机打乱方块函数：从第九块开始，随机生成一个数，然后两两对调
function random_d(){
	for(var i =9;i>1; --i){
		var to = parseInt(Math.random()*(i -1)+1);  //产生随机数，范围为1到i，不能超出范围
		if(d[i] != 0){
			getEleId('d'+ d[i]).style.left = d_posXY[to][0] + 'px';
			getEleId('d'+ d[i]).style.top = d_posXY[to][1] + 'px';
		}
		// 把当前的div位置设置为随机产生的div位置
		if(d[to] != 0){
			getEleId('d'+ d[to]).style.left = d_posXY[i][0] + 'px';
			getEleId('d'+ d[to]).style.top = d_posXY[i][1] + 'px';
		}
		// 把随机产生的div位置设置为当前的div位置
		var temp = d[to];
		d[to] = d[i];
		d[i] = temp;
		// 然后把它们两个的div保存的编号对调一下
	}
}

// 初始化函数，页面加载的时候调用重置函数，重新开始
window.onload = function(){
	reset();
}