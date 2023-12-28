$(document).ready(function(){
    smoothScroll.init({
        speed: 1500, // Integer. How fast to complete the scroll in milliseconds
        easing: 'easeInOutCubic', // Easing pattern to use
        offset: 0, // Integer. How far to offset the scrolling anchor location in pixels    
    });
    var WindowHeight = $(window).height();
    var captionHeight = $(".header .caption").height();
    $(".wrapper").height(WindowHeight);    
    $(".header .content").height(WindowHeight);
    $(".header .caption").offset({
        top:WindowHeight/2 - captionHeight/2  
    });
    /*this function display only the active feat just in the beginning */
    function changeBackground() {
        $(".content img").each(function(){
            if($(this).hasClass("act"))
            {
                if($(this).is(":first-child")){
                   $(this).removeClass("act").animate({opacity:0},2000);
                   $(".content img").animate({opacity:1},2000,function(){
                        $(".lastt").addClass("act");
                    });
                }
                else
                {
                    $(this).removeClass("act").animate({opacity:0},2000).prev("img").addClass("act").animate({opacity:1},2000);
                }
            }
        }); 
    }
    setInterval(changeBackground,20000)
    
    checkFeat();
    function checkFeat() {
        $(".feat").each(function(){
            if ($(this).hasClass("active")) {
                $(this).children("P").css("display","block");
            }
            else
            {
                $(this).children("P").css("display","none")
            }
        });    
    }
    function ReturnIndex(){
        var xx;
        $(".feat").each(function(index){
            if($(this).hasClass("active")) {
                 xx = index;
            } 
        });
        return xx;
    }
    //remove active class from all feat divs and disappear its paragraph also
    function RemoveActive() {
        $(".feat").each(function(){
            $(this).removeClass("active").children("p").css("display","none")
        });
    }
    function removeAllActiveImgs() {
        $(".img-wrapper img").each(function(){
            $(this).removeClass("active");    
        });
    }
    $(".feat h5").on("click",function(){
        RemoveActive(); // call removeActive to remove active class from all feat divs and disappear its paragraph also
        $(this).next("p").css("display","block")
        $(this).parent(".feat").addClass(function(index ,currentClass){
            return "active";
        });
        var activeFeat =ReturnIndex();
        removeAllActiveImgs();
        $(".img-wrapper img").eq(activeFeat).addClass("active");
    });
    
    var countToStart = false;
    $(window).on("scroll",function(){
        /*animate the progressbar */    
         if ($(window).scrollTop() > 290){   
            $(".prog-and-heading").eq(0).find(".moving-prog").animate({width:"90%"},3000,"easeOutCubic")
            .next("span").animate({right:"90%"},3000,"easeOutCubic");
            $(".prog-and-heading").eq(1).find(".moving-prog").animate({width:"85%"},3000,"easeOutCubic")
            .next("span").animate({right:"85%"},3000,"easeOutCubic");
            $(".prog-and-heading").eq(2).find(".moving-prog").animate({width:"80%"},3000,"easeOutCubic")
            .next("span").animate({right:"80%"},3000,"easeOutCubic");
            $(".prog-and-heading").eq(3).find(".moving-prog").animate({width:"88%"},3000,"easeOutCubic")
            .next("span").animate({right:"88%"},3000,"easeOutCubic");
        }
        //firing countTo plugin
        var achievmentHeight = $(".achievment").height(); 
        if (countToStart == false) {
            if ($(window).scrollTop() > $(".achievment").offset().top - (achievmentHeight*8)) {
                $('.timer').countTo({
                    speed:5000
                });
                countToStart = true;
            }      
        }
        // showing to top arrow when user scrolling
        if($(window).scrollTop() >= 150){
            $(".go-to-top").fadeIn(500);
        }
        else{
            $(".go-to-top").fadeOut(500);
        }
    });
    
     $("#owl-demo").owlCarousel({
                    rtl:true,
                    loop:true,
                    autoPlay:7000,
                    items : 4,    
                    itemsDesktop : [1199,3],
                    itemsDesktopSmall : [900,2],
                    itemsTablet:	[820,2],
                    itemsMobile:[630,1],
                    pagination:true
    });
    //to be as measure as its parent when slideDown and Up        
    $(".our-team .item .member-info").height($(".our-team .item").height()+300);
   
   // animating the span after the inputs (border bottom )
   $(".contact-us input , .contact-us textarea").on("focus",function(){
        $(this).next("span").css({
            left:"15px",
            right:"15px"
        }); 
    });
    
    $(".contact-us input , .contact-us textarea").on("focusout",function(){
        $(this).next("span").css({
            left:"calc(100%/2)",
            right:"calc(100%/2)"
        }); 
    });
    
    // clicking on the menu icon in the small and medium screen appear the list
    $(".my-menu .my-icon").one("click",showSidbar);
    function showSidbar(){
            $(".header .my-list-menu").animate({
                right:0
            },200); 
            $(".my-menu .my-icon span").css("display","none");
            $(".my-menu .my-icon i").css("display","block");
            $(".nav").css({
                background:"#080808",
                boxShadow:"0 5px 5px #000"
                });
            $(".my-menu .my-icon").one("click",hideSideBar);
    }
    function hideSideBar(){
         $(".header .my-list-menu").animate({
                right:"-250px"
            },100); 
        $(this).children("span").css("display","block");
        $(this).children("i").css("display","none");
        $(".nav").css({
                background:"none",
                boxShadow:"none"
        });
        $(".my-menu .my-icon").one("click",showSidbar);
    }
    $(window).on("resize",function(){
        var WindowHeight = $(window).height();
        $(".header .content").height(WindowHeight);
        $(".our-team .item .member-info").height($(".our-team .item").height());
    });
    // showing to top arrow when user scrolling
    if($(window).scrollTop() >= 150){
        $(".go-to-top").fadeIn(500);
    }
    else{
            $(".go-to-top").fadeOut(500);
        }
});
$(window).on("load",function(){
    $(".loading ,.wrapper").fadeOut(500); 
});