/**
 * @drag.js
 * @author songyang2017
 * @version 1.0.0
 * @Created: 2018-07-05
 * @description 拖拽移动端导航球，使其位置发生改变
 */
(function(window,document,Math){
	function Drag(el,options){
		'use strict';
		var _this = this;
		_this.wrapper = typeof el === 'string' ? document.querySelector(el) : el;
		var boundRect = _this.wrapper.getBoundingClientRect();
		var touch_flag = false;

		_this.wrapper.style.transition = `box-shadow 0.2s linear`;
		_this.wrapper.style.boxShadow = `none`;
		_this.wrapper.style.visibility = 'visible'
		_this.options = {
			edge: true,
			flashing:{
				color: null
			}
		}
			
		for(var i in options){
			_this.options[i] = options[i];
		}
		
		window.addEventListener('touchmove',function(e){
			//e.preventDefault();
		},{passive:false}) //来源 https://segmentfault.com/a/1190000008512184, 解决iOS下，页面滑动this.wrapper touchstart事件不灵敏bug

		_this.wrapper.addEventListener('touchstart',function(e){
			var e = e||window.event;
			e.preventDefault();

			touch_flag = true;
			if(_this.options.flashing.color){
				_this.wrapper.style.boxShadow = `0px 0px 21px 2px ${_this.options.flashing.color}`
			}
		})

		_this.wrapper.addEventListener('touchmove',function(e){
			var e = e||window.event;
			e.preventDefault();
			var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
			var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;

			if(touch_flag){
				//	分别减去滚动的宽和高
				var MoveX = e.touches[0].pageX - scrollLeft -(boundRect.width/2); 
				var MoveY = e.touches[0].pageY - scrollTop - (boundRect.height/2);

				if(_this.options.flashing.color){
					_this.wrapper.style.boxShadow = `0px 0px 21px 2px ${_this.options.flashing.color}`
				}
				
				if(MoveX<=0){  //边缘碰撞处理
					MoveX=0;
				}else if(MoveX>=(window.innerWidth-boundRect.width)){
					MoveX=window.innerWidth-boundRect.height
				}
				if(MoveY<0){
					MoveY=0
				}else if(MoveY>=(window.innerHeight -boundRect.height)){
					MoveY = window.innerHeight-boundRect.height
				}
				// _this.wrapper.style.transform = `translate3d(${MoveX}px,${MoveY}px,0)`;
				// _this.wrapper.style.WebkitTransform = `translate3d(${MoveX}px,${MoveY}px,0)`;
				_this.wrapper.style.left = `${MoveX}px`;
				_this.wrapper.style.top = `${MoveY}px`;
			}
		})
		
		_this.wrapper.addEventListener('touchend',function(e){
			touch_flag = false;
			if(_this.options.flashing.color){
				_this.wrapper.style.boxShadow = `none`
			}
		})
	}

	Drag.prototype = {
		
	}
	window.Drag = Drag;
})(window,document,Math)
