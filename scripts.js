//Create an event for when the window is scrolled
 window.addEventListener('scroll', function(){
    var distance = window.pageYOffset || document.documentElement.scrollTop
    var header = document.querySelector('header')
    if(distance > 200) {
        header.classList.add('header--small')
    } else {
        header.classList.remove('header--small')
    }
})

function addClickEvents() {

        // Add click events to all the images
        const images = document.querySelectorAll('.image')
        images.forEach(function(image, index){
            //Add a click event to the image
            //have the click event console.log(index)
            image.addEventListener('click', function(e){
                e.preventDefault() // Stop the click event from refreshing
                const source = this.querySelector('img').src
                const id = source.split('=')[1]
                showFullImage(id)     
            })
        })
}

// Add Error Events to the images in case the image is not available
function addErrorEvents(){
    // Find the img tags inside the .image
    // Loop through them and add an "error" event
    // console.log('ERROR!) when that event occurs
    const images = document.querySelectorAll('.image img')
    images.forEach(function(image, index){
        image.addEventListener('error', function(){
           // const next = Math.round(Math.random()*1000)
            this.src = `https://unsplash.it/300/?image=336`
            //console.log('error...ahhh...help!')
        })   
    })
}

//function showfullImage (id) {}
const showFullImage = id => {
    const fullContainer = document.querySelector('.full')// the div
    const fullImage = fullContainer.querySelector('img')//the image in the div
    //Set the src of the fullImage to be a bigger version
    fullImage.src = `https://unsplash.it/600/?image=${id}`

    //Remove the hidden class from the fullContainer to show it
    fullContainer.classList.remove('hidden')
}
//Add event to the .full DIV so it adds the hiddin class when clicked
    const fullContainer = document.querySelector('.full')
    fullContainer.addEventListener('click', function(){
        fullContainer.classList.add('hidden')
    })


//Load Data from https://unsplash.it/list
//then convert to JSON
//THEN grab 20 random images
//then add images to HTML and call addClickEvents()
// to test console.log('Ready To Show Image')

fetch('https://unsplash.it/list')
        .then(result => {
            return result.json() //convert the text into JSON data
        })

        .then(result => {
            //Now that we have the data, we can work with it
            //Initializing and empty array to hold our random numbers
            let randoms = []
            
            // Loop 20 times, each time putting a random number in the array
            for(let i=0; i<20; i++){
            
                //Generate Random: Math.round(Math.random()* N)
                randoms.push(Math.round(Math.random()*result.length))
            }
            //Make an images array to store our random images
            let images = result.filter(image => {
                return randoms.includes(image.id)
            })
            populateImages(images)
            addClickEvents()
            addErrorEvents()
        })
        
        //This function will add all the images we loadedremotely
        //to the HTML page
        function populateImages(imageArray) {
            //Need a variable for the image container
            const imageContainer = document.querySelector('.images .inner')
            
            //Then we need to loop through the imageArray
            //maybe just console.log something to make sure it's working
            imageArray.forEach( (image, index) => {
                const html = `<a href="" class="image">
                <img src="https://unsplash.it/300/?image=${image.id}" alt="${image.author}">
                <span class="image__cover">View Image</span>
            </a>`
                imageContainer.innerHTML += html                

               // console.log(image, index)
            })
        }


/*
<a href="" class="image">
                <img src="https://unsplash.it/300/?image=99" alt="">
                <span class="image__cover">View Image</span>
            </a>

 */   
