<>
<header class="flex flex-wrap items-center p-4 md:py-8">

<div class="md:w-3/12 md:ml-16">
  
  <img class="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
               border-2 border-pink-600 p-1" src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80" alt="profile"/>
</div>


<div class="w-8/12 md:w-7/12 ml-4">
  <div class="md:flex md:flex-wrap md:items-center mb-4">
    <h2 class="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
      mrtravlerrr_
    </h2>

    
    <span class="inline-block fas fa-certificate fa-lg text-blue-500 
                         relative mr-6 text-xl transform -translate-y-2" aria-hidden="true">
      <i class="fas fa-check text-white text-xs absolute inset-x-0
                         ml-1 mt-px"></i>
    </span>

    
    <a href="#" class="bg-blue-500 px-2 py-1 
                  text-white font-semibold text-sm rounded block text-center 
                  sm:inline-block block">Follow</a>
  </div>

 
  <ul class="hidden md:flex space-x-8 mb-4">
    <li>
      <span class="font-semibold">136</span>
      posts
    </li>

    <li>
      <span class="font-semibold">40.5k</span>
      followers
    </li>
    <li>
      <span class="font-semibold">302</span>
      following
    </li>
  </ul>

  
  <div class="hidden md:block">
    <h1 class="font-semibold">Mr Travlerrr...</h1>
    <span>Travel, Nature and Music</span>
    <p>Lorem ipsum dolor sit amet consectetur</p>
  </div>

</div>


<div class="md:hidden text-sm my-2">
  <h1 class="font-semibold">Mr Travlerrr...</h1>
  <span>Travel, Nature and Music</span>
  <p>Lorem ipsum dolor sit amet consectetur</p>
</div>

</header>




<Carousel showThumbs={false} showArrows={true} emulateTouch={true}>
      <div className="carousel carousel-center rounded-box">
        <div className="carousel-item">
          <a href="larger-image-url-1">
            <img src={
                profileImage ||
                (user.gender === "male"
                  ? "https://static.m4marry.com/ui/images/img.reg-upload-male.png"
                  : "https://static.m4marry.com/ui/images/img.reg-upload-female.png")
              } alt="Image 1" />
          </a>
        </div>
        <div className="carousel-item">
          <a href="larger-image-url-2">
            <img src={
                profileImage ||
                (user.gender === "male"
                  ? "https://static.m4marry.com/ui/images/img.reg-upload-male.png"
                  : "https://static.m4marry.com/ui/images/img.reg-upload-female.png")
              } alt="Image 2" />
          </a>
        </div>
        {/* Add more carousel items with corresponding larger image URLs */}
      </div>
    </Carousel>

    </>