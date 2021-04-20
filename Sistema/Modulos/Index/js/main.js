$(document).ready(function(){
	 jQuery.noConflict();

	//Ajax Event Handler For Categorie Demo
	jQuery('#navDemo01').navDocks({fromSize:48, toSize:80,speed:300,activeMenu:false, tips:false, ajax:false});
		// nav Demo 2
	jQuery('#navDemo02').navDocks({speed:300, activeMenu:true});
	
	var $menu1 = jQuery('#navDemo02');
		
	function success(){
	jQuery('div.ajaxContent').hide();
 	jQuery('div.ajaxContent').slideDown(300);
	}

	function ajaxCallTimeout(index){
	var url = '/navDockDemo/categorie/0'+(index+1)+'.html';
	 jQuery('div.ajaxContent').load(url, success);
	}
	function ajaxCategorie(){
		var index = $menu1.find('li a').index(this);
		 jQuery('div.ajaxContent').html('<p style="color:#4CC3EC; text-align:center; margin-top:45px;">Loading...<img src="/app/webroot/img/loading.gif" /></p>');
		switch(index){
			case 0 :
				
				  jQuery('div.ajaxContent').stop().animate({marginTop: 0}, 1000,'linear', function(){ajaxCallTimeout(index)});
			break;
			case 1 : 
			
				  jQuery('div.ajaxContent').stop().animate({marginTop: 0}, 1000,'linear', function(){ajaxCallTimeout(index)});
			break;
			case 2 : 
			
				  jQuery('div.ajaxContent').stop().animate({marginTop: 0}, 1000,'linear',function(){ajaxCallTimeout(index)});
			break;
			case 3 : 
				
				  jQuery('div.ajaxContent').stop().animate({marginTop: 0}, 1000,'linear', function(){ajaxCallTimeout(index)});
			break;
			case 4 : 
				
				  jQuery('div.ajaxContent').stop().animate({marginTop:0}, 1000,'linear', function(){ajaxCallTimeout(index)});
			break;
			case 5 : 
		
				  jQuery('div.ajaxContent').stop().animate({marginTop: 0}, 1000,'linear', function(){ajaxCallTimeout(index)});
			break;
			case 6 : 
		
				  jQuery('div.ajaxContent').stop().animate({marginTop: 0}, 1000,'linear', function(){ajaxCallTimeout(index)});
			break;


		}
	}

	$menu1.find('li a').bind('click', ajaxCategorie);
	
	jQuery(".code").each(function() {
    var block = jQuery(this);
    var htmlText = block.html();
	
    var plainText = "";
    if (jQuery.browser.msie) {
      plainText = htmlText.replace(/\n/g, "+");
      plainText = jQuery(plainText).text().replace(/\+\+/g, "\r");
    } else {
      plainText = block.text().replace(/code/g, "code\n");
    }
    var state = 1;
    block.prev().click(function() {
      if (state) {
        jQuery(this).html("Show Highlighted Code");
        block.text(plainText).wrapInner("<pre class=\"plain-text\"></pre>");
        state = 0;
      } else {
        jQuery(this).html("Show Plain Text");
        block.html(htmlText);
        state = 1;
      }
    });
  });

}); 