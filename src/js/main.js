$('.settings-box__button_reset').click(function () {
	$('.settings__cover').css('height', '510px');
	$('#imgBox').find('img').remove();
	$('.input-upload').text('Выберите картинку');
	$('.settings-box__link').removeClass('active');
})

/*----------- кнопки репоста в соцсети ----------------*/
var socialShare=function(){
	function t(){
		$("#vk").on("click",e),
		$("#fb").on("click",n),
		$("#tw").on("click",i)}
		function e(t){
			var e="";
			t.preventDefault(),
			e="http://vk.com/share.php?",
			e+="url="+encodeURIComponent(l),
			e+="&title="+encodeURIComponent(u),
			e+="&description="+encodeURIComponent(p),
			e+="&noparse=true",
			a(e)
		}
		function n(t){
			var e="";
			t.preventDefault(),
			e="http://www.facebook.com/sharer.php?s=100",
			e+="&p[title]="+encodeURIComponent(u),
			e+="&p[summary]="+encodeURIComponent(p),
			e+="&p[url]="+encodeURIComponent(l),
			a(e)
		}
		function i(t){
			var e="";
			t.preventDefault(),
			e="http://twitter.com/share?",
			e+="text="+encodeURIComponent(u),
			e+="&url="+encodeURIComponent(l),
			e+="&counturl="+encodeURIComponent(e),
			a(e)
		}
		function a(t){
			window.open(t,"_blank","toolbar=0,status=0,width="+o+",height="+s+",left="+c+", top="+m)}
			var 
			r="http://linangel.me/sites/watermark/",
			o=650,
			s=500,
			c=screen.availWidth/2-o/2,
			m=screen.availHeight/2-s/2,
			l=r,
			u=document.title,
			p=document.getElementsByName("description")[0].getAttribute("content");
			return{init:function(){t()}}}()

			$(document).ready(function(){socialShare.init();})
