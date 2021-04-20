$(document).ready(function(){
$('a#labs').css({'background-position' : '-79px 0px'});
$('div.postPrev').hide();
$('div.postPrev:eq(0)').delay(400).fadeIn(400,function(){
$('div.postPrev:eq(1)').fadeIn(400,function(){
$('div.postPrev:eq(2)').fadeIn(400,function(){
$('div.postPrev:eq(3)').fadeIn(400,function(){
$('div.postPrev:eq(4)').fadeIn(400,function(){
$('div.postPrev:eq(5)').fadeIn(400,function(){
})})})})})});
$('div.post').hide();
$('div.post').delay(300).fadeIn(1200, 'linear');

});

