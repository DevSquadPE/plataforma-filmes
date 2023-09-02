function StarsFromAPI() {
    var rating = RatingFromAPI();
    $(".icon-star").removeClass("active"); 
    $(".icon-star[data-rating='" + rating + "']").prevAll().addBack().addClass("active");
  }
  