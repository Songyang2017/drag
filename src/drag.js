;(function($win, $doc){
    class Drag{
        constructor(el, opts){
            var $el = typeof el === 'string' ? $doc.querySelector(el) : el; //获取需挂载的Dom对象
            //设置默认属性
            var $opts = {
                click: true //默认开启点击事件
            };
            $opts = this.extend($opts, opts)

            var boundRect = $el.getBoundingClientRect(); //获取目标Dom的大小及相对视口的信息
            var touchFlag = false; //判定手指滑动屏幕过程中状态的变化

            // 手指接触屏幕时
            $el.addEventListener('touchstart', e => {
                !$opts.click ? e.preventDefault() : ''; //是否执行阻止点击
                touchFlag = true;
                //todo
            }, {passive: false}) //来源 https://segmentfault.com/a/1190000008512184, 解决iOS设备下页面滑动this.wrapper touchstart事件不灵敏bug

            // 手指滑动时 目标Dom执行
            $el.addEventListener('touchmove', e => {
                e.preventDefault(); // 滑动过程中阻止浏览器默认事件

                let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                let scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;

                if (touchFlag) {
                    //	分别减去滚动的宽和高
                    let MoveX = e.touches[0].pageX - scrollLeft -(boundRect.width/2);
                    let MoveY = e.touches[0].pageY - scrollTop - (boundRect.height/2);

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

                    $el.style.left = `${MoveX}px`;
                    $el.style.top = `${MoveY}px`;
                }
            }, {passive: false})

            // 手指离开屏幕时
            $el.addEventListener('touchend', e => {
                touchFlag = false;
            })

            // 手指滑动时 屏幕需设定
            $win.addEventListener('touchmove', e => {

            }, {passive: false})

            this.el = $el;
            this.opts = $opts;
        }
    }
    Drag.prototype = {
        extend: function(obj, _obj){
            for (let k in _obj) {
                obj[k] = _obj[k]
            }
            return obj
        }
    }
    //暴露给外部调用
    $win.Drag = Drag;
})(window, document)